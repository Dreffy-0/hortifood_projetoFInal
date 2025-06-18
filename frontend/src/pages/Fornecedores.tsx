import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Fornecedores.css';

interface Fornecedor {
  id: number;
  nome: string;
  cnpj: string;
}

const Fornecedores: React.FC = () => {
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
  const [erro, setErro] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    fetch('http://localhost:3000/fornecedores', { headers })
      .then((res) => res.json())
      .then((data) => setFornecedores(data))
      .catch((error) => {
        console.error('Erro ao buscar fornecedores:', error);
        setErro('Erro ao carregar fornecedores');
      });
  }, [token]);

  const voltarDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="fornecedores-container">
      <h2>Lista de Fornecedores</h2>

      {erro && <p className="erro">{erro}</p>}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>CNPJ</th>
          </tr>
        </thead>
        <tbody>
          {fornecedores.map((fornecedor) => (
            <tr key={fornecedor.id}>
              <td>{fornecedor.id}</td>
              <td>{fornecedor.nome}</td>
              <td>{fornecedor.cnpj}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={voltarDashboard}>Voltar ao Dashboard</button>
    </div>
  );
};

export default Fornecedores;
