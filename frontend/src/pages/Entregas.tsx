import { useEffect, useState } from 'react';
import axios from 'axios';
import './Entregas.css';

interface Pedido {
  id: number;
  cliente: { nome: string };
  status: string;
  valorTotal: number;
}

function Entregas() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/pedidos')
      .then(response => setPedidos(response.data))
      .catch(() => setPedidos([]));
  }, []);

  const marcarEntregue = async (pedidoId: number) => {
    try {
      await axios.patch(`http://localhost:3000/pedidos/${pedidoId}/status`, { status: 'Entregue' });
      setPedidos((prev) =>
        prev.map((p) =>
          p.id === pedidoId ? { ...p, status: 'Entregue' } : p
        )
      );
      setMensagem('Pedido marcado como entregue!');
      setTimeout(() => setMensagem(''), 1500);
    } catch {
      setMensagem('Erro ao atualizar o status.');
      setTimeout(() => setMensagem(''), 1500);
    }
  };

  return (
    <div className="entregas-container">
      <h2>Pedidos para Entrega</h2>
      {mensagem && <p className="mensagem">{mensagem}</p>}
      <table className="entregas-tabela">
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Status</th>
            <th>Valor</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {pedidos.map((pedido) => (
            <tr key={pedido.id}>
              <td>{pedido.id}</td>
              <td>{pedido.cliente?.nome || 'N/A'}</td>
              <td>{pedido.status}</td>
              <td>R$ {pedido.valorTotal.toFixed(2)}</td>
              <td>
                {pedido.status !== 'Entregue' ? (
                  <button onClick={() => marcarEntregue(pedido.id)}>Marcar como Entregue</button>
                ) : (
                  <span>Entregue</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Entregas;
