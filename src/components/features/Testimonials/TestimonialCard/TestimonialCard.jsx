import React, { useState } from 'react';
import './TestimonialCard.css';

const TestimonialCard = ({ testimonial }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [helpfulCount, setHelpfulCount] = useState(testimonial.helpful);
  const [hasVoted, setHasVoted] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleImageError = (e) => {
    e.target.src = `data:image/svg+xml;base64,${btoa(`
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="40" cy="40" r="40" fill="#E5E7EB"/>
        <circle cx="40" cy="32" r="12" fill="#9CA3AF"/>
        <path d="M20 65c0-11 9-20 20-20s20 9 20 20" fill="#9CA3AF"/>
      </svg>
    `)}`;
  };

  const handleHelpfulClick = () => {
    if (!hasVoted) {
      setHelpfulCount(prev => prev + 1);
      setHasVoted(true);
    }
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const shouldShowToggle = testimonial.testimonial.length > 150;
  const displayText = shouldShowToggle && !isExpanded 
    ? testimonial.testimonial.substring(0, 150) + '...'
    : testimonial.testimonial;

  return (
    <div className="testimonial-card">
      <div className="testimonial-card__header">
        <div className="testimonial-card__avatar">
          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            onError={handleImageError}
          />
          {testimonial.verified && (
            <div className="testimonial-card__verified">
              <span className="testimonial-card__verified-icon">✓</span>
            </div>
          )}
        </div>

        <div className="testimonial-card__user-info">
          <h4 className="testimonial-card__name">{testimonial.name}</h4>
          <p className="testimonial-card__location">{testimonial.location}</p>
          <div className="testimonial-card__meta">
            <span className="testimonial-card__age">{testimonial.age} anos</span>
            <span className="testimonial-card__date">{formatDate(testimonial.date)}</span>
          </div>
        </div>

        <div className="testimonial-card__rating">
          <div className="testimonial-card__stars">
            {[...Array(5)].map((_, i) => (
              <span 
                key={i} 
                className={`testimonial-card__star ${i < testimonial.rating ? 'testimonial-card__star--filled' : ''}`}
              >
                ★
              </span>
            ))}
          </div>
          <span className="testimonial-card__rating-number">{testimonial.rating}/5</span>
        </div>
      </div>

      <div className="testimonial-card__service">
        <span className="testimonial-card__service-label">Serviço utilizado:</span>
        <span className="testimonial-card__service-name">{testimonial.service}</span>
      </div>

      <div className="testimonial-card__content">
        <blockquote className="testimonial-card__quote">
          <span className="testimonial-card__quote-mark">"</span>
          <p className="testimonial-card__text">{displayText}</p>
          <span className="testimonial-card__quote-mark testimonial-card__quote-mark--end">"</span>
        </blockquote>

        {shouldShowToggle && (
          <button 
            className="testimonial-card__toggle"
            onClick={toggleExpanded}
          >
            {isExpanded ? 'Ver menos' : 'Ver mais'}
          </button>
        )}
      </div>

      <div className="testimonial-card__footer">
        <button 
          className={`testimonial-card__helpful ${hasVoted ? 'testimonial-card__helpful--voted' : ''}`}
          onClick={handleHelpfulClick}
          disabled={hasVoted}
        >
          <span className="testimonial-card__helpful-icon">👍</span>
          <span className="testimonial-card__helpful-text">
            {hasVoted ? 'Obrigado!' : 'Útil'} ({helpfulCount})
          </span>
        </button>

        <div className="testimonial-card__actions">
          <button 
            className="testimonial-card__share"
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: `Depoimento de ${testimonial.name}`,
                  text: testimonial.testimonial,
                  url: window.location.href
                });
              } else {
                navigator.clipboard.writeText(`"${testimonial.testimonial}" - ${testimonial.name}`);
                alert('Depoimento copiado para a área de transferência!');
              }
            }}
            title="Compartilhar depoimento"
          >
            <span>📤</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;