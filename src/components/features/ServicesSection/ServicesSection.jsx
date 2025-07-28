// src/components/features/ServicesSection/ServicesSection.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ServicesSection.css';

const ServicesSection = () => {
  const navigate = useNavigate();

  // Serviços principais simplificados
  const mainServices = [
    {
      id: 1,
      title: 'Aplicação de Injetáveis',
      description: 'Aplicação segura de medicamentos injetáveis',
      icon: '💉',
      price: 'A partir de R\$ 15',
      popular: true
    },
    
    {
      id: 3,
      title: 'Medição de Pressão',
      description: 'Verificação da pressão arterial',
      icon: '🩺',
      price: 'Gratuito',
      popular: true
    },
    
    {
      id: 5,
      title: 'Teste de COVID-19',
      description: 'Teste rápido para detecção do vírus',
      icon: '🦠',
      price: 'R\$ 35',
      popular: false
    },
    {
      id: 6,
      title: 'Orientação Farmacêutica',
      description: 'Consulta sobre medicamentos',
      icon: '👨‍⚕️',
      price: 'Gratuito',
      popular: true
    }
  ];

  const handleWhatsApp = (serviceName = '') => {
    const message = serviceName 
      ? `Olá! Gostaria de agendar: ${serviceName}`
      : 'Olá! Gostaria de saber mais sobre os serviços da farmácia.';
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/5581995284440?text=${encodedMessage}`, '_blank');
  };

  const handleViewAllServices = () => {
    navigate('/servicos');
  };

  return (
    <section className="services-section">
      <div className="container">
        {/* Header Simplificado */}
        <div className="services-header">
          <div className="services-header__content">
            <span className="services-header__icon">🏥</span>
            <h2 className="services-header__title">Nossos Serviços</h2>
            <p className="services-header__subtitle">
              Cuidados profissionais para sua saúde e bem-estar
            </p>
          </div>
          
          <button 
            className="services-header__view-all"
            onClick={handleViewAllServices}
          >
            Ver Todos os Serviços
          </button>
        </div>

        {/* Grid de Serviços */}
        <div className="services-grid">
          {mainServices.map((service) => (
            <div 
              key={service.id} 
              className={`service-card ${service.popular ? 'service-card--popular' : ''}`}
            >
              {service.popular && (
                <div className="service-card__badge">Mais Procurado</div>
              )}
              
              <div className="service-card__icon">{service.icon}</div>
              
              <div className="service-card__content">
                <h3 className="service-card__title">{service.title}</h3>
                <p className="service-card__description">{service.description}</p>
                <div className="service-card__price">{service.price}</div>
              </div>
              
              <button 
                className="service-card__button"
                onClick={() => handleWhatsApp(service.title)}
              >
                Agendar
              </button>
            </div>
          ))}
        </div>

        {/* Informações Rápidas */}
        <div className="services-info">
          <div className="services-info__item">
            <span className="services-info__icon">⏰</span>
            <div className="services-info__text">
              <strong>Horário</strong>
              <span>Seg-Sáb: 7h-22h | Dom: 8h-20h</span>
            </div>
          </div>
          
          <div className="services-info__item">
            <span className="services-info__icon">📍</span>
            <div className="services-info__text">
              <strong>Localização</strong>
              <span>Rua das Flores, 123 - Centro</span>
            </div>
          </div>
          
          <div className="services-info__item">
            <span className="services-info__icon">💬</span>
            <div className="services-info__text">
              <strong>Agendamento</strong>
              <span>WhatsApp ou por ordem de chegada</span>
            </div>
          </div>
        </div>

        {/* CTA Simplificado */}
        <div className="services-cta">
          <div className="services-cta__content">
            <h3 className="services-cta__title">Precisa de Atendimento?</h3>
            <p className="services-cta__text">
              Fale conosco pelo WhatsApp e agende seu serviço
            </p>
          </div>
          
          <button 
            className="services-cta__button"
            onClick={() => handleWhatsApp()}
          >
            <span className="services-cta__button-icon">💬</span>
            Falar no WhatsApp
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;