import { api } from "../../api";

import { Product } from "../../interfaces";

export async function deleteProduct(id: number) {
  const res = await api.delete(`/products/${id.toString()}`);
  return res.data;
} 