import React from "react";
import Cookies from "js-cookie";
import PageHeader from "components/PageHeader";
import SideNav from "components/SideNav";
// import { Redirect } from 'react-router-dom';
import styles from "./styles.module.scss";
import useProfile from "utils/hooks/useProfile";
import { Navigate, useOutlet } from "react-router-dom";

// const Tasks = lazy(() => import('pages/Tasks'));

export default function PageWrapper() {
  const outlet = useOutlet();
  const isAuthenticated = !!Cookies.get("token");
  const { profile } = useProfile(isAuthenticated);

  if (!isAuthenticated) return <Navigate to="/login" />;
  if (!profile) return null;
  return (
    <div className={styles.pageWrapper}>
      <SideNav />
      <div className={styles.mainWrapper}>
        <PageHeader />
        <div className={styles.pageContent}>{outlet}</div>
      </div>
    </div>
  );
}
