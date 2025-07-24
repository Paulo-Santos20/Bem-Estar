import React from 'react';
import Hero from '../../components/features/Hero/Hero';
import OffersCarousel from '../../components/features/OffersCarousel/OffersCarousel';
import ProductCategories from '../../components/features/ProductCategories/ProductCategories';
import ServicesSection from '../../components/features/ServicesSection/ServicesSection';

const Home = () => {
  return (
    <div className="home">
      <Hero />
      
      {/* Seção de Ofertas */}
      <section 
        className="offers-section"       
      >
        <div 
          className="container">
          <OffersCarousel />
        </div>
      </section>

      <ProductCategories />
      <ServicesSection />
    </div>
  );
};

export default Home;