import { api } from "../../api";

export async function deleteProductCart(id: number) {
  const res = await api.delete(`/cart/${id}`);
  return res.data;
} 