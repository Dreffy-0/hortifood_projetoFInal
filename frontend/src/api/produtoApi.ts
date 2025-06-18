import api from './axiosConfig';

export const listarProdutos = async () => {
  return api.get('/produtos');
};

export const cadastrarProduto = async (produto: {
  nome: string;
  categoria: string;
  preco: number;
  estoque: number;
  fornecedorId: number;
}) => {
  return api.post('/produtos', produto);
};
