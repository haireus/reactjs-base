import React from "react";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import _ from "lodash";
import styles from "./style.module.scss";
import { Card, Input, Button, Form, Row, Checkbox } from "antd";
import { useTranslation } from "react-i18next";
import { login } from "utils/helper/authentication";
import { Navigate, useNavigate } from "react-router-dom";
import { handleErrorMessage } from "i18n";
import { signin } from "api/authentication";

export default function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const navigateToSignUp = () => {};

  const mutation = useMutation(
    ({ email, password }: any) => signin({ email, password }),
    {
      onSuccess: (data) => {
        const { token, refreshToken } = data.data;
        Cookies.set("token", token);
        Cookies.set("refreshToken", refreshToken);
        navigate("/");
      },
      onError: (error) => {
        handleErrorMessage(error);
      },
    }
  );
  const handleSubmit = async (payload: any) => {
    mutation.mutate(payload);
  };

  const isAuthenticated = !!Cookies.get("token");
  if (isAuthenticated) return <Navigate to="/" />;

  return (
    <div className={styles.loginContainer}>
      <Card bordered className={styles.loginForm}>
        <Form onFinish={handleSubmit}>
          <Row justify="center">
            <h2>{t("common.login")}</h2>
          </Row>
          <Form.Item
            label={t("common.email")}
            name="email"
            rules={[
              {
                required: true,
                message: t("validate.usernameRequired"),
              },
            ]}
            labelAlign="left"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label={t("common.password")}
            name="password"
            rules={[
              { required: true, message: t("validate.passwordRequired") },
            ]}
            labelAlign="left"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item name="rememberMe" valuePropName="checked">
            <Checkbox> {t("common.rememberMe")}</Checkbox>
          </Form.Item>
          <Form.Item labelCol={{ span: 24 }}>
            <Button
              block
              type="primary"
              htmlType="submit"
              loading={mutation.isLoading}
            >
              {t("common.login").toUpperCase()}
            </Button>
          </Form.Item>
          <Form.Item labelCol={{ span: 24 }}>
            <Button
              block
              type="dashed"
              htmlType="button"
              onClick={navigateToSignUp}
            >
              {t("common.signUp").toUpperCase()}
            </Button>
          </Form.Item>
          <div>
            <p>Account: admin / 123456</p>
          </div>
        </Form>
      </Card>
    </div>
  );
}
