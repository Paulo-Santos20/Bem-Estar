import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Cart from '../../features/Cart/Cart';
import './Layout.css';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <main className="layout__main">
        {children}
      </main>
      <Footer />
      <Cart />
    </div>
  );
};

export default Layout;