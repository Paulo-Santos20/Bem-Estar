import React from 'react';
import { Hero } from '../../components/features/Hero';
import { ProductCategories } from '../../components/features/ProductCategories';
import OffersCarousel from '../../components/features/OffersCarousel/OffersCarousel';
import { FeaturedProducts } from '../../components/features/FeaturedProducts';
import { ServicesSection } from '../../components/features/ServicesSection';
import './Home.css';

export const Home = () => {
  return (
    <div className="home">
      <Hero />
 <section 
        className="offers-section"       
      >
        <div 
          className="container">
          <OffersCarousel />
        </div>
      </section>
      <ProductCategories />
      <FeaturedProducts 
        title="Produtos em Destaque"
        subtitle="Confira nossos produtos mais vendidos e novidades"
        maxProducts={8}
        showFilters={true}
        showViewAll={true}
      />
      <ServicesSection />
    </div>
  );
};

export default Home;