export type ILogin = {
  email: string;
  password: string;
};

export type IRegister = {
  email: string;
  password: string;
  password_confirmation: string;
};

export type IForgotPassword = {
  email: string;
};

export type IResetPassword = {
  password: string;
  password_confirmation: string;
};
