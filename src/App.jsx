import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/common/Layout/Layout';
import Home from './pages/Home/Home';
import Product from './pages/Product/Product';
import { CartProvider } from './contexts/CartContext';
import './styles/globals.css';

function App() {
  return (
    <CartProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/produto/:id" element={<Product />} />
            <Route path="/produtos" element={<div>Página de Produtos (em desenvolvimento)</div>} />
            <Route path="/categoria/:slug" element={<div>Página de Categoria (em desenvolvimento)</div>} />
            <Route path="/servicos" element={<div>Página de Serviços (em desenvolvimento)</div>} />
            <Route path="/sobre" element={<div>Página Sobre (em desenvolvimento)</div>} />
            <Route path="/blog" element={<div>Página Blog (em desenvolvimento)</div>} />
            <Route path="/contato" element={<div>Página Contato (em desenvolvimento)</div>} />
            <Route path="/404" element={<div>Página não encontrada</div>} />
            <Route path="*" element={<div>Página não encontrada</div>} />
          </Routes>
        </Layout>
      </Router>
    </CartProvider>
  );
}

export default App;