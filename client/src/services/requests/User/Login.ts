import { api } from "../../api";

import { LoginData } from "../../interfaces";

export async function LoginUser(body: LoginData) {
  const res = await api.post(`/users/login`, body);
  return res.data;
}