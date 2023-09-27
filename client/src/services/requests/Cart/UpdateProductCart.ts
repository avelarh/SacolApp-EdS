import { api } from "../../api";
import { ProductCart } from "../../interfaces";

export async function updateProductCart(id: number, body: ProductCart) {
  const res = await api.put(`/cart/${id}`, body);
  return res.data;
}