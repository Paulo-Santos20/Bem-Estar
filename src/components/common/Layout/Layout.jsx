import React from 'react';
import { Footer } from '../Footer';
import './Layout.css';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      {children}
      <Footer />
    </div>
  );
};

export default Layout;