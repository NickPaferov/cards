import { client } from "./client";

export const authApi = {
  register: async (data: RegisterParamsType) =>
    (await client.post("auth/register", data)).data,
  login: async (data: LoginParamsType) =>
    (await client.post<LoginResponseType>("auth/login", data)).data,
  forgotPassword: async (data: ResetParamsType) =>
    (
      await client.post<ResetParamsResponseType>(
        "https://neko-back.herokuapp.com/2.0/auth/forgot",
        data
      )
    ).data,
  resetPassword: async (data: ResetPasswordType) =>
    (await client.post<ResetParamsResponseType>("/auth/set-new-password", data))
      .data,
};

export type RegisterParamsType = {
  email: string;
  password: string;
};

export type LoginParamsType = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type LoginResponseType = {
  _id: string;
  email: string;
  rememberMe: boolean;
  isAdmin: boolean;
  name: string;
  verified: boolean;
  publicCardPacksCount: number;
  created: string;
  updated: string;
  __v: number;
  token: string;
  tokenDeathTime: number;
};

export type ResetParamsType = {
  email: string;
  from: string;
  message: string;
};

export type ResetParamsResponseType = {
  info: string;
  error: string;
};

export type ResetPasswordType = {
  password: string;
  resetPasswordToken: string;
};
