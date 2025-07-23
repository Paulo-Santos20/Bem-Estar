import React from 'react';
import Button from '../../ui/Button/Button';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero__background">
        <div className="hero__overlay"></div>
      </div>
      
      <div className="container">
        <div className="hero__content">
          <div className="hero__text animate-fade-in-up">
            <div className="hero__badge">
              <span className="hero__badge-icon">🍃</span>
              <span>Cuidando da sua saúde com carinho</span>
            </div>
            
            <h1 className="hero__title">
              Sua <span className="hero__title-highlight">Farmácia</span> de 
              <br />
              <span className="hero__title-accent">Bem-Estar</span>
            </h1>
            
            <p className="hero__description">
              Na Farmácia Bem Estar, oferecemos medicamentos de qualidade, 
              produtos de higiene e beleza, além de um atendimento farmacêutico 
              personalizado para cuidar da sua saúde e da sua família.
            </p>
            
            <div className="hero__actions">
              <Button 
                variant="primary" 
                size="lg"
                icon={<span>🛒</span>}
              >
                Ver Produtos
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                icon={<span>📞</span>}
              >
                Fale Conosco
              </Button>
            </div>
            
            <div className="hero__features">
              <div className="hero__feature">
                <span className="hero__feature-icon">🚚</span>
                <span>Entrega Rápida</span>
              </div>
              <div className="hero__feature">
                <span className="hero__feature-icon">👨‍⚕️</span>
                <span>Atendimento Farmacêutico</span>
              </div>
              <div className="hero__feature">
                <span className="hero__feature-icon">💊</span>
                <span>Medicamentos Originais</span>
              </div>
            </div>
          </div>
          
          <div className="hero__visual animate-fade-in">
            <div className="hero__image-container">
              <div className="hero__floating-elements">
                <div className="hero__floating-element hero__floating-element--1">
                  <span>💊</span>
                </div>
                <div className="hero__floating-element hero__floating-element--2">
                  <span>🍃</span>
                </div>
                <div className="hero__floating-element hero__floating-element--3">
                  <span>❤️</span>
                </div>
                <div className="hero__floating-element hero__floating-element--4">
                  <span>🩺</span>
                </div>
              </div>
              
              <div className="hero__main-visual">
                <div className="hero__pharmacy-icon">
                  <div className="hero__icon-bg">
                    <span className="hero__main-icon">🏥</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;