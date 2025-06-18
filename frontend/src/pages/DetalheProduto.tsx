import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './DetalheProduto.css';

interface Produto {
  id: number;
  nome: string;
  descricao?: string;
  preco?: number;
  imagem?: string;
  fornecedorNome?: string;
}

const ProductDetail: React.FC = () => {
  const { produtoId } = useParams<{ produtoId: string }>();
  const [produto, setProduto] = useState<Produto | null>(null);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const headers = { Authorization: `Bearer ${token}` };
    fetch(`http://localhost:3000/produtos/${produtoId}`, { headers })
      .then((res) => res.json())
      .then((data) => setProduto(data))
      .catch(() => setProduto(null));
  }, [produtoId, token]);

  if (!produto) return <div className="prod-detail-bg"><div className="prod-detail-card">Produto não encontrado.</div></div>;

  const handleAdicionar = () => {
    navigate(`/pedido/novo/${produto.id}`);
  };

  return (
    <div className="prod-detail-bg">
      <div className="prod-detail-card">
        <div className="prod-detail-imgarea">
          {/* <img src={produto.imagem || '/placeholder.jpg'} alt={produto.nome} /> */}
        </div>
        <div className="prod-detail-info">
          <h2>{produto.nome}</h2>
          <p className="prod-detail-fornecedor">{produto.fornecedorNome && `Fornecedor: ${produto.fornecedorNome}`}</p>
          <p className="prod-detail-descricao">{produto.descricao || 'Sem descrição.'}</p>
          {produto.preco && (
            <div className="prod-detail-preco">Preço: <b>R$ {produto.preco.toFixed(2)}</b></div>
          )}
          <button onClick={handleAdicionar}>Adicionar ao Pedido</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
