import { api } from "../../api";

import { Product } from "../../interfaces";

export async function addProduct(body: Product) {
  const res = await api.post(`/products/`, body);
  return res.data;
}