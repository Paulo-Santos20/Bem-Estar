import React from 'react';
import { Hero } from '../../components/features/Hero';
import { ProductCategories } from '../../components/features/ProductCategories';
import { SaleCarousel } from '../../components/features/SaleCarousel';
import { ServicesSection } from '../../components/features/ServicesSection';
import ProductCarousel from '../../components/features/ProductCarousel/ProductCarousel';

import './Home.css';

export const Home = () => {
  return (
    <div className="home">
      <Hero />
      <ProductCarousel />
      <ProductCategories />
      <SaleCarousel/>
      <ServicesSection />
    </div>
  );
};

export default Home;