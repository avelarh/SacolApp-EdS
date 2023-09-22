import axios from "axios";

import Constants from "expo-constants";

const { expoConfig } = Constants;

const uri = `http://${expoConfig?.hostUri!.split(":").shift()}:3030/api`; // para o caso de back local;´

export const api = axios.create({
  baseURL: uri,
  //baseURL: "http://20.121.197.157:2030/api",
  withCredentials: true,
});