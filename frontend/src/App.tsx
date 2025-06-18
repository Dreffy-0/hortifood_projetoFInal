import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Clientes from './pages/Clientes';
import CadastroCliente from './pages/CadastroCliente';
import Produtos from './pages/Produtos';
import CadastroProduto from './pages/CadastroProduto';
import Pedidos from './pages/Pedidos';
import Avaliacoes from './pages/Avaliacoes';
import Entregas from './pages/Entregas';
import Fornecedores from './pages/Fornecedores';
import Catalogo from './pages/Catalogo';
import DetalheProduto from './pages/DetalheProduto'; // NOVO IMPORT
import NovoPedido from './pages/NovoPedido';
import MeusPedidos from './pages/MeusPedidos';
import CadastroFornecedor from './pages/CadastroFornecedor';
import PrivateRoute from './routes/PrivateRoute';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/catalogo"
          element={
            <PrivateRoute>
              <Catalogo />
            </PrivateRoute>
          }
        />

        <Route
          path="/detalhe-produto/:produtoId"
          element={
            <PrivateRoute>
              <DetalheProduto />
            </PrivateRoute>
          }
        />

        <Route
          path="/clientes"
          element={
            <PrivateRoute>
              <Clientes />
            </PrivateRoute>
          }
        />

        <Route
          path="/cadastro-cliente"
          element={
            <PrivateRoute>
              <CadastroCliente />
            </PrivateRoute>
          }
        />

        <Route
          path="/produtos"
          element={
            <PrivateRoute>
              <Produtos />
            </PrivateRoute>
          }
        />

        <Route
          path="/cadastro-produto"
          element={
            <PrivateRoute>
              <CadastroProduto />
            </PrivateRoute>
          }
        />

        <Route
          path="/pedidos"
          element={
            <PrivateRoute>
              <Pedidos />
            </PrivateRoute>
          }
        />

        <Route
          path="/avaliacoes"
          element={
            <PrivateRoute>
              <Avaliacoes />
            </PrivateRoute>
          }
        />

        <Route
          path="/entregas"
          element={
            <PrivateRoute>
              <Entregas />
            </PrivateRoute>
          }
        />

        <Route
          path="/fornecedores"
          element={
            <PrivateRoute>
              <Fornecedores />
            </PrivateRoute>
          }
        />
        <Route
          path="/pedido/novo/:id?"
          element={
            <PrivateRoute>
              <NovoPedido />
            </PrivateRoute>
          }
        />
        <Route
          path="/meus-pedidos"
          element={
            <PrivateRoute>
              <MeusPedidos />
            </PrivateRoute>
          }
        />
        <Route
          path="/cadastro-fornecedor"
          element={
            <PrivateRoute>
              <CadastroFornecedor />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
