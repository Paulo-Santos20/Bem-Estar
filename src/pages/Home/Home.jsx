import React from 'react';
import { Hero } from '../../components/features/Hero';
import { ProductCategories } from '../../components/features/ProductCategories';
import { FeaturedProducts } from '../../components/features/FeaturedProducts';
import { ServicesSection } from '../../components/features/ServicesSection';
import ProductCarousel from '../../components/features/ProductCarousel/ProductCarousel';

import './Home.css';

export const Home = () => {
  return (
    <div className="home">
      <Hero />
      <ProductCarousel />
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