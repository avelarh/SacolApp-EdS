import { api } from "../../api";

import { UserCreateData } from "../../interfaces";

export async function CreateUser(body: UserCreateData) {
  const res = await api.post(`/users/`, body);
  return res.data;
}