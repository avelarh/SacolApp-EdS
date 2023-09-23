import { api } from "../../api";

export async function myAccount() {
  const res = await api.get(`/users/user`);
  return res.data;
}