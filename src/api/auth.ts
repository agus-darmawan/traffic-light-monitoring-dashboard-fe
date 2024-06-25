import axios from '@/lib/axios';
import { deleteCookie, setCookie, getCookie } from '@/lib/cookies';
import {
  IForgotPassword,
  ILogin,
  IRegister,
  IResetPassword
} from '@/types/auth';

export const auth = () => {
  const login = async (params: ILogin) => {
    try {
      const { data } = await axios.post('/auth/login', params);
      console.log(data.data.token);
      setCookie('auth.__token', data.data.token);
      return data.data.role;
    } catch (e) {
      throw e;
    }
  };

  const register = async (params: IRegister) => {
    try {
      await axios.post('/auth/register', params);
      await login({ email: params.email, password: params.password });
    } catch (e) {
      throw e;
    }
  };

  const forgotPassword = async (params: IForgotPassword) => {
    try {
      await axios.post('/auth/password/forgot', params);
    } catch (e) {
      throw e;
    }
  };

  const resetPassword = async (url: string, params: IResetPassword) => {
    try {
      await axios.post(url, params);
    } catch (e) {
      throw e;
    }
  };

  const resendEmailVerification = async () => {
    try {
      await axios.post('/auth/email/verify/resend');
    } catch {}
  };

  const verifyEmail = async (url: string) => {
    try {
      await axios.get(url);
      return true;
    } catch {
      return false;
    }
  };

  const logout = async () => {
    try {
      await axios.post('/auth/logout');
      deleteCookie('auth.__token');
    } catch {}
  };

  const checkRole = async () => {
    try {
      const { data } = await axios.get('/auth/role');
      return data.data;
    } catch (e) {
      throw e;
    }
  };

  return {
    loggedIn: !!getCookie('auth.__token'),
    login,
    register,
    forgotPassword,
    resetPassword,
    resendEmailVerification,
    verifyEmail,
    logout,
    checkRole
  };
};
