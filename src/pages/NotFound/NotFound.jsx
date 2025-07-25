import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/common/Layout/Layout';
import './NotFound.css';

export const NotFound = () => {
  return (
    <Layout>
      <div className="not-found">
        <div className="container">
          <div className="not-found__content">
            <div className="not-found__icon">🔍</div>
            <h1 className="not-found__title">Página não encontrada</h1>
            <p className="not-found__message">
              Desculpe, não conseguimos encontrar a página que você está procurando.
            </p>
            <Link to="/" className="not-found__button">
              Voltar para o início
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;