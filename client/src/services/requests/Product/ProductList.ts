import { api } from "../../api";

export async function productList() {
  const res = await api.get(`/products/`);
  return res.data;
}