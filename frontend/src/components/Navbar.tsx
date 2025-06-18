import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const tipoUsuario = localStorage.getItem('tipoUsuario');
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      {/* Visível para todos logados */}
      <Link to="/catalogo">Catálogo</Link>

      {/* CLIENTE */}
      {tipoUsuario === 'cliente' && (
        <>
          <Link to="/pedido/novo">Novo Pedido</Link>
          <Link to="/meus-pedidos">Meus Pedidos</Link>
        </>
      )}

      {/* ENTREGADOR */}
      {tipoUsuario === 'entregador' && (
        <Link to="/entregas">Entregas</Link>
      )}

      {/* ADMIN */}
      {tipoUsuario === 'admin' && (
        <>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/clientes">Clientes</Link>
          <Link to="/produtos">Produtos</Link>
          <Link to="/fornecedores">Fornecedores</Link>
          <Link to="/pedidos">Todos Pedidos</Link>
          <Link to="/entregas">Entregas</Link>
          <Link to="/avaliacoes">Avaliações</Link>
          <Link to="/cadastro-cliente">Cadastrar Cliente</Link>
          <Link to="/cadastro-produto">Cadastrar Produto</Link>
          <Link to="/cadastro-fornecedor">Cadastrar Fornecedor</Link>
        </>
      )}

      {/* Botão de Sair para todos */}
      {tipoUsuario && (
        <button className="logout-btn" onClick={logout}>Sair</button>
      )}
    </nav>
  );
}

export default Navbar;
