import { api } from "../../api";

export async function getProductCart(id: number) {
  const res = await api.get(`/cart/${id}`);
  return res.data;
}