import { sendPost } from './axios';

// eslint-disable-next-line import/prefer-default-export
export const signin = (payload: any) => sendPost('/client-auth/login', payload);
export const signUp = (payload: any) => sendPost('/client-auth/register', payload);
