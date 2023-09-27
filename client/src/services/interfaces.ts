export interface LoginData {
  email: string;
  password: string;
}

export interface UserCreateData {
  name: string;
  email: string;
  password: string;
}

export interface UserGetData {
  name: string;
  email: string;
  role: string;
  id: number;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

export interface ProductCart  {
  Product: Product;
  productId: number;
  amount: number;
  id: number;
}
