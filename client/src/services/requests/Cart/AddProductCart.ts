import { api } from "../../api";

import {  ProductCart } from "../../interfaces";

export async function addProductCart(body: ProductCart) {
  const res = await api.post(`/cart`, body);
  return res.data;
}