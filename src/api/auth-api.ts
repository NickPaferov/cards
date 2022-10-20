import { client } from "./client";

export const authApi = {
  register: async (data: RegisterParamsType) =>
    (await client.post("auth/register", data)).data,
  login: async (data: LoginParamsType) =>
    (await client.post<LoginResponseType>("auth/login", data)).data,
  updateProfileData: async (data: ProfileParamsType) =>
    (await client.put<{ updatedUser: LoginResponseType }>(`/auth/me`, data))
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
  avatar: string;
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

export type ProfileParamsType = {
  name?: string;
  avatar?: string;
};
