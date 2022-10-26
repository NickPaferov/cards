import { apiClient } from "./apiClient";

export const authApi = {
  me: async () => {
    const res = await apiClient.post<LoginResponseType>("auth/me");
    return res.data;
  },
  register: async (data: RegisterParamsType) => {
    const res = await apiClient.post("auth/register", data);
    return res.data;
  },
  login: async (data: LoginParamsType) => {
    const res = await apiClient.post<LoginResponseType>("auth/login", data);
    return res.data;
  },
  forgotPassword: async (data: ResetParamsType) => {
    const res = await apiClient.post<ResetParamsResponseType>(
      `${process.env.REACT_APP_BASE_MAIL_URL}/auth/forgot`,
      data
    );
    return res.data;
  },
  resetPassword: async (data: ResetPasswordType) => {
    const res = await apiClient.post<ResetParamsResponseType>(
      "/auth/set-new-password",
      data
    );
    return res.data;
  },
  updateProfileData: async (data: ProfileParamsType) => {
    const res = await apiClient.put<{ updatedUser: LoginResponseType }>(
      "/auth/me",
      data
    );
    return res.data;
  },
  logout: async () => {
    const res = await apiClient.delete<ResponseType>("auth/me");
    return res.data;
  },
};

type ResponseType<T = {}> = T & { error?: string };

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
  avatar?: string;
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
  error?: string;
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

export type ProfileParamsType = {
  name?: string;
  avatar?: string;
};
