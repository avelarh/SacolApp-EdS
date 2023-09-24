export interface LoginData {
  email: string;
  password: string;
}

export interface UserCreateData{
  name: string;
  email: string;
  password: string;
}

export interface UserGetData{
  name: string;
  email: string;
  role: string;
  id: number;
}

export interface Product{
  id: string;
  name: string;
  price: number;
  description: string;
}

export interface ProductCart{
  id: string;
  name: string;
  price: number;
  description: string;
  quantidade: string;
}