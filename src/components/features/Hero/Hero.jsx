// src/components/features/Hero/Hero.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoPlayRef = useRef(null);
  const carouselRef = useRef(null);
  const navigate = useNavigate();

  // Dados das promoções temporárias (usando useMemo para performance)
  const promotionSlides = React.useMemo(() => [
    {
      id: 1,
      title: 'Mega Promoção Vitaminas',
      description: 'Até 40% OFF em vitaminas e suplementos',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1920&h=350&fit=crop&crop=center',
      link: '/produtos?category=vitaminas',
      badge: 'Até 40% OFF',
      backgroundColor: '#E53935',
      textColor: '#FFFFFF'
    },
    {
      id: 2,
      title: 'Semana da Beleza',
      description: 'Dermocosméticos com preços especiais',
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1920&h=350&fit=crop&crop=center',
      link: '/produtos?category=beleza',
      badge: 'Oferta Especial',
      backgroundColor: '#2196F3',
      textColor: '#FFFFFF'
    },
    {
      id: 3,
      title: 'Medicamentos Genéricos',
      description: 'Economia garantida com a mesma qualidade',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1920&h=350&fit=crop&crop=center',
      link: '/produtos?category=medicamentos',
      badge: 'Melhor Preço',
      backgroundColor: '#4CAF50',
      textColor: '#FFFFFF'
    },
    {
      id: 4,
      title: 'Entrega Grátis',
      description: 'Frete grátis em compras acima de R\$ 99',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=350&fit=crop&crop=center',
      link: '/produtos',
      badge: 'Frete Grátis',
      backgroundColor: '#FF9800',
      textColor: '#FFFFFF'
    },
    {
      id: 5,
      title: 'Cuidados com o Bebê',
      description: 'Produtos infantis com até 30% de desconto',
      image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=1920&h=350&fit=crop&crop=center',
      link: '/produtos?category=infantil',
      badge: '30% OFF',
      backgroundColor: '#9C27B0',
      textColor: '#FFFFFF'
    }
  ], []);

  // Duplicar slides para carrossel infinito
  const extendedSlides = React.useMemo(() => [...promotionSlides, ...promotionSlides, ...promotionSlides], [promotionSlides]);
  const totalSlides = promotionSlides.length;

  // Função para ir para próximo slide
  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(prev => prev + 1);
  }, [isTransitioning]);

  // Função para ir para slide anterior
  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(prev => prev - 1);
  }, [isTransitioning]);

  // Auto-play
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        nextSlide();
      }, 5000); // 5 segundos para promoções
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
  }, [isAutoPlaying, nextSlide]);

  // Reset infinito
  useEffect(() => {
    if (!isTransitioning) return;

    const timer = setTimeout(() => {
      setIsTransitioning(false);
      
      // Reset para posição inicial quando chegar no final
      if (currentIndex >= totalSlides) {
        setCurrentIndex(0);
      }
      // Reset para posição final quando chegar no início
      else if (currentIndex < 0) {
        setCurrentIndex(totalSlides - 1);
      }
    }, 600); // Transição mais rápida para promoções

    return () => clearTimeout(timer);
  }, [currentIndex, totalSlides, isTransitioning]);

  // Pausar auto-play no hover
  const handleMouseEnter = useCallback(() => {
    setIsAutoPlaying(false);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsAutoPlaying(true);
  }, []);

  // Ir para slide específico
  const goToSlide = useCallback((index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
  }, [isTransitioning]);

  // Handler para clique na promoção
  const handlePromotionClick = useCallback((slide) => {
    if (slide.link) {
      navigate(slide.link);
    }
  }, [navigate]);

  // Fallback para imagens que não carregam
  const handleImageError = useCallback((e, slide) => {
    const svgContent = `
      <svg width="1920" height="350" viewBox="0 0 1920 350" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="promoGradient${slide.id}" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:${slide.backgroundColor};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${slide.backgroundColor}88;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="1920" height="350" fill="url(#promoGradient${slide.id})"/>
        <rect x="50" y="100" width="120" height="150" rx="8" fill="white" opacity="0.2"/>
        <circle cx="110" cy="175" r="30" fill="white" opacity="0.3"/>
        <text x="200" y="150" fill="${slide.textColor}" font-size="48" font-weight="bold">${slide.title}</text>
        <text x="200" y="200" fill="${slide.textColor}" font-size="24" opacity="0.9">${slide.description}</text>
        <rect x="1650" y="80" width="220" height="60" rx="30" fill="white" opacity="0.2"/>
        <text x="1760" y="120" text-anchor="middle" fill="${slide.textColor}" font-size="24" font-weight="bold">${slide.badge}</text>
      </svg>
    `;
    
    const encodedSvg = encodeURIComponent(svgContent);
    e.target.src = `data:image/svg+xml,${encodedSvg}`;
  }, []);

  return (
    <section className="hero-promotions">
      <div 
        className="hero-promotions__carousel"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div 
          ref={carouselRef}
          className="hero-promotions__track"
          style={{
            transform: `translateX(-${(currentIndex + totalSlides) * 100}%)`,
            transition: isTransitioning ? 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none'
          }}
        >
          {extendedSlides.map((slide, index) => (
            <div 
              key={`${slide.id}-${index}`} 
              className="hero-promotions__slide"
              onClick={() => handlePromotionClick(slide)}
              style={{ cursor: slide.link ? 'pointer' : 'default' }}
            >
              <div className="hero-promotions__image-container">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="hero-promotions__image"
                  onError={(e) => handleImageError(e, slide)}
                />
                
                {/* Overlay com gradiente sutil */}
                <div 
                  className="hero-promotions__overlay"
                  style={{ 
                    background: `linear-gradient(90deg, ${slide.backgroundColor}40 0%, transparent 50%, ${slide.backgroundColor}20 100%)` 
                  }}
                ></div>

                {/* Conteúdo sobreposto */}
                <div className="hero-promotions__content">
                  <div className="container">
                    <div className="hero-promotions__content-wrapper">
                      <div className="hero-promotions__text">
                        <div 
                          className="hero-promotions__badge"
                          style={{ 
                            backgroundColor: slide.backgroundColor,
                            color: slide.textColor 
                          }}
                        >
                          {slide.badge}
                        </div>
                        <h2 
                          className="hero-promotions__title"
                          style={{ color: slide.textColor }}
                        >
                          {slide.title}
                        </h2>
                        <p 
                          className="hero-promotions__description"
                          style={{ color: slide.textColor }}
                        >
                          {slide.description}
                        </p>
                      </div>
                      
                      {slide.link && (
                        <div className="hero-promotions__cta">
                          <button 
                            className="hero-promotions__button"
                            style={{ 
                              backgroundColor: slide.textColor,
                              color: slide.backgroundColor 
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(slide.link);
                            }}
                          >
                            Ver Ofertas
                            <span className="hero-promotions__button-icon">→</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Controles de Navegação - MENORES E REDONDOS */}
        <button 
          className="hero-promotions__control hero-promotions__control--prev"
          onClick={prevSlide}
          disabled={isTransitioning}
          aria-label="Promoção anterior"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <button 
          className="hero-promotions__control hero-promotions__control--next"
          onClick={nextSlide}
          disabled={isTransitioning}
          aria-label="Próxima promoção"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Progress Bar */}
        <div className="hero-promotions__progress">
          <div 
            className="hero-promotions__progress-bar"
            style={{
              transform: `scaleX(${((currentIndex % totalSlides) + 1) / totalSlides})`
            }}
          ></div>
        </div>
      </div>

      {/* Indicadores FORA do carousel, abaixo das fotos */}
      <div className="hero-promotions__indicators">
        {promotionSlides.map((_, index) => (
          <button
            key={index}
            className={`hero-promotions__indicator ${
              index === (currentIndex % totalSlides) ? 'hero-promotions__indicator--active' : ''
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Ir para promoção ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;