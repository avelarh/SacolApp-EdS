import { api } from "../../api";

import { UserGetData } from "../../interfaces";

export async function deleteUser(id: number) {
  const res = await api.delete(`/users/${id}`);
  return res.data;
}