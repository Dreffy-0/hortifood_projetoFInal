import { useState } from 'react';
import axios from 'axios';
import './CadastroCliente.css';

function CadastroCliente() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagem, setMensagem] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMensagem('');

    try {
      await axios.post('http://localhost:3000/clientes', { nome, email, cpf, senha });
      setMensagem('Cliente cadastrado com sucesso!');
      setNome('');
      setEmail('');
      setCpf('');
      setSenha('');
    } catch (error) {
      setMensagem('Erro ao cadastrar cliente.');
    }
  };

  return (
    <div className="cadastro-cliente-container">
      <h2>Cadastrar Novo Cliente</h2>
      <form onSubmit={handleSubmit} className="cadastro-cliente-form">
        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="CPF"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <button type="submit">Cadastrar</button>
      </form>
      {mensagem && <p className="mensagem">{mensagem}</p>}
    </div>
  );
}

export default CadastroCliente;
