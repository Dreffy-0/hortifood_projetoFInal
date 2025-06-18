import { useState } from 'react';
import axios from 'axios';
import './CadastroFornecedor.css';

function CadastroFornecedor() {
  const [nome, setNome] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensagem('');

    try {
      await axios.post('http://localhost:3000/fornecedores', { nome });
      setMensagem('Fornecedor cadastrado com sucesso!');
      setNome('');
    } catch (error) {
      setMensagem('Erro ao cadastrar fornecedor.');
    }
  };

  return (
    <div className="cadastro-fornecedor-container">
      <h2>Cadastrar Novo Fornecedor</h2>
      <form onSubmit={handleSubmit} className="cadastro-fornecedor-form">
        <input
          type="text"
          placeholder="Nome do fornecedor"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <button type="submit">Cadastrar</button>
      </form>
      {mensagem && <p className="mensagem">{mensagem}</p>}
    </div>
  );
}

export default CadastroFornecedor;
