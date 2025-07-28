// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';

// Importar páginas
import Home from './pages/Home';
import Products from './pages/Products/Products';
import Product from './pages/Product/Product';
import Contact from './pages/Contact/Contact';

// Importar componentes - MUDANÇA AQUI
import Header from './components/common/Header/Header';
import Footer from './components/common/Footer/Footer'; // IMPORT DIRETO

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/produtos" element={<Products />} />
              <Route path="/produto/:slug" element={<Product />} />
              <Route path="/contato" element={<Contact />} />
              <Route path="*" element={<div>Página não encontrada</div>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;