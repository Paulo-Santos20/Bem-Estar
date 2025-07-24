import React, { useState } from 'react';
import './Footer.css';

const Footer = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isNewsletterSubmitted, setIsNewsletterSubmitted] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      // Aqui você pode integrar com sua API de newsletter
      console.log('Newsletter subscription:', newsletterEmail);
      setIsNewsletterSubmitted(true);
      setNewsletterEmail('');
      
      // Reset feedback após 3 segundos
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
              <div className="footer__logo">
                <div className="footer__logo-icon">
                  <span className="footer__logo-symbol">🍃</span>
                </div>
                <div className="footer__logo-text">
                  <h3 className="footer__logo-name">Bem Estar</h3>
                  <p className="footer__logo-tagline">Farmácia</p>
                </div>
              </div>
              
              <p className="footer__description">
                Há mais de 15 anos cuidando da sua saúde e bem-estar com produtos de qualidade, 
                atendimento especializado e preços justos. Sua farmácia de confiança.
              </p>
              
              <div className="footer__certifications">
                <div className="footer__cert-item">
                  <span className="footer__cert-icon">🏥</span>
                  <span className="footer__cert-text">CRF Licenciada</span>
                </div>
                <div className="footer__cert-item">
                  <span className="footer__cert-icon">✅</span>
                  <span className="footer__cert-text">ANVISA Certificada</span>
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
                <li><a href="#sobre" className="footer__link">Sobre Nós</a></li>
                <li><a href="#produtos" className="footer__link">Produtos</a></li>
                <li><a href="#servicos" className="footer__link">Serviços</a></li>
                <li><a href="#blog" className="footer__link">Blog de Saúde</a></li>
                <li><a href="#promocoes" className="footer__link">Promoções</a></li>
                <li><a href="#receitas" className="footer__link">Enviar Receita</a></li>
                <li><a href="#contato" className="footer__link">Contato</a></li>
                <li><a href="#trabalhe-conosco" className="footer__link">Trabalhe Conosco</a></li>
              </ul>
            </div>

            {/* Coluna 3 - Categorias */}
            <div className="footer__column footer__column--categories">
              <h4 className="footer__column-title">
                <span className="footer__title-icon">🏷️</span>
                Categorias
              </h4>
              <ul className="footer__links-list">
                <li><a href="#medicamentos" className="footer__link">Medicamentos</a></li>
                <li><a href="#vitaminas" className="footer__link">Vitaminas</a></li>
                <li><a href="#beleza" className="footer__link">Beleza e Cuidados</a></li>
                <li><a href="#higiene" className="footer__link">Higiene Pessoal</a></li>
                <li><a href="#suplementos" className="footer__link">Suplementos</a></li>
                <li><a href="#infantil" className="footer__link">Produtos Infantis</a></li>
                <li><a href="#dermocosmeticos" className="footer__link">Dermocosméticos</a></li>
                <li><a href="#equipamentos" className="footer__link">Equipamentos</a></li>
              </ul>
            </div>

            {/* Coluna 4 - Atendimento */}
            <div className="footer__column footer__column--contact">
              <h4 className="footer__column-title">
                <span className="footer__title-icon">📞</span>
                Atendimento
              </h4>
              
              <div className="footer__contact-info">
                <div className="footer__contact-item">
                  <span className="footer__contact-icon">📍</span>
                  <div className="footer__contact-details">
                    <strong>Endereço:</strong>
                    <p>Rua das Flores, 123<br />Centro - São Paulo/SP<br />CEP: 01234-567</p>
                  </div>
                </div>
                
                <div className="footer__contact-item">
                  <span className="footer__contact-icon">📞</span>
                  <div className="footer__contact-details">
                    <strong>Telefone:</strong>
                    <p>(11) 3456-7890</p>
                  </div>
                </div>
                
                <div className="footer__contact-item">
                  <span className="footer__contact-icon">📱</span>
                  <div className="footer__contact-details">
                    <strong>WhatsApp:</strong>
                    <p>(11) 99876-5432</p>
                  </div>
                </div>
                
                <div className="footer__contact-item">
                  <span className="footer__contact-icon">✉️</span>
                  <div className="footer__contact-details">
                    <strong>E-mail:</strong>
                    <p>contato@farmaciabemestar.com.br</p>
                  </div>
                </div>
              </div>
              
              <div className="footer__hours">
                <h5 className="footer__hours-title">
                  <span className="footer__hours-icon">🕒</span>
                  Horário de Funcionamento
                </h5>
                <div className="footer__hours-list">
                  <div className="footer__hours-item">
                    <span>Segunda a Sexta:</span>
                    <span>7h às 22h</span>
                  </div>
                  <div className="footer__hours-item">
                    <span>Sábados:</span>
                    <span>8h às 20h</span>
                  </div>
                  <div className="footer__hours-item">
                    <span>Domingos e Feriados:</span>
                    <span>9h às 18h</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Coluna 5 - Newsletter */}
            <div className="footer__column footer__column--newsletter">
              <h4 className="footer__column-title">
                <span className="footer__title-icon">📧</span>
                Newsletter
              </h4>
              
              <p className="footer__newsletter-description">
                Receba ofertas exclusivas, dicas de saúde e novidades diretamente no seu e-mail.
              </p>
              
              <form className="footer__newsletter-form" onSubmit={handleNewsletterSubmit}>
                <div className="footer__newsletter-input-group">
                  <input
                    type="email"
                    className="footer__newsletter-input"
                    placeholder="Seu melhor e-mail"
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
                    ✅ Inscrição realizada com sucesso!
                  </div>
                )}
              </form>
              
              <div className="footer__social-media">
                <h5 className="footer__social-title">Siga-nos:</h5>
                <div className="footer__social-links">
                  <a href="#facebook" className="footer__social-link footer__social-link--facebook">
                    <span className="footer__social-icon">📘</span>
                    <span className="footer__social-name">Facebook</span>
                  </a>
                  <a href="#instagram" className="footer__social-link footer__social-link--instagram">
                    <span className="footer__social-icon">📷</span>
                    <span className="footer__social-name">Instagram</span>
                  </a>
                  <a href="#whatsapp" className="footer__social-link footer__social-link--whatsapp">
                    <span className="footer__social-icon">💬</span>
                    <span className="footer__social-name">WhatsApp</span>
                  </a>
                  <a href="#youtube" className="footer__social-link footer__social-link--youtube">
                    <span className="footer__social-icon">📺</span>
                    <span className="footer__social-name">YouTube</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Seção de Informações Legais */}
      <div className="footer__legal">
        <div className="container">
          <div className="footer__legal-content">
            <div className="footer__legal-links">
              <a href="#politica-privacidade" className="footer__legal-link">Política de Privacidade</a>
              <span className="footer__legal-separator">|</span>
              <a href="#termos-uso" className="footer__legal-link">Termos de Uso</a>
              <span className="footer__legal-separator">|</span>
              <a href="#politica-cookies" className="footer__legal-link">Política de Cookies</a>
              <span className="footer__legal-separator">|</span>
              <a href="#trocas-devolucoes" className="footer__legal-link">Trocas e Devoluções</a>
              <span className="footer__legal-separator">|</span>
              <a href="#fale-conosco" className="footer__legal-link">Fale Conosco</a>
            </div>
            
            <div className="footer__payment-methods">
              <span className="footer__payment-title">Formas de Pagamento:</span>
              <div className="footer__payment-icons">
                <span className="footer__payment-icon" title="Cartão de Crédito">💳</span>
                <span className="footer__payment-icon" title="Cartão de Débito">💳</span>
                <span className="footer__payment-icon" title="PIX">🔲</span>
                <span className="footer__payment-icon" title="Boleto">📄</span>
                <span className="footer__payment-icon" title="Dinheiro">💰</span>
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
                <span className="footer__cnpj">CNPJ: 12.345.678/0001-90</span>
              </p>
              <p className="footer__disclaimer">
                As informações contidas neste site não devem ser usadas para automedicação. 
                Consulte sempre um farmacêutico ou médico.
              </p>
            </div>
            
            <div className="footer__developer">
              <span className="footer__developer-text">
                Desenvolvido com <span className="footer__heart">❤️</span> para sua saúde
              </span>
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
        <span className="footer__back-to-top-text">Topo</span>
      </button>
    </footer>
  );
};

export default Footer;