import React, { useState, useEffect, useRef } from 'react';
import Button from '../../ui/Button/Button';
import './Hero.css';

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoPlayRef = useRef(null);
  const carouselRef = useRef(null);

  // Dados dos slides do hero
  const heroSlides = [
    {
      id: 1,
      title: 'Sua Saúde é Nossa Prioridade',
      subtitle: 'Medicamentos de qualidade, atendimento especializado e cuidado que você merece',
      description: 'Mais de 10 anos cuidando da saúde da sua família com profissionalismo e dedicação',
      image: '/api/placeholder/1820/490',
      ctaPrimary: {
        text: 'Explorar Produtos',
        action: 'products'
      },
      ctaSecondary: {
        text: 'Nossos Serviços',
        action: 'services'
      },
      badge: 'Farmácia de Confiança',
      stats: [
        { number: '10+', label: 'Anos de Experiência' },
        { number: '500+', label: 'Produtos Disponíveis' },
        { number: '24h', label: 'Entrega Rápida' }
      ]
    },
    {
      id: 2,
      title: 'Entrega Rápida e Segura',
      subtitle: 'Receba seus medicamentos no conforto da sua casa em até 2 horas',
      description: 'Serviço de entrega disponível 24/7 com rastreamento em tempo real',
      image: '/api/placeholder/1820/490',
      ctaPrimary: {
        text: 'Fazer Pedido',
        action: 'order'
      },
      ctaSecondary: {
        text: 'Como Funciona',
        action: 'how-it-works'
      },
      badge: 'Entrega Expressa',
      stats: [
        { number: '2h', label: 'Tempo Médio' },
        { number: '100%', label: 'Segurança' },
        { number: '24/7', label: 'Disponibilidade' }
      ]
    },
    {
      id: 3,
      title: 'Serviços Farmacêuticos Especializados',
      subtitle: 'Aplicação de injetáveis, testes rápidos e orientação farmacêutica profissional',
      description: 'Equipe qualificada para cuidar da sua saúde com segurança e eficiência',
      image: '/api/placeholder/1820/490',
      ctaPrimary: {
        text: 'Agendar Serviço',
        action: 'schedule'
      },
      ctaSecondary: {
        text: 'Ver Serviços',
        action: 'services'
      },
      badge: 'Atendimento Especializado',
      stats: [
        { number: '15+', label: 'Serviços Oferecidos' },
        { number: '100%', label: 'Profissionais Qualificados' },
        { number: '5★', label: 'Avaliação Média' }
      ]
    },
    {
      id: 4,
      title: 'Vitaminas e Suplementos Premium',
      subtitle: 'As melhores marcas em vitaminas e suplementos para sua saúde e bem-estar',
      description: 'Produtos importados e nacionais com garantia de qualidade e procedência',
      image: '/api/placeholder/1820/490',
      ctaPrimary: {
        text: 'Ver Vitaminas',
        action: 'vitamins'
      },
      ctaSecondary: {
        text: 'Orientação Nutricional',
        action: 'nutrition'
      },
      badge: 'Qualidade Premium',
      stats: [
        { number: '50+', label: 'Marcas Disponíveis' },
        { number: '200+', label: 'Produtos Premium' },
        { number: '30%', label: 'Desconto Especial' }
      ]
    },
    {
      id: 5,
      title: 'Beleza e Cuidados Pessoais',
      subtitle: 'Produtos de beleza, dermocosméticos e cuidados pessoais das melhores marcas',
      description: 'Cuide da sua pele e cabelos com produtos selecionados por especialistas',
      image: '/api/placeholder/1820/490',
      ctaPrimary: {
        text: 'Explorar Beleza',
        action: 'beauty'
      },
      ctaSecondary: {
        text: 'Dicas de Cuidados',
        action: 'tips'
      },
      badge: 'Beleza & Bem-Estar',
      stats: [
        { number: '100+', label: 'Produtos de Beleza' },
        { number: '20+', label: 'Marcas Exclusivas' },
        { number: '15%', label: 'Desconto Primeira Compra' }
      ]
    }
  ];

  // Duplicar slides para carrossel infinito
  const extendedSlides = [...heroSlides, ...heroSlides, ...heroSlides];
  const totalSlides = heroSlides.length;

  // Auto-play
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        nextSlide();
      }, 6000);
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
      if (currentIndex >= totalSlides) {
        setCurrentIndex(0);
      }
      // Reset para posição final quando chegar no início
      else if (currentIndex < 0) {
        setCurrentIndex(totalSlides - 1);
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [currentIndex, totalSlides]);

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

  // Ir para slide específico
  const goToSlide = (index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
  };

  // Handlers para ações
  const handleAction = (action) => {
    console.log('Ação:', action);
    // Implementar navegação baseada na ação
    switch (action) {
      case 'products':
        // navigate('/produtos');
        break;
      case 'services':
        // navigate('/servicos');
        break;
      case 'order':
        // navigate('/pedido');
        break;
      default:
        console.log('Ação não implementada:', action);
    }
  };

  const handleImageError = (e) => {
    e.target.src = `data:image/svg+xml;base64,${btoa(`
      <svg width="1820" height="490" viewBox="0 0 1820 490" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#E53935;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#2196F3;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="1820" height="490" fill="url(#heroGradient)"/>
        <circle cx="910" cy="245" r="80" fill="white" opacity="0.2"/>
        <path d="M870 225h80v40h-80v-40z" fill="white"/>
        <path d="M890 205h40v80h-40v-80z" fill="white"/>
        <text x="910" y="320" text-anchor="middle" fill="white" font-size="24" font-weight="bold">Farmácia Bem Estar</text>
      </svg>
    `)}`;
  };

  const currentSlide = heroSlides[currentIndex % totalSlides];

  return (
    <section className="hero">
      <div 
        className="hero__carousel"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div 
          ref={carouselRef}
          className="hero__track"
          style={{
            transform: `translateX(-${(currentIndex + totalSlides) * 100}%)`,
            transition: isTransitioning ? 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none'
          }}
        >
          {extendedSlides.map((slide, index) => (
            <div key={`${slide.id}-${index}`} className="hero__slide">
              <div className="hero__image-container">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="hero__image"
                  onError={handleImageError}
                />
                <div className="hero__overlay"></div>
              </div>

              <div className="hero__content">
                <div className="container">
                  <div className="hero__content-wrapper">
                    <div className="hero__text-content">
                      <div className="hero__badge">
                        <span className="hero__badge-text">{slide.badge}</span>
                      </div>

                      <h1 className="hero__title">{slide.title}</h1>
                      <h2 className="hero__subtitle">{slide.subtitle}</h2>
                      <p className="hero__description">{slide.description}</p>

                      <div className="hero__actions">
                        <Button
                          variant="primary"
                          size="lg"
                          onClick={() => handleAction(slide.ctaPrimary.action)}
                          className="hero__cta-primary"
                        >
                          {slide.ctaPrimary.text}
                        </Button>
                        <Button
                          variant="outline"
                          size="lg"
                          onClick={() => handleAction(slide.ctaSecondary.action)}
                          className="hero__cta-secondary"
                        >
                          {slide.ctaSecondary.text}
                        </Button>
                      </div>
                    </div>

                    <div className="hero__stats">
                      {slide.stats.map((stat, statIndex) => (
                        <div key={statIndex} className="hero__stat">
                          <span className="hero__stat-number">{stat.number}</span>
                          <span className="hero__stat-label">{stat.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Controles de Navegação */}
        <button 
          className="hero__control hero__control--prev"
          onClick={prevSlide}
          disabled={isTransitioning}
          aria-label="Slide anterior"
        >
          <span className="hero__arrow">‹</span>
        </button>

        <button 
          className="hero__control hero__control--next"
          onClick={nextSlide}
          disabled={isTransitioning}
          aria-label="Próximo slide"
        >
          <span className="hero__arrow">›</span>
        </button>

        {/* Indicadores */}
        <div className="hero__indicators">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`hero__indicator ${
                index === (currentIndex % totalSlides) ? 'hero__indicator--active' : ''
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="hero__progress">
          <div 
            className="hero__progress-bar"
            style={{
              transform: `scaleX(${((currentIndex % totalSlides) + 1) / totalSlides})`
            }}
          ></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;