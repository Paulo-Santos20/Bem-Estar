import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/common/Layout/Layout';
import Home from './pages/Home/Home';
import './styles/globals.css';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Outras rotas serão adicionadas aqui */}
          <Route path="/produtos" element={<div>Página de Produtos (em desenvolvimento)</div>} />
          <Route path="/servicos" element={<div>Página de Serviços (em desenvolvimento)</div>} />
          <Route path="/sobre" element={<div>Página Sobre (em desenvolvimento)</div>} />
          <Route path="/blog" element={<div>Página Blog (em desenvolvimento)</div>} />
          <Route path="/contato" element={<div>Página Contato (em desenvolvimento)</div>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;