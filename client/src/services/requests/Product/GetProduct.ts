import { api } from "../../api";

export async function getProduct(id: number) {
  const res = await api.get(`/products/${id}`);
  return res.data;
}