import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Produtos.css';

interface Produto {
  id: number;
  nome: string;
  preco: number;
  estoque: number;
}

const Produtos: React.FC = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [erro, setErro] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    fetch('http://localhost:3000/produtos', { headers })
      .then((res) => res.json())
      .then((data) => setProdutos(data))
      .catch((error) => {
        console.error('Erro ao buscar produtos:', error);
        setErro('Erro ao carregar produtos');
      });
  }, [token]);

  const voltarDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="produtos-container">
      <h2>Lista de Produtos</h2>

      {erro && <p className="erro">{erro}</p>}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Preço</th>
            <th>Estoque</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map((produto) => (
            <tr key={produto.id}>
              <td>{produto.id}</td>
              <td>{produto.nome}</td>
              <td>R$ {produto.preco.toFixed(2)}</td>
              <td>{produto.estoque}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={voltarDashboard}>Voltar ao Dashboard</button>
    </div>
  );
};

export default Produtos;
