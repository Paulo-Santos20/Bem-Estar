import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../../../contexts/CartContext';
import Button from '../../ui/Button/Button';
import './OffersCarousel.css';

const OffersCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const carouselRef = useRef(null);
  const autoPlayRef = useRef(null);
  const { addItem } = useCart();

  // Dados das ofertas
  const offers = [
    {
      id: 1,
      title: 'Paracetamol 500mg',
      description: 'Alívio rápido para dores e febre',
      originalPrice: 15.90,
      offerPrice: 8.90,
      discount: 44,
      image: '/api/placeholder/200/200',
      category: 'Medicamentos',
      stock: 50,
      badge: 'Mais Vendido'
    },
    {
      id: 2,
      title: 'Vitamina C 1g',
      description: 'Fortalece o sistema imunológico',
      originalPrice: 35.90,
      offerPrice: 22.90,
      discount: 36,
      image: '/api/placeholder/200/200',
      category: 'Vitaminas',
      stock: 30,
      badge: 'Oferta Especial'
    },
    {
      id: 3,
      title: 'Protetor Solar FPS 60',
      description: 'Proteção máxima contra raios UV',
      originalPrice: 49.90,
      offerPrice: 34.90,
      discount: 30,
      image: '/api/placeholder/200/200',
      category: 'Beleza',
      stock: 25,
      badge: 'Lançamento'
    },
    {
      id: 4,
      title: 'Dipirona 500mg',
      description: 'Analgésico e antitérmico eficaz',
      originalPrice: 12.90,
      offerPrice: 7.90,
      discount: 39,
      image: '/api/placeholder/200/200',
      category: 'Medicamentos',
      stock: 40,
      badge: 'Promoção'
    },
    {
      id: 5,
      title: 'Ômega 3',
      description: 'Suplemento para saúde cardiovascular',
      originalPrice: 58.90,
      offerPrice: 39.90,
      discount: 32,
      image: '/api/placeholder/200/200',
      category: 'Suplementos',
      stock: 20,
      badge: 'Oferta Limitada'
    },
    {
      id: 6,
      title: 'Shampoo Anticaspa',
      description: 'Tratamento eficaz contra caspa',
      originalPrice: 24.90,
      offerPrice: 16.90,
      discount: 32,
      image: '/api/placeholder/200/200',
      category: 'Higiene',
      stock: 35,
      badge: 'Desconto'
    }
  ];

  // Duplicar ofertas para carrossel infinito
  const extendedOffers = [...offers, ...offers, ...offers];
  const itemsPerView = 4; // Quantos itens mostrar por vez
  const totalItems = offers.length;

  // Auto-play
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        nextSlide();
      }, 4000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, currentIndex]);

  // Função para ir para próximo slide
  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(prev => prev + 1);
  };

  // Função para ir para slide anterior
  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(prev => prev - 1);
  };

  // Reset infinito
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsTransitioning(false);
      
      // Reset para posição inicial quando chegar no final
      if (currentIndex >= totalItems) {
        setCurrentIndex(0);
      }
      // Reset para posição final quando chegar no início
      else if (currentIndex < 0) {
        setCurrentIndex(totalItems - 1);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [currentIndex, totalItems]);

  // Pausar auto-play no hover
  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  // Adicionar produto ao carrinho
  const handleAddToCart = (offer) => {
    const product = {
      id: offer.id,
      name: offer.title,
      description: offer.description,
      price: offer.offerPrice,
      image: offer.image
    };
    addItem(product);
  };

  // Formatar preço
  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  return (
    <div className="offers-carousel">
      <div className="offers-carousel__header">
        <div className="offers-carousel__title-section">
          <span className="offers-carousel__icon">🔥</span>
          <h2 className="offers-carousel__title">Ofertas Imperdíveis</h2>
          <span className="offers-carousel__subtitle">Aproveite os melhores preços</span>
        </div>
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
            transform: `translateX(-${(currentIndex + totalItems) * (100 / itemsPerView)}%)`,
            transition: isTransitioning ? 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none'
          }}
        >
          {extendedOffers.map((offer, index) => (
            <div key={`${offer.id}-${index}`} className="offers-carousel__item">
              <div className="offer-card">
                <div className="offer-card__badge">
                  <span className="offer-card__badge-text">{offer.badge}</span>
                </div>
                
                <div className="offer-card__discount">
                  <span className="offer-card__discount-text">{offer.discount}% OFF</span>
                </div>

                <div className="offer-card__image">
                  <img 
                    src={offer.image} 
                    alt={offer.title}
                    onError={(e) => {
                      e.target.src = `data:image/svg+xml;base64,${btoa(`
                        <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect width="200" height="200" fill="#F8F9FA"/>
                          <circle cx="100" cy="100" r="40" fill="#E53935"/>
                          <path d="M85 95h30v10H85V95z" fill="white"/>
                          <path d="M95 85h10v30H95V85z" fill="white"/>
                        </svg>
                      `)}`;
                    }}
                  />
                </div>

                <div className="offer-card__content">
                  <div className="offer-card__category">{offer.category}</div>
                  <h3 className="offer-card__title">{offer.title}</h3>
                  <p className="offer-card__description">{offer.description}</p>
                  
                  <div className="offer-card__pricing">
                    <span className="offer-card__original-price">
                      {formatPrice(offer.originalPrice)}
                    </span>
                    <span className="offer-card__offer-price">
                      {formatPrice(offer.offerPrice)}
                    </span>
                  </div>

                  <div className="offer-card__stock">
                    <span className="offer-card__stock-icon">📦</span>
                    <span className="offer-card__stock-text">
                      {offer.stock} unidades disponíveis
                    </span>
                  </div>

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleAddToCart(offer)}
                    className="offer-card__add-button"
                    icon={<span>🛒</span>}
                  >
                    Adicionar ao Carrinho
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="offers-carousel__indicators">
        {offers.map((_, index) => (
          <button
            key={index}
            className={`offers-carousel__indicator ${
              index === (currentIndex % totalItems) ? 'offers-carousel__indicator--active' : ''
            }`}
            onClick={() => {
              setIsTransitioning(true);
              setCurrentIndex(index);
            }}
            aria-label={`Ir para oferta ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default OffersCarousel;