// src/components/features/SaleCarousel/SaleCarousel.jsx
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../contexts/CartContext';
import { products } from '../../../data/products';
import './SaleCarousel.css';

const AUTO_INTERVAL = 4500;

function getItemsPerPage() {
  if (window.innerWidth <= 600) return 2;
  if (window.innerWidth < 1024) return 3;
  return 4;
}

const SaleCarousel = () => {
  const [start, setStart] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage());
  const [notification, setNotification] = useState(null);
  const [addingToCart, setAddingToCart] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
  
  // Estados para touch/swipe
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  
  const intervalRef = useRef();
  const carouselRef = useRef();
  const navigate = useNavigate();

  // Usar o contexto do carrinho
  const { addToCart, formatPrice } = useCart();

  // Filtrar apenas produtos em promoção (que têm originalPrice > price)
  const saleProducts = products.filter(product => 
    product.originalPrice && product.originalPrice > product.price
  );

  // Responsividade
  useEffect(() => {
    function handleResize() {
      const newItemsPerPage = getItemsPerPage();
      const newIsMobile = window.innerWidth <= 767;
      setItemsPerPage(newItemsPerPage);
      setIsMobile(newIsMobile);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Avança exatamente 1 produto, não 1 página
  const goToNext = () => {
    setStart(prev => (prev + 1) % saleProducts.length);
  };

  const goToPrev = () => {
    setStart(prev => (prev - 1 + saleProducts.length) % saleProducts.length);
  };

  // Auto-play (pausado no mobile durante interação)
  useEffect(() => {
    if (saleProducts.length > 0 && !isDragging) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(goToNext, AUTO_INTERVAL);
      return () => clearInterval(intervalRef.current);
    }
  }, [itemsPerPage, saleProducts.length, isDragging]);

  // ===== FUNÇÕES DE TOUCH/SWIPE =====
  const handleTouchStart = (e) => {
    if (!isMobile) return;
    
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsDragging(true);
    
    // Pausar auto-play durante interação
    clearInterval(intervalRef.current);
  };

  const handleTouchMove = (e) => {
    if (!isMobile) return;
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!isMobile || !touchStart || !touchEnd) {
      setIsDragging(false);
      return;
    }

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      goToNext();
    }

    if (isRightSwipe) {
      goToPrev();
    }

    setIsDragging(false);
    
    // Retomar auto-play após 3 segundos
    setTimeout(() => {
      if (saleProducts.length > 0) {
        intervalRef.current = setInterval(goToNext, AUTO_INTERVAL);
      }
    }, 3000);
  };

  // Função para navegar para página do produto
  const handleProductClick = (product) => {
    navigate(`/produto/${product.slug}`);
  };

  // Função para adicionar ao carrinho
  const handleAddToCart = async (e, product) => {
    // Prevenir que o clique no carrinho abra a página do produto
    e.stopPropagation();
    
    try {
      setAddingToCart(product.id);

      // Adicionar ao carrinho usando a estrutura correta
      addToCart({
        id: product.id,
        title: product.name,
        offerPrice: product.price,
        image: product.images[0],
        quantity: 1
      });

      // Mostrar notificação
      setNotification({
        title: product.name,
        price: product.price,
        image: product.images[0]
      });

      // Remover notificação após 3 segundos
      setTimeout(() => {
        setNotification(null);
      }, 3000);

    } catch (error) {
      console.error('Erro ao adicionar produto ao carrinho:', error);
    } finally {
      // Remover estado de loading após 500ms
      setTimeout(() => {
        setAddingToCart(null);
      }, 500);
    }
  };

  // Calcular desconto percentual
  const calculateDiscount = (originalPrice, price) => {
    if (!originalPrice || !price || originalPrice <= price) return 0;
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  };

  // Calcular indicadores de página para mobile
  const getTotalPages = () => {
    if (!isMobile) return 0;
    return saleProducts.length;
  };

  const getCurrentPage = () => {
    if (!isMobile) return 0;
    return start;
  };

  // Ir para página específica (indicadores)
  const goToPage = (pageIndex) => {
    if (!isMobile) return;
    
    clearInterval(intervalRef.current);
    setStart(pageIndex);
    
    // Retomar auto-play após 3 segundos
    setTimeout(() => {
      if (saleProducts.length > 0) {
        intervalRef.current = setInterval(goToNext, AUTO_INTERVAL);
      }
    }, 3000);
  };

  // Se não há produtos em promoção, não renderizar a seção
  if (saleProducts.length === 0) {
    return null;
  }

  // Produtos visíveis, sempre sequenciais
  const visibleProducts = [];
  for (let i = 0; i < Math.min(itemsPerPage, saleProducts.length); i++) {
    visibleProducts.push(saleProducts[(start + i) % saleProducts.length]);
  }

  return (
    <section className="sale-carousel-section">
      <div className="container">
        <div className="sale-carousel-header">
          <div className="sale-carousel-title-container">
            <h2 className="sale-carousel-title">
              <span className="sale-carousel-title-icon">🔥</span>
              Produtos em Promoção
            </h2>
            <p className="sale-carousel-subtitle">
              {isMobile ? 'Deslize para ver mais' : 'Aproveite as melhores ofertas da nossa loja'}
            </p>
          </div>
          <button 
            className="sale-carousel-viewall"
            onClick={() => navigate('/produtos?filter=sale')}
          >
            Ver Todos
          </button>
        </div>
        
        <div 
          className={`carousel-sale-products-outer ${isMobile ? 'mobile-touch' : ''}`}
          ref={carouselRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Setas apenas para desktop */}
          {!isMobile && (
            <button
              aria-label="Anterior"
              className="carousel-arrow-sale left"
              onClick={() => { goToPrev(); clearInterval(intervalRef.current); }}
              tabIndex={0}
            >
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
                <path d="M15.5 19L8.5 12L15.5 5" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" />
              </svg>
            </button>
          )}
          
          <ul className={`carousel-sale-products-list ${isMobile ? 'mobile-swipe' : ''}`}>
            {visibleProducts.map((product, idx) => (
              <li 
                className={`carousel-sale-products-item ${isMobile ? 'mobile-item' : ''}`}
                key={product.id}
                onClick={() => handleProductClick(product)}
              >
                {/* Badges */}
                <div className="sale-carousel-badges">
                  {calculateDiscount(product.originalPrice, product.price) > 0 && (
                    <span className="sale-carousel-badge sale-carousel-badge--discount">
                      -{calculateDiscount(product.originalPrice, product.price)}%
                    </span>
                  )}
                  {product.isNew && (
                    <span className="sale-carousel-badge sale-carousel-badge--new">
                      Novo
                    </span>
                  )}
                  {product.isBestSeller && (
                    <span className="sale-carousel-badge sale-carousel-badge--bestseller">
                      Mais Vendido
                    </span>
                  )}
                </div>

                <div className="sale-carousel-image-container">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="sale-carousel-image"
                    onError={(e) => {
                      // Fallback para imagem padrão se não carregar
                      e.target.src = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=300&fit=crop';
                    }}
                  />
                </div>
                
                <div className="sale-carousel-content">
                  {product.brand && (
                    <div className="sale-carousel-brand">{product.brand}</div>
                  )}
                  
                  <h3 className="sale-carousel-name">{product.name}</h3>
                  
                  <div className="sale-carousel-rating">
                    <span className="sale-carousel-stars">
                      {Array.from({ length: 5 }, (_, i) => (
                        <span
                          key={i}
                          className={`sale-carousel-star ${
                            i < Math.round(product.rating) ? 'sale-carousel-star--filled' : ''
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </span>
                    <span className="sale-carousel-rating-score">
                      ({product.rating.toFixed(1)})
                    </span>
                  </div>
                  
                  <div className="sale-carousel-pricing">
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="sale-carousel-original-price">
                        De {formatPrice(product.originalPrice)}
                      </span>
                    )}
                    <div className="sale-carousel-price-row">
                      <span className="sale-carousel-price">
                        {formatPrice(product.price)}
                      </span>
                      <button
                        className={`sale-carousel-cart-icon ${addingToCart === product.id ? 'loading' : ''}`}
                        onClick={(e) => handleAddToCart(e, product)}
                        disabled={addingToCart === product.id}
                        aria-label={`Adicionar ${product.name} ao carrinho`}
                      >
                        {addingToCart === product.id ? (
                          <svg width="18" height="18" viewBox="0 0 24 24" className="loading-spinner">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="31.416" strokeDashoffset="31.416">
                              <animate attributeName="stroke-dasharray" dur="2s" values="0 31.416;15.708 15.708;0 31.416" repeatCount="indefinite"/>
                              <animate attributeName="stroke-dashoffset" dur="2s" values="0;-15.708;-31.416" repeatCount="indefinite"/>
                            </circle>
                          </svg>
                        ) : (
                          <span className="sale-carousel-cart-emoji">🛒</span>
                        )}
                      </button>
                    </div>
                  </div>
                  
                  {product.originalPrice && product.originalPrice > product.price && (
                    <div className="sale-carousel-savings">
                      Economize {formatPrice(product.originalPrice - product.price)}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
          
          {/* Setas apenas para desktop */}
          {!isMobile && (
            <button
              aria-label="Próximo"
              className="carousel-arrow-sale right"
              onClick={() => { goToNext(); clearInterval(intervalRef.current); }}
              tabIndex={0}
            >
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
                <path d="M8.5 5L15.5 12L8.5 19" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" />
              </svg>
            </button>
          )}
        </div>

        {/* Indicadores de página - apenas mobile */}
        {isMobile && saleProducts.length > 1 && (
          <div className="sale-carousel-indicators">
            {Array.from({ length: getTotalPages() }).map((_, index) => (
              <button
                key={index}
                className={`sale-carousel-indicator ${index === getCurrentPage() ? 'active' : ''}`}
                onClick={() => goToPage(index)}
                aria-label={`Ir para produto ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* Contador de página - apenas mobile */}
        {isMobile && saleProducts.length > 1 && (
          <div className="sale-carousel-page-counter">
            <span>{getCurrentPage() + 1} de {getTotalPages()}</span>
          </div>
        )}
      </div>

      {/* Notificação de produto adicionado */}
      {notification && (
        <div className="sale-carousel-notification sale-carousel-notification--show">
          <div className="sale-carousel-notification__content">
            <div className="sale-carousel-notification__header">
              <span className="sale-carousel-notification__icon">✅</span>
              <button
                className="sale-carousel-notification__close"
                onClick={() => setNotification(null)}
                aria-label="Fechar notificação"
              >
                ✕
              </button>
            </div>
            <div className="sale-carousel-notification__body">
              <img
                src={notification.image}
                alt={notification.title}
                className="sale-carousel-notification__image"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=60&h=60&fit=crop';
                }}
              />
              <div className="sale-carousel-notification__info">
                <h4 className="sale-carousel-notification__title">{notification.title}</h4>
                <p className="sale-carousel-notification__price">{formatPrice(notification.price)}</p>
                <p className="sale-carousel-notification__message">Adicionado ao carrinho!</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SaleCarousel;