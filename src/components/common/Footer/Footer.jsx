import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isNewsletterSubmitted, setIsNewsletterSubmitted] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      console.log('Newsletter subscription:', newsletterEmail);
      setIsNewsletterSubmitted(true);
      setNewsletterEmail('');
      
      setTimeout(() => {
        setIsNewsletterSubmitted(false);
      }, 3000);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      {/* Seção Principal do Footer */}
      <div className="footer__main">
        <div className="container">
          <div className="footer__content">
            
            {/* Coluna 1 - Informações da Empresa */}
            <div className="footer__column footer__column--company">
              <Link to="/" className="footer__logo">
                <div className="footer__logo-icon">
                  <span className="footer__logo-symbol">❤️</span>
                </div>
                <div className="footer__logo-text">
                  <h3 className="footer__logo-name">Bem Estar</h3>
                  <p className="footer__logo-tagline">Farmácia</p>
                </div>
              </Link>
              
              <p className="footer__description">
                Cuidando da sua saúde e bem-estar com produtos de qualidade 
                e atendimento especializado.
              </p>
              
              <div className="footer__certifications">
                <div className="footer__cert-item">
                  <span className="footer__cert-icon">🏥</span>
                  <span className="footer__cert-text">CRF Licenciada</span>
                </div>
                <div className="footer__cert-item">
                  <span className="footer__cert-icon">🔒</span>
                  <span className="footer__cert-text">Compra Segura</span>
                </div>
              </div>
            </div>

            {/* Coluna 2 - Links Rápidos */}
            <div className="footer__column footer__column--links">
              <h4 className="footer__column-title">
                <span className="footer__title-icon">🔗</span>
                Links Rápidos
              </h4>
              <ul className="footer__links-list">
                <li><Link to="/produtos" className="footer__link">Produtos</Link></li>
                <li><Link to="/produtos?category=Medicamentos" className="footer__link">Medicamentos</Link></li>
                <li><Link to="/produtos?category=Vitaminas" className="footer__link">Vitaminas</Link></li>
                <li><Link to="/produtos?category=Beleza" className="footer__link">Beleza</Link></li>
                <li><Link to="/produtos?availability=on-sale" className="footer__link">Ofertas</Link></li>
                <li><Link to="/contato" className="footer__link">Contato</Link></li>
              </ul>
            </div>

            {/* Coluna 3 - Contato */}
            <div className="footer__column footer__column--contact">
              <h4 className="footer__column-title">
                <span className="footer__title-icon">📞</span>
                Contato
              </h4>
              
              <div className="footer__contact-info">
                <div className="footer__contact-item">
                  <span className="footer__contact-icon">📍</span>
                  <div className="footer__contact-details">
                    <p>Rua das Flores, 123<br />Centro - São Paulo/SP</p>
                  </div>
                </div>
                
                <div className="footer__contact-item">
                  <span className="footer__contact-icon">📞</span>
                  <div className="footer__contact-details">
                    <a href="tel:+5511999999999" className="footer__contact-link">
                      (11) 99999-9999
                    </a>
                  </div>
                </div>
                
                <div className="footer__contact-item">
                  <span className="footer__contact-icon">✉️</span>
                  <div className="footer__contact-details">
                    <a href="mailto:contato@bemestar.com" className="footer__contact-link">
                      contato@bemestar.com
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="footer__hours">
                <h5 className="footer__hours-title">
                  <span className="footer__hours-icon">🕒</span>
                  Funcionamento
                </h5>
                <div className="footer__hours-list">
                  <div className="footer__hours-item">
                    <span>Seg - Sex:</span>
                    <span>8h às 22h</span>
                  </div>
                  <div className="footer__hours-item">
                    <span>Sáb - Dom:</span>
                    <span>8h às 20h</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Coluna 4 - Newsletter e Redes Sociais */}
            <div className="footer__column footer__column--newsletter">
              <h4 className="footer__column-title">
                <span className="footer__title-icon">📧</span>
                Newsletter
              </h4>
              
              <p className="footer__newsletter-description">
                Receba ofertas exclusivas e dicas de saúde.
              </p>
              
              <form className="footer__newsletter-form" onSubmit={handleNewsletterSubmit}>
                <div className="footer__newsletter-input-group">
                  <input
                    type="email"
                    className="footer__newsletter-input"
                    placeholder="Seu e-mail"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    required
                  />
                  <button 
                    type="submit" 
                    className="footer__newsletter-button"
                    disabled={isNewsletterSubmitted}
                  >
                    {isNewsletterSubmitted ? '✓' : '📨'}
                  </button>
                </div>
                {isNewsletterSubmitted && (
                  <div className="footer__newsletter-success">
                    ✅ Inscrito com sucesso!
                  </div>
                )}
              </form>
              
              <div className="footer__social-media">
                <h5 className="footer__social-title">Redes Sociais:</h5>
                <div className="footer__social-links">
                  <a 
                    href="https://facebook.com" 
                     
                    rel="noopener noreferrer"
                    className="footer__social-link footer__social-link--facebook"
                    title="Facebook"
                  >
                    <span className="footer__social-icon">📘</span>
                  </a>
                  <a 
                    href="https://instagram.com" 
                     
                    rel="noopener noreferrer"
                    className="footer__social-link footer__social-link--instagram"
                    title="Instagram"
                  >
                    <span className="footer__social-icon">📷</span>
                  </a>
                  <a 
                    href="https://wa.me/5511999999999" 
                     
                    rel="noopener noreferrer"
                    className="footer__social-link footer__social-link--whatsapp"
                    title="WhatsApp"
                  >
                    <span className="footer__social-icon">💬</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Seção de Copyright */}
      <div className="footer__copyright">
        <div className="container">
          <div className="footer__copyright-content">
            <div className="footer__copyright-text">
              <p>
                © {currentYear} Farmácia Bem Estar. Todos os direitos reservados.
              </p>
              <p className="footer__disclaimer">
                Consulte sempre um farmacêutico ou médico antes de usar medicamentos.
              </p>
            </div>
            
            <div className="footer__payment-methods">
              <span className="footer__payment-title">Pagamento:</span>
              <div className="footer__payment-icons">
                <span className="footer__payment-icon" title="Cartão">💳</span>
                <span className="footer__payment-icon" title="PIX">🔲</span>
                <span className="footer__payment-icon" title="Boleto">📄</span>
                <span className="footer__payment-icon" title="Dinheiro">💰</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Botão Voltar ao Topo */}
      <button 
        className="footer__back-to-top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        title="Voltar ao topo"
      >
        <span className="footer__back-to-top-icon">⬆️</span>
      </button>
    </footer>
  );
};

export default Footer;