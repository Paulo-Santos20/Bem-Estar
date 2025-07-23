import React from 'react';
import OffersCarousel from '../../components/features/OffersCarousel/OffersCarousel';
import ProductCategories from '../../components/features/ProductCategories/ProductCategories';
import ServicesSection from '../../components/features/ServicesSection/ServicesSection';
import Testimonials from '../../components/features/Testimonials/Testimonials';

const Home = () => {
  return (
    <div className="home">     
      {/* Carrossel de Ofertas */}
      <section className="section">
        <div className="container">
          <OffersCarousel />
        </div>
      </section>

      <ProductCategories />
      <ServicesSection />
      <Testimonials />
    </div>
  );
};

export default Home;