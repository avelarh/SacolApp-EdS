import { api } from "../../api";

export async function logout() {
  const res = await api.post(`/users/logout`);
  return res.data;
}