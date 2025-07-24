import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useCart } from '../../../contexts/CartContext';
import './MostViewed.css';

const MostViewed = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [itemsPerView, setItemsPerView] = useState(4);
  const [wishlist, setWishlist] = useState([]);
  const carouselRef = useRef(null);
  const autoPlayRef = useRef(null);

  // Usar o contexto do carrinho
  const { addToCart, isInCart, getItemQuantity } = useCart();

  // Dados dos produtos mais vistos com métricas de visualização
  const mostViewedProducts = React.useMemo(() => [
    {
      id: 101,
      title: 'Vitamina D 2000UI',
      description: 'Fortalece ossos e sistema imunológico',
      price: 28.90,
      originalPrice: 42.90,
      discount: 33,
      image: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=280&h=200&fit=crop',
      category: 'Vitaminas',
      rating: 4.9,
      views: 2847,
      slug: 'vitamina-d-2000ui',
      badge: 'Mais Visto'
    },
    {
      id: 102,
      title: 'Protetor Solar Facial FPS 60',
      description: 'Proteção avançada para o rosto',
      price: 45.90,
      originalPrice: 68.90,
      discount: 33,
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=280&h=200&fit=crop',
      category: 'Beleza',
      rating: 4.8,
      views: 2634,
      slug: 'protetor-solar-facial-fps-60',
      badge: 'Top Visualizado'
    },
    {
      id: 103,
      title: 'Colágeno Hidrolisado',
      description: 'Para pele, cabelos e unhas saudáveis',
      price: 52.90,
      originalPrice: 78.90,
      discount: 33,
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=280&h=200&fit=crop',
      category: 'Suplementos',
      rating: 4.7,
      views: 2456,
      slug: 'colageno-hidrolisado',
      badge: 'Tendência'
    },
    {
      id: 104,
      title: 'Probiótico 10 Bilhões UFC',
      description: 'Melhora a saúde intestinal',
      price: 38.90,
      originalPrice: 55.90,
      discount: 30,
      image: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=280&h=200&fit=crop',
      category: 'Suplementos',
      rating: 4.8,
      views: 2298,
      slug: 'probiotico-10-bilhoes-ufc',
      badge: 'Procurado'
    },
    {
      id: 105,
      title: 'Magnésio Dimalato 500mg',
      description: 'Reduz cansaço e fadiga muscular',
      price: 32.90,
      originalPrice: 48.90,
      discount: 33,
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=280&h=200&fit=crop',
      category: 'Suplementos',
      rating: 4.6,
      views: 2187,
      slug: 'magnesio-dimalato-500mg',
      badge: 'Consultado'
    },
    {
      id: 106,
      title: 'Sérum Vitamina C 20%',
      description: 'Anti-idade e clareador facial',
      price: 35.90,
      originalPrice: 52.90,
      discount: 32,
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=280&h=200&fit=crop',
      category: 'Beleza',
      rating: 4.9,
      views: 2089,
      slug: 'serum-vitamina-c-20',
      badge: 'Favorito'
    },
    {
      id: 107,
      title: 'Melatonina 3mg',
      description: 'Melhora a qualidade do sono',
      price: 24.90,
      originalPrice: 36.90,
      discount: 32,
      image: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=280&h=200&fit=crop',
      category: 'Suplementos',
      rating: 4.7,
      views: 1987,
      slug: 'melatonina-3mg',
      badge: 'Pesquisado'
    },
    {
      id: 108,
      title: 'Shampoo Antiqueda',
      description: 'Fortalece e previne a queda capilar',
      price: 22.90,
      originalPrice: 34.90,
      discount: 34,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=280&h=200&fit=crop',
      category: 'Higiene',
      rating: 4.5,
      views: 1876,
      slug: 'shampoo-antiqueda',
      badge: 'Visualizado'
    }
  ], []);

  // Detectar itens por visualização baseado na tela
  useEffect(() => {
    const updateItemsPerView = () => {
      const width = window.innerWidth;
      if (width >= 1200) setItemsPerView(4);
      else if (width >= 992) setItemsPerView(3);
      else if (width >= 768) setItemsPerView(2);
      else setItemsPerView(1);
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  const totalItems = mostViewedProducts.length;
  const maxIndex = Math.max(0, totalItems - itemsPerView);

  // Função para ir para próximo slide
  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
  }, [isTransitioning, maxIndex]);

  // Função para ir para slide anterior
  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1));
  }, [isTransitioning, maxIndex]);

  // Auto-play
  useEffect(() => {
    if (isAutoPlaying && totalItems > itemsPerView) {
      autoPlayRef.current = setInterval(() => {
        nextSlide();
      }, 5000); // 5 segundos para produtos mais vistos
    } else {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, nextSlide, totalItems, itemsPerView]);

  // Reset de transição
  useEffect(() => {
    if (!isTransitioning) return;

    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [isTransitioning]);

  // Pausar auto-play no hover
  const handleMouseEnter = useCallback(() => {
    setIsAutoPlaying(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsAutoPlaying(true);
  }, []);

  // Navegar para página do produto
  const handleProductClick = useCallback((product) => {
    console.log('Navegando para produto mais visto:', product.slug);
    alert(`Redirecionando para: ${product.title}`);
  }, []);

  // Criar notificação melhorada
  const createNotification = useCallback((product, type = 'cart') => {
    const existingNotifications = document.querySelectorAll('.viewed-notification');
    existingNotifications.forEach(notification => {
      document.body.removeChild(notification);
    });

    const notification = document.createElement('div');
    notification.className = 'viewed-notification';
    
    const icon = type === 'cart' ? '🛒✅' : '❤️';
    const message = type === 'cart' 
      ? `${product.title} adicionado ao carrinho!` 
      : `${product.title} adicionado aos favoritos!`;
    
    notification.innerHTML = `
      <div class="viewed-notification__content">
        <div class="viewed-notification__header">
          <span class="viewed-notification__icon">${icon}</span>
          <button class="viewed-notification__close" onclick="this.parentElement.parentElement.parentElement.remove()">×</button>
        </div>
        <div class="viewed-notification__body">
          <img src="${product.image}" alt="${product.title}" class="viewed-notification__image">
          <div class="viewed-notification__info">
            <span class="viewed-notification__title">${product.title}</span>
            <span class="viewed-notification__price">${formatPrice(product.price)}</span>
            <span class="viewed-notification__views">${product.views.toLocaleString()} visualizações</span>
            <span class="viewed-notification__message">${message}</span>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add('viewed-notification--show');
    }, 100);

    setTimeout(() => {
      if (document.body.contains(notification)) {
        notification.classList.remove('viewed-notification--show');
        setTimeout(() => {
          if (document.body.contains(notification)) {
            document.body.removeChild(notification);
          }
        }, 300);
      }
    }, 5000);
  }, []);

  // Adicionar produto ao carrinho
  const handleAddToCart = useCallback((e, product) => {
    e.stopPropagation();
    
    addToCart(product);
    
    const button = document.querySelector(`[data-viewed-product-id="${product.id}"]`);
    if (button) {
      button.classList.add('viewed-card__cart-button--adding');
      setTimeout(() => {
        button.classList.remove('viewed-card__cart-button--adding');
      }, 600);
    }

    createNotification(product, 'cart');
  }, [addToCart, createNotification]);

  // Adicionar aos favoritos
  const handleAddToWishlist = useCallback((e, product) => {
    e.stopPropagation();
    
    setWishlist(prevWishlist => {
      const isAlreadyInWishlist = prevWishlist.find(item => item.id === product.id);
      if (isAlreadyInWishlist) {
        return prevWishlist.filter(item => item.id !== product.id);
      } else {
        createNotification(product, 'wishlist');
        return [...prevWishlist, product];
      }
    });

    const button = document.querySelector(`[data-viewed-wishlist-id="${product.id}"]`);
    if (button) {
      button.classList.add('viewed-card__wishlist-button--pulse');
      setTimeout(() => {
        button.classList.remove('viewed-card__wishlist-button--pulse');
      }, 600);
    }
  }, [createNotification]);

  // Verificar se item está nos favoritos
  const isInWishlist = useCallback((productId) => {
    return wishlist.some(item => item.id === productId);
  }, [wishlist]);

  // Formatar preço
  const formatPrice = useCallback((price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  }, []);

  // Formatar número de visualizações
  const formatViews = useCallback((views) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}k`;
    }
    return views.toString();
  }, []);

  // Renderizar estrelas de avaliação
  const renderStars = useCallback((rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="viewed-card__star viewed-card__star--full">★</span>);
    }

    if (hasHalfStar) {
      stars.push(<span key="half" className="viewed-card__star viewed-card__star--half">★</span>);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="viewed-card__star viewed-card__star--empty">☆</span>);
    }

    return stars;
  }, []);

  const translateX = -(currentIndex * (100 / itemsPerView));

  return (
    <section className="most-viewed">
      <div className="container">
        {/* Header */}
        <div className="most-viewed__header">
          <div className="most-viewed__title-section">
            <h2 className="most-viewed__title">
              <span className="most-viewed__icon">👁️</span>
              Mais Vistos pelos Clientes
            </h2>
            <p className="most-viewed__subtitle">
              Os produtos que mais despertam interesse e são consultados pelos nossos clientes
            </p>
          </div>
          
          {totalItems > itemsPerView && (
            <div className="most-viewed__controls">
              <button 
                className="most-viewed__control most-viewed__control--prev"
                onClick={prevSlide}
                disabled={isTransitioning}
                aria-label="Produto anterior"
              >
                <span className="most-viewed__arrow">‹</span>
              </button>
              <button 
                className="most-viewed__control most-viewed__control--next"
                onClick={nextSlide}
                disabled={isTransitioning}
                aria-label="Próximo produto"
              >
                <span className="most-viewed__arrow">›</span>
              </button>
            </div>
          )}
        </div>

        <div 
          className="most-viewed__container"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div 
            ref={carouselRef}
            className="most-viewed__track"
            style={{
              transform: `translateX(${translateX}%)`,
              transition: isTransitioning ? 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none'
            }}
          >
            {mostViewedProducts.map((product) => (
              <div key={product.id} className="most-viewed__item">
                <div 
                  className="viewed-card viewed-card--clickable"
                  onClick={() => handleProductClick(product)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleProductClick(product);
                    }
                  }}
                  aria-label={`Ver detalhes do produto ${product.title}`}
                >
                  {/* Badge de produto mais visto */}
                  <div className="viewed-card__badge">
                    <span className="viewed-card__badge-text">{product.badge}</span>
                  </div>

                  {/* Desconto */}
                  <div className="viewed-card__discount">
                    <span className="viewed-card__discount-text">{product.discount}% OFF</span>
                  </div>

                  {/* Badge de quantidade no carrinho */}
                  {isInCart(product.id) && (
                    <div className="viewed-card__cart-badge">
                      <span className="viewed-card__cart-badge-text">
                        {getItemQuantity(product.id)}x no carrinho
                      </span>
                    </div>
                  )}

                  <div className="viewed-card__image-container">
                    <img 
                      src={product.image} 
                      alt={product.title}
                      className="viewed-card__image"
                      loading="lazy"
                    />
                    <div className="viewed-card__image-overlay">
                      <span className="viewed-card__click-hint">
                        👁️ Clique para ver detalhes
                      </span>
                    </div>
                  </div>

                  <div className="viewed-card__content">
                    <div className="viewed-card__category">{product.category}</div>
                    <h3 className="viewed-card__title">{product.title}</h3>
                    <p className="viewed-card__description">{product.description}</p>
                    
                    {/* Visualizações */}
                    <div className="viewed-card__views">
                      <span className="viewed-card__views-icon">👁️</span>
                      <span className="viewed-card__views-count">
                        {formatViews(product.views)} visualizações
                      </span>
                    </div>
                    
                    {/* Avaliação */}
                    <div className="viewed-card__rating">
                      <div className="viewed-card__stars">
                        {renderStars(product.rating)}
                      </div>
                      <span className="viewed-card__rating-value">({product.rating})</span>
                    </div>
                    
                    <div className="viewed-card__pricing-section">
                      <div className="viewed-card__pricing">
                        <span className="viewed-card__original-price">
                          De: {formatPrice(product.originalPrice)}
                        </span>
                        <span className="viewed-card__offer-price">
                          Por: {formatPrice(product.price)}
                        </span>
                      </div>

                      <div className="viewed-card__actions">
                        <button
                          className={`viewed-card__cart-button ${
                            isInCart(product.id) ? 'viewed-card__cart-button--active' : ''
                          }`}
                          onClick={(e) => handleAddToCart(e, product)}
                          data-viewed-product-id={product.id}
                          aria-label="Adicionar ao carrinho"
                          title="Adicionar ao carrinho"
                        >
                          🛒
                        </button>
                        <button 
                          className={`viewed-card__wishlist-button ${
                            isInWishlist(product.id) ? 'viewed-card__wishlist-button--active' : ''
                          }`}
                          onClick={(e) => handleAddToWishlist(e, product)}
                          data-viewed-wishlist-id={product.id}
                          aria-label="Adicionar aos favoritos"
                          title={isInWishlist(product.id) ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                        >
                          {isInWishlist(product.id) ? '♥' : '♡'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MostViewed;