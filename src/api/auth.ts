import axios from '@/lib/axios';
import useAuthStore from '@/stores/useAuthStore';

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post('auth/login', { email, password });
    const token = response.data.data.token;
    useAuthStore.setState({ token });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const register = async (
  email: string,
  password: string,
  password_confirmation: string
) => {
  try {
    const response = await axios.post('auth/register', {
      email,
      password,
      password_confirmation
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const forgotPassword = async (email: string) => {
  try {
    const response = await axios.post('auth/password/forgot', { email });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logout = async (token: string) => {
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    const response = await axios.post('auth/logout', {}, config);
    return response.data;
  } catch (error) {
    throw error;
  }
};
