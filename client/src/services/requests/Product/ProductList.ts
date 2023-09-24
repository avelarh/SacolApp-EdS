import { api } from "../../api";

export async function productList() {
  const res = await api.get(`/api/products/`);
  console.log(res.data);
  return res.data;
}