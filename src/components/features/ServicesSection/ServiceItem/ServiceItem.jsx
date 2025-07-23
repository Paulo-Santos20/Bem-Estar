import React, { useState } from 'react';
import Button from '../../../ui/Button/Button';
import './ServiceItem.css';

const ServiceItem = ({ service, onClick, isSelected }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleExpand = (e) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const handleSchedule = (e) => {
    e.stopPropagation();
    onClick();
  };

  const getAvailabilityStatus = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentDay = now.getDay(); // 0 = Sunday, 6 = Saturday

    if (service.availability === '24/7') {
      return { status: 'available', text: 'Disponível agora' };
    }

    if (service.availability === 'Todos os dias') {
      if (currentHour >= 7 && currentHour < 22) {
        return { status: 'available', text: 'Disponível agora' };
      } else {
        return { status: 'closed', text: 'Fechado agora' };
      }
    }

    if (service.availability.includes('Seg-Sáb')) {
      if (currentDay >= 1 && currentDay <= 6) {
        if (currentHour >= 8 && currentHour < 18) {
          return { status: 'available', text: 'Disponível agora' };
        } else {
          return { status: 'closed', text: 'Fechado agora' };
        }
      } else {
        return { status: 'closed', text: 'Fechado aos domingos' };
      }
    }

    return { status: 'limited', text: 'Verificar disponibilidade' };
  };

  const availabilityStatus = getAvailabilityStatus();

  return (
    <div 
      className={`service-item ${isSelected ? 'service-item--selected' : ''} ${isExpanded ? 'service-item--expanded' : ''}`}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <div className="service-item__header">
        <div className="service-item__icon-container">
          <span className="service-item__icon">{service.icon}</span>
          {service.popular && (
            <span className="service-item__badge">Popular</span>
          )}
        </div>
        
        <div className="service-item__main-info">
          <h3 className="service-item__title">{service.title}</h3>
          <p className="service-item__description">{service.description}</p>
        </div>

        <button 
          className="service-item__expand-btn"
          onClick={handleToggleExpand}
          aria-label={isExpanded ? 'Recolher' : 'Expandir'}
        >
          <span className={`service-item__expand-icon ${isExpanded ? 'service-item__expand-icon--rotated' : ''}`}>
            ▼
          </span>
        </button>
      </div>

      <div className="service-item__quick-info">
        <div className="service-item__info-item">
          <span className="service-item__info-icon">💰</span>
          <span className="service-item__info-text">{service.price}</span>
        </div>
        <div className="service-item__info-item">
          <span className="service-item__info-icon">⏱️</span>
          <span className="service-item__info-text">{service.duration}</span>
        </div>
        <div className={`service-item__info-item service-item__availability service-item__availability--${availabilityStatus.status}`}>
          <span className="service-item__info-icon">🕒</span>
          <span className="service-item__info-text">{availabilityStatus.text}</span>
        </div>
      </div>

      {isExpanded && (
        <div className="service-item__expanded-content">
          <div className="service-item__features">
            <h4 className="service-item__features-title">O que está incluído:</h4>
            <ul className="service-item__features-list">
              {service.features.map((feature, index) => (
                <li key={index} className="service-item__feature">
                  <span className="service-item__feature-icon">✓</span>
                  <span className="service-item__feature-text">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="service-item__details">
            <div className="service-item__detail">
              <span className="service-item__detail-label">Disponibilidade:</span>
              <span className="service-item__detail-value">{service.availability}</span>
            </div>
            <div className="service-item__detail">
              <span className="service-item__detail-label">Duração:</span>
              <span className="service-item__detail-value">{service.duration}</span>
            </div>
            <div className="service-item__detail">
              <span className="service-item__detail-label">Investimento:</span>
              <span className="service-item__detail-value">{service.price}</span>
            </div>
          </div>

          <div className="service-item__actions">
            <Button
              variant="primary"
              size="md"
              onClick={handleSchedule}
              icon={<span>📅</span>}
              className="service-item__schedule-btn"
            >
              Agendar Serviço
            </Button>
            <Button
              variant="outline"
              size="md"
              onClick={(e) => {
                e.stopPropagation();
                const message = encodeURIComponent(`Olá! Gostaria de saber mais sobre o serviço: ${service.title}`);
                window.open(`https://wa.me/5511999999999?text=${message}`, '_blank');
              }}
              icon={<span>💬</span>}
              className="service-item__info-btn"
            >
              Mais Informações
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceItem;