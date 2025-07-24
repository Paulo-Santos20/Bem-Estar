import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useCart } from '../../../contexts/CartContext';
import './OffersCarousel.css';

const OffersCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [itemsPerView, setItemsPerView] = useState(4);
  const [wishlist, setWishlist] = useState([]);
  const carouselRef = useRef(null);
  const autoPlayRef = useRef(null);

  // Usar o contexto do carrinho
  const { addToCart, isInCart, getItemQuantity } = useCart();

  // Dados das ofertas com imagens reais
  const offers = React.useMemo(() => [
    {
      id: 1,
      title: 'Paracetamol 500mg',
      description: 'Alívio rápido para dores e febre',
      originalPrice: 15.90,
      offerPrice: 8.90,
      discount: 44,
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=280&h=200&fit=crop',
      category: 'Medicamentos',
      rating: 4.8
    },
    {
      id: 2,
      title: 'Vitamina C 1000mg',
      description: 'Fortalece o sistema imunológico',
      originalPrice: 35.90,
      offerPrice: 22.90,
      discount: 36,
      image: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=280&h=200&fit=crop',
      category: 'Vitaminas',
      rating: 4.9
    },
    {
      id: 3,
      title: 'Protetor Solar FPS 60',
      description: 'Proteção máxima contra raios UV',
      originalPrice: 49.90,
      offerPrice: 34.90,
      discount: 30,
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=280&h=200&fit=crop',
      category: 'Beleza',
      rating: 4.7
    },
    {
      id: 4,
      title: 'Dipirona 500mg',
      description: 'Analgésico e antitérmico eficaz',
      originalPrice: 12.90,
      offerPrice: 7.90,
      discount: 39,
      image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=280&h=200&fit=crop',
      category: 'Medicamentos',
      rating: 4.6
    },
    {
      id: 5,
      title: 'Ômega 3 1000mg',
      description: 'Suplemento para saúde cardiovascular',
      originalPrice: 58.90,
      offerPrice: 39.90,
      discount: 32,
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=280&h=200&fit=crop',
      category: 'Suplementos',
      rating: 4.8
    },
    {
      id: 6,
      title: 'Shampoo Anticaspa',
      description: 'Tratamento eficaz contra caspa',
      originalPrice: 24.90,
      offerPrice: 16.90,
      discount: 32,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=280&h=200&fit=crop',
      category: 'Higiene',
      rating: 4.5
    },
    {
      id: 7,
      title: 'Multivitamínico',
      description: 'Complexo vitamínico completo',
      originalPrice: 42.90,
      offerPrice: 28.90,
      discount: 33,
      image: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=280&h=200&fit=crop',
      category: 'Vitaminas',
      rating: 4.7
    },
    {
      id: 8,
      title: 'Hidratante Facial',
      description: 'Hidratação profunda para todos os tipos de pele',
      originalPrice: 38.90,
      offerPrice: 25.90,
      discount: 33,
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=280&h=200&fit=crop',
      category: 'Beleza',
      rating: 4.9
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

  const totalItems = offers.length;
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
      }, 4000);
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

  // Adicionar produto ao carrinho usando o contexto
  const handleAddToCart = useCallback((offer) => {
    addToCart(offer);
    
    // Feedback visual com animação
    const button = document.querySelector(`[data-product-id="${offer.id}"]`);
    if (button) {
      button.classList.add('offer-card__cart-button--adding');
      setTimeout(() => {
        button.classList.remove('offer-card__cart-button--adding');
      }, 600);
    }

    // Criar notificação visual
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
      <div class="cart-notification__content">
        <span class="cart-notification__icon">✅</span>
        <span class="cart-notification__text">${offer.title} adicionado ao carrinho!</span>
      </div>
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add('cart-notification--show');
    }, 100);

    setTimeout(() => {
      notification.classList.remove('cart-notification--show');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }, [addToCart]);

  // Adicionar aos favoritos
  const handleAddToWishlist = useCallback((offer) => {
    setWishlist(prevWishlist => {
      const isAlreadyInWishlist = prevWishlist.find(item => item.id === offer.id);
      if (isAlreadyInWishlist) {
        return prevWishlist.filter(item => item.id !== offer.id);
      } else {
        return [...prevWishlist, offer];
      }
    });

    // Feedback visual para favoritos
    const button = document.querySelector(`[data-wishlist-id="${offer.id}"]`);
    if (button) {
      button.classList.add('offer-card__wishlist-button--pulse');
      setTimeout(() => {
        button.classList.remove('offer-card__wishlist-button--pulse');
      }, 600);
    }
  }, []);

  // Verificar se item está nos favoritos
  const isInWishlist = useCallback((offerId) => {
    return wishlist.some(item => item.id === offerId);
  }, [wishlist]);

  // Formatar preço
  const formatPrice = useCallback((price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  }, []);

  // Renderizar estrelas de avaliação (apenas estrelas)
  const renderStars = useCallback((rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="offer-card__star offer-card__star--full">★</span>);
    }

    if (hasHalfStar) {
      stars.push(<span key="half" className="offer-card__star offer-card__star--half">★</span>);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="offer-card__star offer-card__star--empty">☆</span>);
    }

    return stars;
  }, []);

  const translateX = -(currentIndex * (100 / itemsPerView));

  return (
    <div className="offers-carousel">
      {/* Título simplificado */}
      <div className="offers-carousel__header">
        <h2 className="offers-carousel__title">As Melhores Ofertas da Semana</h2>
        
        {totalItems > itemsPerView && (
          <div className="offers-carousel__controls">
            <button 
              className="offers-carousel__control offers-carousel__control--prev"
              onClick={prevSlide}
              disabled={isTransitioning}
              aria-label="Oferta anterior"
            >
              <span className="offers-carousel__arrow">‹</span>
            </button>
            <button 
              className="offers-carousel__control offers-carousel__control--next"
              onClick={nextSlide}
              disabled={isTransitioning}
              aria-label="Próxima oferta"
            >
              <span className="offers-carousel__arrow">›</span>
            </button>
          </div>
        )}
      </div>

      <div 
        className="offers-carousel__container"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div 
          ref={carouselRef}
          className="offers-carousel__track"
          style={{
            transform: `translateX(${translateX}%)`,
            transition: isTransitioning ? 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none'
          }}
        >
          {offers.map((offer) => (
            <div key={offer.id} className="offers-carousel__item">
              <div className="offer-card">
                {/* Desconto no topo */}
                <div className="offer-card__discount">
                  <span className="offer-card__discount-text">{offer.discount}% OFF</span>
                </div>

                {/* Badge de quantidade no carrinho */}
                {isInCart(offer.id) && (
                  <div className="offer-card__cart-badge">
                    <span className="offer-card__cart-badge-text">
                      {getItemQuantity(offer.id)}x no carrinho
                    </span>
                  </div>
                )}

                <div className="offer-card__image-container">
                  <img 
                    src={offer.image} 
                    alt={offer.title}
                    className="offer-card__image"
                    loading="lazy"
                  />
                  <div className="offer-card__image-overlay">
                    <button 
                      className="offer-card__quick-view"
                      onClick={() => console.log('Ver detalhes:', offer.id)}
                      aria-label={`Ver detalhes de ${offer.title}`}
                    >
                      👁️ Ver Detalhes
                    </button>
                  </div>
                </div>

                <div className="offer-card__content">
                  <div className="offer-card__category">{offer.category}</div>
                  <h3 className="offer-card__title">{offer.title}</h3>
                  <p className="offer-card__description">{offer.description}</p>
                  
                  {/* Apenas estrelas, sem texto de avaliações */}
                  <div className="offer-card__rating">
                    <div className="offer-card__stars">
                      {renderStars(offer.rating)}
                    </div>
                    <span className="offer-card__rating-value">({offer.rating})</span>
                  </div>
                  
                  <div className="offer-card__pricing-section">
                    <div className="offer-card__pricing">
                      <span className="offer-card__original-price">
                        De: {formatPrice(offer.originalPrice)}
                      </span>
                      <span className="offer-card__offer-price">
                        Por: {formatPrice(offer.offerPrice)}
                      </span>
                    </div>

                    <div className="offer-card__actions">
                      <button
                        className={`offer-card__cart-button ${
                          isInCart(offer.id) ? 'offer-card__cart-button--active' : ''
                        }`}
                        onClick={() => handleAddToCart(offer)}
                        data-product-id={offer.id}
                        aria-label="Adicionar ao carrinho"
                        title="Adicionar ao carrinho"
                      >
                        🛒
                      </button>
                      <button 
                        className={`offer-card__wishlist-button ${
                          isInWishlist(offer.id) ? 'offer-card__wishlist-button--active' : ''
                        }`}
                        onClick={() => handleAddToWishlist(offer)}
                        data-wishlist-id={offer.id}
                        aria-label="Adicionar aos favoritos"
                        title={isInWishlist(offer.id) ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                      >
                        {isInWishlist(offer.id) ? '♥' : '♡'}
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
  );
};

export default OffersCarousel;