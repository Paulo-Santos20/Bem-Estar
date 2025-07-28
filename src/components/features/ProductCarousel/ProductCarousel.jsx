// src/components/features/ProductCarousel/ProductCarousel.jsx
import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../contexts/CartContext';
import { products } from '../../../data/products';
import './ProductCarousel.css';

const AUTO_INTERVAL = 4500;

function getItemsPerPage() {
  if (window.innerWidth <= 600) return 2;
  if (window.innerWidth < 1024) return 3;
  return 4;
}

const ProductCarousel = () => {
  const [start, setStart] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage());
  const [notification, setNotification] = useState(null);
  const [addingToCart, setAddingToCart] = useState(null);
  const intervalRef = useRef();
  const navigate = useNavigate();

  // Usar o contexto do carrinho
  const { addToCart, formatPrice } = useCart();

  // Filtrar apenas produtos novos
  const newProducts = products.filter(product => product.isNew);

  // Responsividade
  useEffect(() => {
    function handleResize() {
      setItemsPerPage(getItemsPerPage());
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Avança exatamente 1 produto, não 1 página
  const goToNext = () => {
    setStart(prev => (prev + 1) % newProducts.length);
  };

  const goToPrev = () => {
    setStart(prev => (prev - 1 + newProducts.length) % newProducts.length);
  };

  // Auto-play  
  useEffect(() => {
    if (newProducts.length > 0) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(goToNext, AUTO_INTERVAL);
      return () => clearInterval(intervalRef.current);
    }
  }, [itemsPerPage, newProducts.length]);

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

  // Se não há produtos novos, não renderizar a seção
  if (newProducts.length === 0) {
    return null;
  }

  // Produtos visíveis, sempre sequenciais
  const visibleProducts = [];
  for (let i = 0; i < Math.min(itemsPerPage, newProducts.length); i++) {
    visibleProducts.push(newProducts[(start + i) % newProducts.length]);
  }

  return (
    <section className="product-carousel-section">
      <div className="container">
        <div className="product-carousel-header">
          <div className="product-carousel-title-container">
            <h2 className="product-carousel-title">
              <span className="product-carousel-title-icon">🆕</span>
              Novos Produtos
            </h2>
            <p className="product-carousel-subtitle">Confira os últimos lançamentos da nossa loja</p>
          </div>
          <button 
            className="product-carousel-viewall"
            onClick={() => navigate('/produtos?filter=new')}
          >
            Ver Todos
          </button>
        </div>
        
        <div className="carousel-new-products-outer">
          <button
            aria-label="Anterior"
            className="carousel-arrow-new left"
            onClick={() => { goToPrev(); clearInterval(intervalRef.current); }}
            tabIndex={0}
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
              <path d="M15.5 19L8.5 12L15.5 5" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" />
            </svg>
          </button>
          
          <ul className="carousel-new-products-list">
            {visibleProducts.map((product, idx) => (
              <li 
                className="carousel-new-products-item" 
                key={product.id}
                onClick={() => handleProductClick(product)}
              >
                {/* Badges */}
                <div className="product-carousel-badges">
                  {calculateDiscount(product.originalPrice, product.price) > 0 && (
                    <span className="product-carousel-badge product-carousel-badge--discount">
                      -{calculateDiscount(product.originalPrice, product.price)}%
                    </span>
                  )}
                  {product.isNew && (
                    <span className="product-carousel-badge product-carousel-badge--new">
                      Novo
                    </span>
                  )}
                  {product.isBestSeller && (
                    <span className="product-carousel-badge product-carousel-badge--bestseller">
                      Mais Vendido
                    </span>
                  )}
                </div>

                <div className="product-carousel-image-container">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="product-carousel-image"
                    onError={(e) => {
                      // Fallback para imagem padrão se não carregar
                      e.target.src = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=300&fit=crop';
                    }}
                  />
                </div>
                
                <div className="product-carousel-content">
                  {product.brand && (
                    <div className="product-carousel-brand">{product.brand}</div>
                  )}
                  
                  <h3 className="product-carousel-name">{product.name}</h3>
                  
                  <div className="product-carousel-rating">
                    <span className="product-carousel-stars">
                      {Array.from({ length: 5 }, (_, i) => (
                        <span
                          key={i}
                          className={`product-carousel-star ${
                            i < Math.round(product.rating) ? 'product-carousel-star--filled' : ''
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </span>
                    <span className="product-carousel-rating-score">
                      ({product.rating.toFixed(1)})
                    </span>
                  </div>
                  
                  <div className="product-carousel-pricing">
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="product-carousel-original-price">
                        De {formatPrice(product.originalPrice)}
                      </span>
                    )}
                    <div className="product-carousel-price-row">
                      <span className="product-carousel-price">
                        {formatPrice(product.price)}
                      </span>
                      <button
                        className={`product-carousel-cart-icon ${addingToCart === product.id ? 'loading' : ''}`}
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
                          <span className="product-carousel-cart-emoji">🛒</span>
                        )}
                      </button>
                    </div>
                  </div>
                  
                  {product.originalPrice && product.originalPrice > product.price && (
                    <div className="product-carousel-savings">
                      Economize {formatPrice(product.originalPrice - product.price)}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
          
          <button
            aria-label="Próximo"
            className="carousel-arrow-new right"
            onClick={() => { goToNext(); clearInterval(intervalRef.current); }}
            tabIndex={0}
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
              <path d="M8.5 5L15.5 12L8.5 19" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Notificação de produto adicionado */}
      {notification && (
        <div className="product-carousel-notification product-carousel-notification--show">
          <div className="product-carousel-notification__content">
            <div className="product-carousel-notification__header">
              <span className="product-carousel-notification__icon">✅</span>
              <button
                className="product-carousel-notification__close"
                onClick={() => setNotification(null)}
                aria-label="Fechar notificação"
              >
                ✕
              </button>
            </div>
            <div className="product-carousel-notification__body">
              <img
                src={notification.image}
                alt={notification.title}
                className="product-carousel-notification__image"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=60&h=60&fit=crop';
                }}
              />
              <div className="product-carousel-notification__info">
                <h4 className="product-carousel-notification__title">{notification.title}</h4>
                <p className="product-carousel-notification__price">{formatPrice(notification.price)}</p>
                <p className="product-carousel-notification__message">Adicionado ao carrinho!</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductCarousel;