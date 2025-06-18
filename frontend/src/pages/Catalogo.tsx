import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Catalogo.css';

interface Produto {
  id: number;
  nome: string;
  fornecedorId: number;
  fornecedorNome?: string;
  imagem?: string; // Opcional se quiser adicionar imagens
}

interface Fornecedor {
  id: number;
  nome: string;
}

const Catalogo: React.FC = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const headers = { Authorization: `Bearer ${token}` };

    const fetchData = async () => {
      try {
        const fornecedoresRes = await fetch('http://localhost:3000/fornecedores', { headers });
        const fornecedoresData = await fornecedoresRes.json();
        setFornecedores(fornecedoresData);

        const produtosRes = await fetch('http://localhost:3000/produtos', { headers });
        const produtosData = await produtosRes.json();

        const produtosComFornecedor = produtosData.map((produto: Produto) => {
          const fornecedor = fornecedoresData.find((f: Fornecedor) => f.id === produto.fornecedorId);
          return {
            ...produto,
            fornecedorNome: fornecedor ? fornecedor.nome : 'Fornecedor Desconhecido'
          };
        });

        setProdutos(produtosComFornecedor);
      } catch (error) {
        console.error('Erro ao carregar catálogo:', error);
      }
    };

    fetchData();
  }, [token]);

  const handleVerDetalheProduto = (produtoId: number) => {
    navigate(`/detalhe-produto/${produtoId}`);
  };

  const produtosPorFornecedor = fornecedores.map((fornecedor) => ({
    ...fornecedor,
    produtos: produtos.filter((p) => p.fornecedorId === fornecedor.id),
  }));

  return (
    <div className="catalogo-container">
      <h1>Catálogo de Produtos</h1>
      {produtosPorFornecedor.map((fornecedor) => (
        <div key={fornecedor.id} className="fornecedor-section">
          <h2>{fornecedor.nome}</h2>
          <div className="produtos-lista">
            {fornecedor.produtos.map((produto) => (
              <div key={produto.id} className="produto-card">
                <div className="imagem-produto">
                  {/* Se quiser usar imagem futuramente */}
                  {/* <img src={produto.imagem || 'placeholder.jpg'} alt={produto.nome} /> */}
                </div>
                <h3>{produto.nome}</h3>
                <button onClick={() => handleVerDetalheProduto(produto.id)}>Ver detalhes</button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Catalogo;
