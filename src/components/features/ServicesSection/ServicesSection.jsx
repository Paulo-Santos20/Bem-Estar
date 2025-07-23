import React, { useState } from 'react';
import ServiceItem from './ServiceItem/ServiceItem';
import Button from '../../ui/Button/Button';
import { services, getPopularServices } from '../../../data/services';
import './ServicesSection.css';

const ServicesSection = () => {
  const [showAllServices, setShowAllServices] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const displayServices = showAllServices ? services : getPopularServices();

  const handleServiceClick = (serviceId) => {
    console.log('Agendar serviço:', serviceId);
    setSelectedService(serviceId);
    // Implementar modal de agendamento ou navegação
  };

  const handleViewAllServices = () => {
    setShowAllServices(!showAllServices);
  };

  const handleContactWhatsApp = () => {
    const message = encodeURIComponent('Olá! Gostaria de saber mais sobre os serviços da farmácia.');
    window.open(`https://wa.me/5511999999999?text=${message}`, '_blank');
  };

  return (
    <section className="services-section">
      <div className="container">
        <div className="services-section__header">
          <div className="services-section__title-section">
            <span className="services-section__icon">🏥</span>
            <div className="services-section__text">
              <h2 className="services-section__title">Nossos Serviços</h2>
              <p className="services-section__subtitle">
                Cuidamos da sua saúde com serviços especializados e atendimento humanizado
              </p>
            </div>
          </div>
          
          <div className="services-section__actions">
            <Button
              variant="outline"
              size="md"
              onClick={handleViewAllServices}
              className="services-section__toggle"
            >
              {showAllServices ? 'Ver Principais' : 'Ver Todos os Serviços'}
            </Button>
            
            <Button
              variant="primary"
              size="md"
              onClick={handleContactWhatsApp}
              icon={<span>💬</span>}
              className="services-section__contact"
            >
              Falar no WhatsApp
            </Button>
          </div>
        </div>

        <div className="services-section__grid">
          {displayServices.map((service) => (
            <ServiceItem
              key={service.id}
              service={service}
              onClick={() => handleServiceClick(service.id)}
              isSelected={selectedService === service.id}
            />
          ))}
        </div>

        <div className="services-section__info">
          <div className="services-section__info-card">
            <div className="services-section__info-icon">⏰</div>
            <div className="services-section__info-content">
              <h4>Horário de Funcionamento</h4>
              <p>Segunda a Sábado: 7h às 22h</p>
              <p>Domingo e Feriados: 8h às 20h</p>
            </div>
          </div>

          <div className="services-section__info-card">
            <div className="services-section__info-icon">📍</div>
            <div className="services-section__info-content">
              <h4>Localização</h4>
              <p>Rua das Flores, 123 - Centro</p>
              <p>São Paulo - SP, CEP: 01234-567</p>
            </div>
          </div>

          <div className="services-section__info-card">
            <div className="services-section__info-icon">📞</div>
            <div className="services-section__info-content">
              <h4>Contato</h4>
              <p>Telefone: (11) 99999-9999</p>
              <p>WhatsApp: (11) 99999-9999</p>
            </div>
          </div>

          <div className="services-section__info-card">
            <div className="services-section__info-icon">🎯</div>
            <div className="services-section__info-content">
              <h4>Agendamento</h4>
              <p>Online pelo site ou WhatsApp</p>
              <p>Atendimento por ordem de chegada</p>
            </div>
          </div>
        </div>

        <div className="services-section__cta">
          <div className="services-section__cta-content">
            <h3>Precisa de Ajuda?</h3>
            <p>Nossa equipe está pronta para atendê-lo com carinho e profissionalismo</p>
            <div className="services-section__cta-buttons">
              <Button
                variant="primary"
                size="lg"
                onClick={handleContactWhatsApp}
                icon={<span>💬</span>}
              >
                Falar com Farmacêutico
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => console.log('Ver localização')}
                icon={<span>📍</span>}
              >
                Como Chegar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;