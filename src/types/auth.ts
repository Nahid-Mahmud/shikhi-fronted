export type TUser = {
  id: string;
  email: string;
  name: string;
  role: string;
  status: string;
};

export type TRegisterRequest = {
  email: string;
  name: string;
  password: string;
  role?: string;
};

export type TLoginRequest = {
  email: string;
  password: string;
};

export type TLoginResponse = {
  role: string;
  id: string;
  status: string;
  email: string;
};

export type TForgetPasswordResponse = {
  message: string;
};

export type TResetPasswordResponse = {
  message: string;
};
