import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <div className="footer__section">
            <div className="footer__logo">
              <div className="footer__logo-icon">
                <span>🍃</span>
              </div>
              <div className="footer__logo-text">
                <span className="footer__logo-name">Bem Estar</span>
                <span className="footer__logo-subtitle">Farmácia</span>
              </div>
            </div>
            <p className="footer__description">
              Cuidando da sua saúde e bem-estar com produtos de qualidade 
              e atendimento farmacêutico especializado.
            </p>
          </div>
          
          <div className="footer__section">
            <h4>Contato</h4>
            <div className="footer__contact">
              <p>📞 (81) 99528-4440</p>
              <p>📧 contato@bemestar.com.br</p>
              <p>📍 Rua da Saúde, 123 - São Paulo, SP</p>
            </div>
          </div>
          
          <div className="footer__section">
            <h4>Horário de Funcionamento</h4>
            <div className="footer__hours">
              <p>Segunda a Sexta: 8h às 22h</p>
              <p>Sábado: 8h às 20h</p>
              <p>Domingo: 8h às 18h</p>
            </div>
          </div>
        </div>
        
        <div className="footer__bottom">
          <p>&copy; 2024 Farmácia Bem Estar. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;