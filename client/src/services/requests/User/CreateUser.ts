
export interface UserDataCreate {
  name: string;
  email: string;
  cpf: string;
  cep: string;
  street: string;
  number: string;
  neighborhood: string;
  city: string;
  state: string;
  password: string;
}

/* export async function createUser(body: UserDataCreate) {
  const res = await api.post(`/users`, body);
  return res.data;
}
 */