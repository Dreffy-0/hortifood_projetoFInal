import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

interface Pedido {
  id: number;
  clienteId: number;
  status: string;
}

const Dashboard: React.FC = () => {
  const [totalClientes, setTotalClientes] = useState(0);
  const [totalPedidos, setTotalPedidos] = useState(0);
  const [totalProdutos, setTotalProdutos] = useState(0);
  const [totalAvaliacoes, setTotalAvaliacoes] = useState(0);
  const [totalFornecedores, setTotalFornecedores] = useState(0);
  const [pedidosRecentes, setPedidosRecentes] = useState<Pedido[]>([]);

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const fetchCount = async (url: string, setFunc: React.Dispatch<React.SetStateAction<number>>) => {
      try {
        const res = await fetch(url, { headers });
        const data = await res.json();
        setFunc(data.length);
      } catch (error) {
        console.error(`Erro ao buscar ${url}`, error);
      }
    };

    fetchCount('http://localhost:3000/clientes', setTotalClientes);
    fetchCount('http://localhost:3000/pedidos', setTotalPedidos);
    fetchCount('http://localhost:3000/produtos', setTotalProdutos);
    fetchCount('http://localhost:3000/avaliacoes', setTotalAvaliacoes);
    fetchCount('http://localhost:3000/fornecedores', setTotalFornecedores);

    fetch('http://localhost:3000/pedidos', { headers })
      .then((res) => res.json())
      .then((data) => {
        const ultimos = data.slice(-3).reverse();
        setPedidosRecentes(ultimos);
      })
      .catch((err) => console.error('Erro ao buscar pedidos', err));
  }, [token]);

  const navegarPara = (rota: string) => {
    navigate(rota);
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Dashboard Hortifood</h1>
      </header>

      <section className="stats-section">
        <div className="card">
          <h3>Clientes</h3>
          <p>{totalClientes}</p>
        </div>
        <div className="card">
          <h3>Pedidos</h3>
          <p>{totalPedidos}</p>
        </div>
        <div className="card">
          <h3>Produtos</h3>
          <p>{totalProdutos}</p>
        </div>
        <div className="card">
          <h3>Avaliações</h3>
          <p>{totalAvaliacoes}</p>
        </div>
        <div className="card">
          <h3>Fornecedores</h3>
          <p>{totalFornecedores}</p>
        </div>
      </section>

      <section className="links-section">
        <h2>Ir para:</h2>
        <button onClick={() => navegarPara('/clientes')}>Ver Clientes</button>
        <button onClick={() => navegarPara('/pedidos')}>Ver Pedidos</button>
        <button onClick={() => navegarPara('/produtos')}>Ver Produtos</button>
        <button onClick={() => navegarPara('/avaliacoes')}>Ver Avaliações</button>
        <button onClick={() => navegarPara('/fornecedores')}>Ver Fornecedores</button>
      </section>

      <section className="list-section">
        <h2>Últimos Pedidos</h2>
        <ul>
          {pedidosRecentes.map((pedido) => (
            <li key={pedido.id}>
              Pedido #{pedido.id} - Cliente ID: {pedido.clienteId} - Status: {pedido.status}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Dashboard;
