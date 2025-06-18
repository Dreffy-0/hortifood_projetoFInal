import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Clientes.css';

interface Cliente {
  id: number;
  nome: string;
  email: string;
  cpf: string;
}

const Clientes: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [erro, setErro] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    fetch('http://localhost:3000/clientes', { headers })
      .then((res) => res.json())
      .then((data) => setClientes(data))
      .catch((error) => {
        console.error('Erro ao buscar clientes:', error);
        setErro('Erro ao carregar clientes');
      });
  }, [token]);

  const voltarDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="clientes-container">
      <h2>Lista de Clientes</h2>

      {erro && <p className="erro">{erro}</p>}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Email</th>
            <th>CPF</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.id}>
              <td>{cliente.id}</td>
              <td>{cliente.nome}</td>
              <td>{cliente.email}</td>
              <td>{cliente.cpf}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={voltarDashboard}>Voltar ao Dashboard</button>
    </div>
  );
};

export default Clientes;
