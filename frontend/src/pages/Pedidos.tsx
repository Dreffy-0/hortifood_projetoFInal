import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Pedidos.css';

interface Pedido {
  id: number;
  clienteId: number;
  status: string;
}

const Pedidos: React.FC = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [erro, setErro] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    fetch('http://localhost:3000/pedidos', { headers })
      .then((res) => res.json())
      .then((data) => setPedidos(data))
      .catch((error) => {
        console.error('Erro ao buscar pedidos:', error);
        setErro('Erro ao carregar pedidos');
      });
  }, [token]);

  const voltarDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="pedidos-container">
      <h2>Lista de Pedidos</h2>

      {erro && <p className="erro">{erro}</p>}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>ID do Cliente</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((pedido) => (
            <tr key={pedido.id}>
              <td>{pedido.id}</td>
              <td>{pedido.clienteId}</td>
              <td>{pedido.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={voltarDashboard}>Voltar ao Dashboard</button>
    </div>
  );
};

export default Pedidos;
