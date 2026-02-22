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
};

export type TLoginRequest = {
  email: string;
  password: string;
};

export type TLoginResponse = {
  user: TUser;
};

export type TForgetPasswordResponse = {
  message: string;
};

export type TResetPasswordResponse = {
  message: string;
};
