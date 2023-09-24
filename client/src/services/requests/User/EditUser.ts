import { api } from "../../api";

import { UserGetData } from "../../interfaces";

export async function editUser(id: number, body: UserGetData) {
  const res = await api.put(`/users/${id}`, body);
  return res.data;
}