import { client } from "./client";

export const authApi = {
  register: async (data: RegisterParamsType) =>
    (await client.post("auth/register", data)).data,
};

export type RegisterParamsType = {
  email: string;
  password: string;
};
