import { useState, useEffect } from 'react';
import axios from 'axios';
import './CadastroProduto.css';

function CadastroProduto() {
  const [nome, setNome] = useState('');
  const [categoria, setCategoria] = useState('');
  const [preco, setPreco] = useState('');
  const [estoque, setEstoque] = useState('');
  const [fornecedorId, setFornecedorId] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [fornecedores, setFornecedores] = useState<{ id: number; nome: string }[]>([]);

  useEffect(() => {
    axios.get('http://localhost:3000/fornecedores')
      .then(res => setFornecedores(res.data))
      .catch(() => setFornecedores([]));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensagem('');

    try {
      await axios.post('http://localhost:3000/produtos', {
        nome,
        categoria,
        preco: parseFloat(preco),
        estoque: parseInt(estoque),
        fornecedorId: parseInt(fornecedorId),
      });
      setMensagem('Produto cadastrado com sucesso!');
      setNome('');
      setCategoria('');
      setPreco('');
      setEstoque('');
      setFornecedorId('');
    } catch (error) {
      setMensagem('Erro ao cadastrar produto.');
    }
  };

  return (
    <div className="cadastro-produto-container">
      <h2>Cadastrar Novo Produto</h2>
      <form onSubmit={handleSubmit} className="cadastro-produto-form">
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Categoria"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Preço"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          required
          min="0"
          step="0.01"
        />
        <input
          type="number"
          placeholder="Estoque"
          value={estoque}
          onChange={(e) => setEstoque(e.target.value)}
          required
          min="0"
        />
        <select
          value={fornecedorId}
          onChange={(e) => setFornecedorId(e.target.value)}
          required
        >
          <option value="">Selecione o fornecedor</option>
          {fornecedores.map(f => (
            <option key={f.id} value={f.id}>{f.nome}</option>
          ))}
        </select>
        <button type="submit">Cadastrar</button>
      </form>
      {mensagem && <p className="mensagem">{mensagem}</p>}
    </div>
  );
}

export default CadastroProduto;
