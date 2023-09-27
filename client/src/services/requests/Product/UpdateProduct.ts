import { api } from "../../api";

import { Product } from "../../interfaces";

export async function updateProductApi(body: Product, id : number) {
  const res = await api.put(`/products/${id}`, body);
  return res.data;
}