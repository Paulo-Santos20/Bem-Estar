import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../../components/common/Layout/Layout';
import { products } from '../../data/products';
import './NotFound.css';

export const NotFound = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);
  const [suggestedProducts, setSuggestedProducts] = useState([]);

  // Countdown para redirecionamento automático
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  // Produtos sugeridos aleatórios
  useEffect(() => {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    setSuggestedProducts(shuffled.slice(0, 4));
  }, []);

  const handleProductClick = (productId) => {
    navigate(`/produto/${productId}`);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const cancelRedirect = () => {
    setCountdown(0);
  };

  return (
    <Layout>
      <div className="not-found">
        <div className="container">
          {/* Seção Principal */}
          <div className="not-found__main">
            <div className="not-found__content">
              {/* Animação 404 */}
              <div className="not-found__animation">
                <div className="not-found__number">
                  <span className="not-found__digit">4</span>
                  <span className="not-found__digit not-found__digit--middle">0</span>
                  <span className="not-found__digit">4</span>
                </div>
                <div className="not-found__pills">
                  <div className="not-found__pill not-found__pill--1"></div>
                  <div className="not-found__pill not-found__pill--2"></div>
                  <div className="not-found__pill not-found__pill--3"></div>
                </div>
              </div>

              {/* Texto Principal */}
              <div className="not-found__text">
                <h1 className="not-found__title">
                  <span className="not-found__title-icon">🔍</span>
                  Página não encontrada
                </h1>
                <p className="not-found__subtitle">
                  Ops! Parece que a página que você está procurando não existe ou foi movida.
                </p>
                <p className="not-found__description">
                  Mas não se preocupe! Nossa farmácia tem muitos produtos incríveis esperando por você.
                </p>
              </div>

              {/* Contador de Redirecionamento */}
              {countdown > 0 && (
                <div className="not-found__countdown">
                  <div className="not-found__countdown-content">
                    <span className="not-found__countdown-icon">⏰</span>
                    <span className="not-found__countdown-text">
                      Redirecionando para a página inicial em{' '}
                      <strong className="not-found__countdown-number">{countdown}</strong> segundos
                    </span>
                    <button 
                      className="not-found__countdown-cancel"
                      onClick={cancelRedirect}
                      title="Cancelar redirecionamento"
                    >
                      ✕
                    </button>
                  </div>
                  <div 
                    className="not-found__countdown-bar"
                    style={{ 
                      width: `${(countdown / 10) * 100}%`,
                      transition: 'width 1s linear'
                    }}
                  ></div>
                </div>
              )}

              {/* Botões de Ação */}
              <div className="not-found__actions">
                <Link to="/" className="not-found__button not-found__button--primary">
                  <span className="not-found__button-icon">🏠</span>
                  <span className="not-found__button-text">Voltar ao Início</span>
                </Link>
                
                <Link to="/produtos" className="not-found__button not-found__button--secondary">
                  <span className="not-found__button-icon">🛍️</span>
                  <span className="not-found__button-text">Ver Produtos</span>
                </Link>
                
                <button 
                  className="not-found__button not-found__button--tertiary"
                  onClick={() => window.history.back()}
                >
                  <span className="not-found__button-icon">↩️</span>
                  <span className="not-found__button-text">Voltar</span>
                </button>
              </div>

              {/* Links Úteis */}
              <div className="not-found__quick-links">
                <h3 className="not-found__quick-links-title">Links Úteis:</h3>
                <div className="not-found__quick-links-grid">
                  <Link to="/produtos?category=Medicamentos" className="not-found__quick-link">
                    <span className="not-found__quick-link-icon">💊</span>
                    <span className="not-found__quick-link-text">Medicamentos</span>
                  </Link>
                  <Link to="/produtos?category=Vitaminas" className="not-found__quick-link">
                    <span className="not-found__quick-link-icon">🌟</span>
                    <span className="not-found__quick-link-text">Vitaminas</span>
                  </Link>
                  <Link to="/produtos?category=Beleza" className="not-found__quick-link">
                    <span className="not-found__quick-link-icon">💄</span>
                    <span className="not-found__quick-link-text">Beleza</span>
                  </Link>
                  <Link to="/produtos?availability=on-sale" className="not-found__quick-link">
                    <span className="not-found__quick-link-icon">🔥</span>
                    <span className="not-found__quick-link-text">Promoções</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Ilustração Lateral */}
            <div className="not-found__illustration">
              <div className="not-found__pharmacy">
                <div className="not-found__pharmacy-building">
                  <div className="not-found__pharmacy-sign">
                    <span className="not-found__pharmacy-cross">✚</span>
                    <span className="not-found__pharmacy-name">Bem Estar</span>
                  </div>
                  <div className="not-found__pharmacy-windows">
                    <div className="not-found__pharmacy-window"></div>
                    <div className="not-found__pharmacy-window"></div>
                  </div>
                  <div className="not-found__pharmacy-door"></div>
                </div>
                <div className="not-found__pharmacy-shadow"></div>
              </div>
              
              <div className="not-found__floating-elements">
                <div className="not-found__floating-pill not-found__floating-pill--1">💊</div>
                <div className="not-found__floating-pill not-found__floating-pill--2">🧴</div>
                <div className="not-found__floating-pill not-found__floating-pill--3">💉</div>
                <div className="not-found__floating-pill not-found__floating-pill--4">🩹</div>
              </div>
            </div>
          </div>

          {/* Produtos Sugeridos */}
          <div className="not-found__suggestions">
            <h2 className="not-found__suggestions-title">
              <span className="not-found__suggestions-icon">✨</span>
              Que tal dar uma olhada nestes produtos?
            </h2>
            
            <div className="not-found__suggestions-grid">
              {suggestedProducts.map(product => (
                <div 
                  key={product.id}
                  className="not-found__suggestion-card"
                  onClick={() => handleProductClick(product.id)}
                >
                  <div className="not-found__suggestion-image">
                    <img 
                      src={product.images[0]} 
                      alt={product.name}
                      loading="lazy"
                    />
                    {product.originalPrice && product.originalPrice > product.price && (
                      <div className="not-found__suggestion-discount">
                        -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                      </div>
                    )}
                  </div>
                  
                  <div className="not-found__suggestion-content">
                    <h3 className="not-found__suggestion-name">{product.name}</h3>
                    <div className="not-found__suggestion-brand">{product.brand}</div>
                    
                    <div className="not-found__suggestion-rating">
                      <div className="not-found__suggestion-stars">
                        {Array.from({ length: 5 }, (_, i) => (
                          <span 
                            key={i} 
                            className={`not-found__suggestion-star ${
                              i < Math.floor(product.rating) ? 'filled' : ''
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="not-found__suggestion-rating-count">
                        ({product.reviewCount})
                      </span>
                    </div>
                    
                    <div className="not-found__suggestion-pricing">
                      {product.originalPrice && product.originalPrice > product.price && (
                        <span className="not-found__suggestion-original-price">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                      <span className="not-found__suggestion-price">
                        {formatPrice(product.price)}
                      </span>
                    </div>
                    
                    <button className="not-found__suggestion-button">
                      <span className="not-found__suggestion-button-icon">👁️</span>
                      Ver Produto
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Informações de Contato */}
          <div className="not-found__help">
            <div className="not-found__help-content">
              <h3 className="not-found__help-title">
                <span className="not-found__help-icon">🤝</span>
                Precisa de Ajuda?
              </h3>
              <p className="not-found__help-text">
                Nossa equipe está sempre pronta para ajudar você a encontrar o que precisa.
              </p>
              
              <div className="not-found__help-contacts">
                <a href="tel:+5511999999999" className="not-found__help-contact">
                  <span className="not-found__help-contact-icon">📞</span>
                  <div className="not-found__help-contact-info">
                    <span className="not-found__help-contact-label">Telefone</span>
                    <span className="not-found__help-contact-value">(11) 99999-9999</span>
                  </div>
                </a>
                
                <a href="mailto:contato@bemestar.com" className="not-found__help-contact">
                  <span className="not-found__help-contact-icon">📧</span>
                  <div className="not-found__help-contact-info">
                    <span className="not-found__help-contact-label">E-mail</span>
                    <span className="not-found__help-contact-value">contato@bemestar.com</span>
                  </div>
                </a>
                
                <a 
                  href="https://wa.me/5511999999999" 
                   
                  rel="noopener noreferrer"
                  className="not-found__help-contact"
                >
                  <span className="not-found__help-contact-icon">💬</span>
                  <div className="not-found__help-contact-info">
                    <span className="not-found__help-contact-label">WhatsApp</span>
                    <span className="not-found__help-contact-value">Fale conosco</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;