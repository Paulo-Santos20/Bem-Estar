import React from 'react';
import ProductCategoryCard from './ProductCategoryCard/ProductCategoryCard';
import Button from '../../ui/Button/Button';
import { categories, mainCategories, getCategoryById } from '../../../data/categories';
import './ProductCategories.css';

const ProductCategories = () => {
  const handleCategoryClick = (categoryId) => {
    console.log('Navegando para categoria:', categoryId);
    // Implementar navegação para categoria
    // navigate(`/categoria/${categoryId}`);
  };

  const handleViewAllCategories = () => {
    console.log('Ver todas as categorias');
    // Implementar navegação para página de categorias
    // navigate('/categorias');
  };

  // Obter as categorias principais e algumas adicionais
  const displayCategories = [
    ...mainCategories.map(id => getCategoryById(id)).filter(Boolean),
    getCategoryById('saude'),
    getCategoryById('cosmeticos'),
    getCategoryById('cuidados-diarios'),
    getCategoryById('pet')
  ].filter((category, index, self) => 
    category && self.findIndex(c => c.id === category.id) === index
  );

  return (
    <section className="product-categories">
      <div className="container">
        <div className="product-categories__header">
          <div className="product-categories__title-section">
            <span className="product-categories__icon">🏪</span>
            <div className="product-categories__text">
              <h2 className="product-categories__title">Nossas Categorias</h2>
              <p className="product-categories__subtitle">
                Encontre tudo o que você precisa para sua saúde e bem-estar
              </p>
            </div>
          </div>
          
          <Button
            variant="outline"
            size="md"
            onClick={handleViewAllCategories}
            className="product-categories__view-all"
          >
            Ver Todas as Categorias
          </Button>
        </div>

        <div className="product-categories__grid">
          {displayCategories.map((category) => (
            <ProductCategoryCard
              key={category.id}
              category={category}
              onClick={() => handleCategoryClick(category.id)}
            />
          ))}
        </div>

        <div className="product-categories__stats">
          <div className="product-categories__stat">
            <span className="product-categories__stat-number">500+</span>
            <span className="product-categories__stat-label">Produtos</span>
          </div>
          <div className="product-categories__stat">
            <span className="product-categories__stat-number">50+</span>
            <span className="product-categories__stat-label">Marcas</span>
          </div>
          <div className="product-categories__stat">
            <span className="product-categories__stat-number">24h</span>
            <span className="product-categories__stat-label">Entrega</span>
          </div>
          <div className="product-categories__stat">
            <span className="product-categories__stat-number">100%</span>
            <span className="product-categories__stat-label">Qualidade</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;