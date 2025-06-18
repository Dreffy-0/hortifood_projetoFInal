import { useEffect, useState } from 'react';
import axios from 'axios';
import './MeusPedidos.css';

interface ProdutoPedido {
  id: number;
  nome: string;
  quantidade: number;
  preco: number;
}

interface Pedido {
  id: number;
  formaPagamento: string;
  status: string;
  valorTotal: number;
  produtos: ProdutoPedido[];
}

function MeusPedidos() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [erro, setErro] = useState('');
  const [avaliandoPedidoId, setAvaliandoPedidoId] = useState<number | null>(null);

  useEffect(() => {
    const clienteId = localStorage.getItem('clienteId');
    if (!clienteId) {
      setErro('Cliente não identificado.');
      return;
    }

    axios
      .get(`http://localhost:3000/pedidos/cliente/${clienteId}`)
      .then((response) => setPedidos(response.data))
      .catch(() => setErro('Erro ao carregar pedidos.'));
  }, []);

  const getStatusClass = (status: string) => {
    if (status === 'entregue') return 'status entregue';
    if (status === 'cancelado') return 'status cancelado';
    return 'status pendente';
  };

  // Simula avaliação (pode trocar para abrir um modal ou navegar para avaliação)
  const avaliarPedido = (pedidoId: number) => {
    setAvaliandoPedidoId(pedidoId);
    setTimeout(() => setAvaliandoPedidoId(null), 2000); // só simulação
    alert(`Você clicou para avaliar o pedido #${pedidoId}!`);
  };

  return (
    <div className="meus-pedidos-container">
      <h2>Meus Pedidos</h2>

      {erro && <p className="erro">{erro}</p>}
      {pedidos.length === 0 && !erro && <p>Você ainda não fez pedidos.</p>}

      <ul className="pedido-lista">
        {pedidos.map((pedido) => (
          <li key={pedido.id} className="pedido-item">
            <strong>Pedido #{pedido.id}</strong>
            <br />
            Forma de pagamento: {pedido.formaPagamento || '---'}
            <br />
            Status:{' '}
            <span className={getStatusClass(pedido.status)}>
              {pedido.status}
            </span>
            <br />
            <span className="valor">
              Valor total: R$ {pedido.valorTotal.toFixed(2)}
            </span>
            <br />

            {/* PRODUTOS DO PEDIDO */}
            <ul className="produtos-pedido">
              {pedido.produtos?.map((prod) => (
                <li key={prod.id}>
                  <span className="prod-nome">{prod.nome}</span> x{prod.quantidade} — R$ {prod.preco.toFixed(2)}
                </li>
              ))}
            </ul>

            {/* BOTÃO DE AVALIAR, apenas se já entregue */}
            {pedido.status === 'entregue' && (
              <button
                className="avaliar-btn"
                onClick={() => avaliarPedido(pedido.id)}
                disabled={avaliandoPedidoId === pedido.id}
              >
                {avaliandoPedidoId === pedido.id ? 'Avaliando...' : 'Avaliar Pedido'}
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MeusPedidos;
