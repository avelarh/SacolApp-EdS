import axios from "axios";

export const apiCep = axios.create({
  baseURL: "https://viacep.com.br/ws/",
});