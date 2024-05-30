import Cookies from 'js-cookie';

export const setCookie = (
  key: string,
  value: any,
  args = {
    expires: 365, // 1 year expiration by default
    path: '/',
    secure: process.env.NODE_ENV === 'production'
  }
) => {
  Cookies.set(key, value, args);
};

export const getCookie = (key: string) => {
  return Cookies.get(key);
};

export const deleteCookie = (key: string) => {
  Cookies.remove(key);
};
