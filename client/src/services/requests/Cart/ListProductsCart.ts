import { api } from "../../api";

export async function productListCart() {
  const res = await api.get(`/cart`);
  return res.data;
}