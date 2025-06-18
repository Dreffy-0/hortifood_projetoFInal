import api from './axiosConfig';

export const listarClientes = async () => {
  return api.get('/clientes');
};

export const cadastrarCliente = async (cliente: {
  nome: string;
  email: string;
  cpf: string;
  senha: string;
}) => {
  return api.post('/cliente', cliente);
};
