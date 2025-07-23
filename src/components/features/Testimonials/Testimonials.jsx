import React, { useState, useRef, useEffect } from 'react';
import TestimonialCard from './TestimonialCard/TestimonialCard';
import Button from '../../ui/Button/Button';
import { testimonials, getRecentTestimonials } from '../../../data/testimonials';
import './Testimonials.css';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [filter, setFilter] = useState('recent');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoPlayRef = useRef(null);
  const carouselRef = useRef(null);

  const getFilteredTestimonials = () => {
    switch (filter) {
      case 'recent':
        return getRecentTestimonials(6);
      case 'top-rated':
        return testimonials.filter(t => t.rating === 5);
      case 'all':
        return testimonials;
      default:
        return getRecentTestimonials(6);
    }
  };

  const displayTestimonials = getFilteredTestimonials();
  const itemsPerView = 3; // Quantos depoimentos mostrar por vez
  const maxIndex = Math.max(0, displayTestimonials.length - itemsPerView);

  // Auto-play
  useEffect(() => {
    if (isAutoPlaying && displayTestimonials.length > itemsPerView) {
      autoPlayRef.current = setInterval(() => {
        setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
      }, 5000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, maxIndex, displayTestimonials.length, itemsPerView]);

  const nextSlide = () => {
    if (isTransitioning || displayTestimonials.length <= itemsPerView) return;
    setIsTransitioning(true);
    setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const prevSlide = () => {
    if (isTransitioning || displayTestimonials.length <= itemsPerView) return;
    setIsTransitioning(true);
    setCurrentIndex(prev => (prev <= 0 ? maxIndex : prev - 1));
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goToSlide = (index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setCurrentIndex(0);
  };

  const handleMouseEnter = () => {
    setIsAutoPlaying(false);
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  const handleMouseLeave = () => {
    setIsAutoPlaying(true);
  };

  const handleWriteReview = () => {
    const message = encodeURIComponent('Olá! Gostaria de deixar um depoimento sobre os serviços da farmácia.');
    window.open(`https://wa.me/5511999999999?text=${message}`, '_blank');
  };

  // Calcular estatísticas
  const averageRating = (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1);
  const totalTestimonials = testimonials.length;
  const verifiedCount = testimonials.filter(t => t.verified).length;

  return (
    <section className="testimonials">
      <div className="container">
        <div className="testimonials__header">
          <div className="testimonials__title-section">
            <span className="testimonials__icon">💬</span>
            <div className="testimonials__text">
              <h2 className="testimonials__title">O que nossos clientes dizem</h2>
              <p className="testimonials__subtitle">
                Depoimentos reais de pessoas que confiam no nosso cuidado
              </p>
            </div>
          </div>

          <div className="testimonials__stats">
            <div className="testimonials__stat">
              <span className="testimonials__stat-number">{averageRating}</span>
              <div className="testimonials__stat-stars">
                {[...Array(5)].map((_, i) => (
                  <span 
                    key={i} 
                    className={`testimonials__star ${i < Math.floor(averageRating) ? 'testimonials__star--filled' : ''}`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="testimonials__stat-label">Avaliação média</span>
            </div>
            <div className="testimonials__stat">
              <span className="testimonials__stat-number">{totalTestimonials}</span>
              <span className="testimonials__stat-label">Depoimentos</span>
            </div>
            <div className="testimonials__stat">
              <span className="testimonials__stat-number">{verifiedCount}</span>
              <span className="testimonials__stat-label">Verificados</span>
            </div>
          </div>
        </div>

        <div className="testimonials__filters">
          <button
            className={`testimonials__filter ${filter === 'recent' ? 'testimonials__filter--active' : ''}`}
            onClick={() => handleFilterChange('recent')}
          >
            Mais Recentes
          </button>
          <button
            className={`testimonials__filter ${filter === 'top-rated' ? 'testimonials__filter--active' : ''}`}
            onClick={() => handleFilterChange('top-rated')}
          >
            Melhor Avaliados
          </button>
          <button
            className={`testimonials__filter ${filter === 'all' ? 'testimonials__filter--active' : ''}`}
            onClick={() => handleFilterChange('all')}
          >
            Todos
          </button>
        </div>

        <div 
          className="testimonials__carousel"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {displayTestimonials.length > itemsPerView && (
            <button 
              className="testimonials__control testimonials__control--prev"
              onClick={prevSlide}
              disabled={isTransitioning}
              aria-label="Depoimento anterior"
            >
              <span className="testimonials__arrow">‹</span>
            </button>
          )}

          <div className="testimonials__container">
            <div 
              ref={carouselRef}
              className="testimonials__track"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
                transition: isTransitioning ? 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none'
              }}
            >
              {displayTestimonials.map((testimonial) => (
                <div key={testimonial.id} className="testimonials__item">
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>
          </div>

          {displayTestimonials.length > itemsPerView && (
            <button 
              className="testimonials__control testimonials__control--next"
              onClick={nextSlide}
              disabled={isTransitioning}
              aria-label="Próximo depoimento"
            >
              <span className="testimonials__arrow">›</span>
            </button>
          )}
        </div>

        {displayTestimonials.length > itemsPerView && (
          <div className="testimonials__indicators">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                className={`testimonials__indicator ${
                  index === currentIndex ? 'testimonials__indicator--active' : ''
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Ir para grupo ${index + 1}`}
              />
            ))}
          </div>
        )}

        <div className="testimonials__cta">
          <div className="testimonials__cta-content">
            <h3>Compartilhe sua experiência</h3>
            <p>Sua opinião é muito importante para nós e ajuda outros clientes</p>
            <div className="testimonials__cta-buttons">
              <Button
                variant="primary"
                size="lg"
                onClick={handleWriteReview}
                icon={<span>✍️</span>}
              >
                Escrever Depoimento
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => console.log('Ver todos os depoimentos')}
                icon={<span>👀</span>}
              >
                Ver Todos os Depoimentos
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;