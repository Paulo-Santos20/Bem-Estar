import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../contexts/CartContext';
import { products } from '../../../data/products';
import './FeaturedProducts.css';

const AUTO_INTERVAL = 4500;

function getItemsPerPage() {
  if (window.innerWidth <= 600) return 2;
  if (window.innerWidth < 1024) return 3;
  return 4;
}

const FeaturedProducts = () => {
  const [start, setStart] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage());
  const [notification, setNotification] = useState(null);
  const [addingToCart, setAddingToCart] = useState(null);
  const intervalRef = useRef();
  const navigate = useNavigate();

  // Usar o contexto do carrinho
  const { addToCart, formatPrice } = useCart();

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
    setStart(prev => (prev + 1) % products.length);
  };

  const goToPrev = () => {
    setStart(prev => (prev - 1 + products.length) % products.length);
  };

  // Auto-play  
  useEffect(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(goToNext, AUTO_INTERVAL);
    return () => clearInterval(intervalRef.current);
  }, [itemsPerPage]);

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
        title: product.name, // usar 'name' ao invés de 'title'
        offerPrice: product.price, // usar 'price' ao invés de 'offerPrice'
        image: product.images[0], // usar primeiro item do array 'images'
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

  // Produtos visíveis, sempre sequenciais
  const visibleProducts = [];
  for (let i = 0; i < itemsPerPage; i++) {
    visibleProducts.push(products[(start + i) % products.length]);
  }

  return (
    <section className="featured-products-section">
      <div className="container">
        <div className="featured-products-header">
          <div className="featured-products-title-container">
            <h2 className="featured-products-title">
              <span className="featured-products-title-icon">⭐</span>
              Destaques da Semana
            </h2>
            <p className="featured-products-subtitle">Produtos selecionados pelo nosso time</p>
          </div>
          <button 
            className="featured-products-viewall"
            onClick={() => navigate('/produtos')}
          >
            Ver Todos
          </button>
        </div>
        
        <div className="carousel-products-outer">
          <button
            aria-label="Anterior"
            className="carousel-arrow left"
            onClick={() => { goToPrev(); clearInterval(intervalRef.current); }}
            tabIndex={0}
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none">
              <path d="M15.5 19L8.5 12L15.5 5" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" />
            </svg>
          </button>
          
          <ul className="carousel-products-list">
            {visibleProducts.map((product, idx) => (
              <li 
                className="carousel-products-item" 
                key={product.id}
                onClick={() => handleProductClick(product)}
              >
                {/* Badges */}
                <div className="featured-products-badges">
                  {calculateDiscount(product.originalPrice, product.price) > 0 && (
                    <span className="featured-products-badge featured-products-badge--discount">
                      -{calculateDiscount(product.originalPrice, product.price)}%
                    </span>
                  )}
                  {product.isNew && (
                    <span className="featured-products-badge featured-products-badge--new">
                      Novo
                    </span>
                  )}
                  {product.isBestSeller && (
                    <span className="featured-products-badge featured-products-badge--bestseller">
                      Mais Vendido
                    </span>
                  )}
                </div>

                {/* Overlay removido - agora o card inteiro é clicável */}

                <div className="featured-products-image-container">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="featured-products-image"
                    onError={(e) => {
                      // Fallback para imagem padrão se não carregar
                      e.target.src = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=300&fit=crop';
                    }}
                  />
                </div>
                
                <div className="featured-products-content">
                  {product.brand && (
                    <div className="featured-products-brand">{product.brand}</div>
                  )}
                  
                  <h3 className="featured-products-name">{product.name}</h3>
                  
                  <div className="featured-products-rating">
                    <span className="featured-products-stars">
                      {Array.from({ length: 5 }, (_, i) => (
                        <span
                          key={i}
                          className={`featured-products-star ${
                            i < Math.round(product.rating) ? 'featured-products-star--filled' : ''
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </span>
                    <span className="featured-products-rating-score">
                      ({product.rating.toFixed(1)})
                    </span>
                  </div>
                  
                  <div className="featured-products-pricing">
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="featured-products-original-price">
                        De {formatPrice(product.originalPrice)}
                      </span>
                    )}
                    <div className="featured-products-price-row">
                      <span className="featured-products-price">
                        {formatPrice(product.price)}
                      </span>
                      <button
                        className={`featured-products-cart-icon ${addingToCart === product.id ? 'loading' : ''}`}
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
                          <span className="featured-products-cart-emoji">🛒</span>
                        )}
                      </button>
                    </div>
                  </div>
                  
                  {product.originalPrice && product.originalPrice > product.price && (
                    <div className="featured-products-savings">
                      Economize {formatPrice(product.originalPrice - product.price)}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
          
          <button
            aria-label="Próximo"
            className="carousel-arrow right"
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
        <div className="featured-cart-notification featured-cart-notification--show">
          <div className="featured-cart-notification__content">
            <div className="featured-cart-notification__header">
              <span className="featured-cart-notification__icon">✅</span>
              <button
                className="featured-cart-notification__close"
                onClick={() => setNotification(null)}
                aria-label="Fechar notificação"
              >
                ✕
              </button>
            </div>
            <div className="featured-cart-notification__body">
              <img
                src={notification.image}
                alt={notification.title}
                className="featured-cart-notification__image"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=60&h=60&fit=crop';
                }}
              />
              <div className="featured-cart-notification__info">
                <h4 className="featured-cart-notification__title">{notification.title}</h4>
                <p className="featured-cart-notification__price">{formatPrice(notification.price)}</p>
                <p className="featured-cart-notification__message">Adicionado ao carrinho!</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default FeaturedProducts;