import React from 'react';
import Hero from '../../components/features/Hero/Hero';
import './Home.css';
import Button from '../../components/ui/Button/Button';

// Resto do código permanece igual...
const Home = () => {
  return (
    <div className="home">
      <Hero />
      
      {/* Seção de Categorias de Produtos */}
      <section className="section categories-section">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Nossos Produtos</h2>
            <p className="section-description">
              Encontre tudo o que você precisa para cuidar da sua saúde e bem-estar
            </p>
          </div>
          
          <div className="categories-grid">
            <div className="category-card animate-fade-in-up">
              <div className="category-card__icon">
                <span>💊</span>
              </div>
              <h3 className="category-card__title">Medicamentos</h3>
              <p className="category-card__description">
                Medicamentos de prescrição e venda livre com garantia de qualidade
              </p>
              <a href="#" className="category-card__link">Ver produtos</a>
            </div>
            
            <div className="category-card animate-fade-in-up" style={{animationDelay: '0.1s'}}>
              <div className="category-card__icon">
                <span>🧴</span>
              </div>
              <h3 className="category-card__title">Higiene e Beleza</h3>
              <p className="category-card__description">
                Produtos para cuidados pessoais, higiene e beleza
              </p>
              <a href="#" className="category-card__link">Ver produtos</a>
            </div>
            
            <div className="category-card animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              <div className="category-card__icon">
                <span>💪</span>
              </div>
              <h3 className="category-card__title">Vitaminas</h3>
              <p className="category-card__description">
                Suplementos vitamínicos e nutricionais para sua saúde
              </p>
              <a href="#" className="category-card__link">Ver produtos</a>
            </div>
            
            <div className="category-card animate-fade-in-up" style={{animationDelay: '0.3s'}}>
              <div className="category-card__icon">
                <span>🩺</span>
              </div>
              <h3 className="category-card__title">Equipamentos</h3>
              <p className="category-card__description">
                Equipamentos médicos e de monitoramento de saúde
              </p>
              <a href="#" className="category-card__link">Ver produtos</a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Seção de Serviços */}
      <section className="section services-section">
        <div className="container">
          <div className="services-content">
            <div className="services-text">
              <h2 className="section-title">Nossos Serviços</h2>
              <p className="section-description">
                Além de produtos de qualidade, oferecemos serviços farmacêuticos 
                especializados para cuidar melhor da sua saúde.
              </p>
              
              <div className="services-list">
                <div className="service-item">
                  <div className="service-item__icon">
                    <span>🩸</span>
                  </div>
                  <div className="service-item__content">
                    <h4>Testes Rápidos</h4>
                    <p>Glicemia, pressão arterial e outros exames rápidos</p>
                  </div>
                </div>
                
                <div className="service-item">
                  <div className="service-item__icon">
                    <span>💉</span>
                  </div>
                  <div className="service-item__content">
                    <h4>Aplicação de Injetáveis</h4>
                    <p>Aplicação segura de medicamentos injetáveis</p>
                  </div>
                </div>
                
                <div className="service-item">
                  <div className="service-item__icon">
                    <span>👨‍⚕️</span>
                  </div>
                  <div className="service-item__content">
                    <h4>Consulta Farmacêutica</h4>
                    <p>Orientação especializada sobre medicamentos</p>
                  </div>
                </div>
              </div>
              
              <Button variant="primary" size="lg">
                Conhecer Todos os Serviços
              </Button>
            </div>
            
            <div className="services-visual">
              <div className="services-image">
                <div className="services-badge">
                  <span className="services-badge__icon">✨</span>
                  <span>Atendimento Especializado</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;