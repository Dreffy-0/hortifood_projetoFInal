import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Avaliacoes.css';

interface Avaliacao {
  id: number;
  clienteId: number;
  produtoId: number;
  nota: number;
  comentario: string;
}

const Avaliacoes: React.FC = () => {
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [erro, setErro] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    fetch('http://localhost:3000/avaliacoes', { headers })
      .then((res) => res.json())
      .then((data) => setAvaliacoes(data))
      .catch((error) => {
        console.error('Erro ao buscar avaliações:', error);
        setErro('Erro ao carregar avaliações');
      });
  }, [token]);

  const voltarDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="avaliacoes-container">
      <h2>Lista de Avaliações</h2>

      {erro && <p className="erro">{erro}</p>}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente ID</th>
            <th>Produto ID</th>
            <th>Nota</th>
            <th>Comentário</th>
          </tr>
        </thead>
        <tbody>
          {avaliacoes.map((avaliacao) => (
            <tr key={avaliacao.id}>
              <td>{avaliacao.id}</td>
              <td>{avaliacao.clienteId}</td>
              <td>{avaliacao.produtoId}</td>
              <td>{avaliacao.nota}</td>
              <td>{avaliacao.comentario}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={voltarDashboard}>Voltar ao Dashboard</button>
    </div>
  );
};

export default Avaliacoes;
