import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');

    try {
      const response = await axios.post('http://localhost:3000/auth/login', { email, senha });

      // Salva o token, id e tipo de usuário
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('clienteId', response.data.cliente.id.toString());
      // Salva o tipo do usuário. Ajuste a chave abaixo conforme o backend (admin, cliente, entregador)
      localStorage.setItem('tipoUsuario', response.data.cliente.tipo || 'admin');

      // Redireciona conforme o tipo de usuário
      if (response.data.cliente.tipo === 'admin') {
        navigate('/dashboard');
      } else if (response.data.cliente.tipo === 'entregador') {
        navigate('/entregas');
      } else {
        navigate('/catalogo');
      }
    } catch (error) {
      setErro('Email ou senha inválidos.');
    }
  };

  return (
    <div className="login-background">
      <form className="login-card" onSubmit={handleSubmit}>
        <div className="login-logo">HORTIFOOD</div>
        <h2 className="login-title">Acesse sua conta</h2>
        <input
          className="login-input"
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="login-input"
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        {erro && <div className="login-error">{erro}</div>}
        <button className="login-btn" type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;
