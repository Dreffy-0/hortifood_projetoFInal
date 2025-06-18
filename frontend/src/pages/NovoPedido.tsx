import { useEffect, useState } from 'react';
import axios from 'axios';
import './NovoPedido.css';

interface ProdutoSelecionado {
  id: number;
  nome: string;
  preco: number;
  quantidade: number;
}

function NovoPedido() {
  const [produtos, setProdutos] = useState<any[]>([]);
  const [produtosSelecionados, setProdutosSelecionados] = useState<ProdutoSelecionado[]>([]);
  const [mensagem, setMensagem] = useState<string | null>(null);

  useEffect(() => {
    axios.get('http://localhost:3000/produtos')
      .then(response => {
        setProdutos(response.data);
      })
      .catch(error => {
        console.error('Erro ao carregar produtos:', error);
      });
  }, []);

  // Adiciona produto ao carrinho, ou aumenta quantidade se já está lá
  const adicionarProduto = (produto: any) => {
    setProdutosSelecionados(prev => {
      const jaNoCarrinho = prev.find(p => p.id === produto.id);
      if (jaNoCarrinho) {
        return prev.map(p =>
          p.id === produto.id ? { ...p, quantidade: p.quantidade + 1 } : p
        );
      }
      return [...prev, { ...produto, quantidade: 1 }];
    });
  };

  const removerProduto = (produto: any) => {
    setProdutosSelecionados(produtosSelecionados.filter(p => p.id !== produto.id));
  };

  const alterarQuantidade = (produtoId: number, novaQuantidade: number) => {
    setProdutosSelecionados(prev =>
      prev.map(p =>
        p.id === produtoId
          ? { ...p, quantidade: novaQuantidade > 0 ? novaQuantidade : 1 }
          : p
      )
    );
  };

  const valorTotal = produtosSelecionados.reduce(
    (total, p) => total + p.preco * p.quantidade,
    0
  );

  const finalizarPedido = () => {
    const clienteId = localStorage.getItem('clienteId');
    if (!clienteId) {
      setMensagem('Cliente não identificado.');
      return;
    }
    if (produtosSelecionados.length === 0) {
      setMensagem('Selecione pelo menos um produto.');
      return;
    }
    const produtosArray = produtosSelecionados.map(p => ({
      produtoId: p.id,
      quantidade: p.quantidade,
    }));

    axios
      .post('http://localhost:3000/pedidos', {
        clienteId: Number(clienteId),
        produtos: produtosArray,
      })
      .then(() => {
        setMensagem('Pedido realizado com sucesso!');
        setProdutosSelecionados([]);
      })
      .catch(error => {
        console.error('Erro ao realizar o pedido:', error);
        setMensagem('Erro ao realizar o pedido.');
      });
  };

  return (
    <div className="novo-pedido-container">
      <h2>Fazer Novo Pedido</h2>

      {mensagem && (
        <div className={`mensagem ${mensagem.includes('sucesso') ? 'sucesso' : 'erro'}`}>
          {mensagem}
        </div>
      )}

      <div className="carrinho">
        <h3>Seu carrinho</h3>
        {produtosSelecionados.length > 0 ? (
          produtosSelecionados.map(produto => (
            <div key={produto.id} className="produto-item selecionado">
              <span>
                {produto.nome} - R$ {produto.preco.toFixed(2)} x{' '}
                <input
                  type="number"
                  min={1}
                  value={produto.quantidade}
                  onChange={e =>
                    alterarQuantidade(produto.id, Number(e.target.value))
                  }
                  className="quantidade-input"
                />{' '}
                = <b>R$ {(produto.preco * produto.quantidade).toFixed(2)}</b>
              </span>
              <button onClick={() => removerProduto(produto)}>Remover</button>
            </div>
          ))
        ) : (
          <p>Nenhum produto no carrinho.</p>
        )}
        <div className="valor-total">
          <b>Total:</b> R$ {valorTotal.toFixed(2)}
        </div>
      </div>

      <h3>Produtos disponíveis:</h3>
      <div className="produtos-lista">
        {produtos.map(produto => (
          <div key={produto.id} className="produto-item">
            <span>
              {produto.nome} - R$ {produto.preco?.toFixed(2)}
            </span>
            <button onClick={() => adicionarProduto(produto)}>Adicionar</button>
          </div>
        ))}
      </div>

      <button className="finalizar-btn" onClick={finalizarPedido}>
        Finalizar Pedido
      </button>
    </div>
  );
}

export default NovoPedido;
