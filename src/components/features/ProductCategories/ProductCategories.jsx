import React from 'react';
import './ProductCategories.css';

const ProductCategories = () => {
  const categories = [
    {
      id: 1,
      name: 'Medicamentos',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200&h=200&fit=crop&crop=center',
      href: '#medicamentos',
      description: 'Remédios e tratamentos',
      icon: '💊'
    },
    {
      id: 2,
      name: 'Vitaminas',
      image: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=200&h=200&fit=crop&crop=center',
      href: '#vitaminas',
      description: 'Suplementos e vitaminas',
      icon: '🌿'
    },
    {
      id: 3,
      name: 'Beleza',
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&h=200&fit=crop&crop=center',
      href: '#beleza',
      description: 'Cosméticos e cuidados',
      icon: '💄'
    },
    {
      id: 4,
      name: 'Higiene',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop&crop=center',
      href: '#higiene',
      description: 'Produtos de higiene',
      icon: '🧼'
    },
    {
      id: 5,
      name: 'Suplementos',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=200&h=200&fit=crop&crop=center',
      href: '#suplementos',
      description: 'Proteínas e suplementos',
      icon: '💪'
    },
    {
      id: 6,
      name: 'Infantil',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=200&h=200&fit=crop&crop=center',
      href: '#infantil',
      description: 'Produtos para bebês',
      icon: '👶'
    }
  ];

  const handleCategoryClick = (category) => {
    console.log('Categoria clicada:', category.name);
    // Aqui você pode adicionar navegação ou filtros
  };

  return (
    <section className="product-categories">
      <div className="container">
        <div className="product-categories__header">
          <h2 className="product-categories__title">
            <span className="product-categories__title-icon">🏷️</span>
            Categorias Mais Procuradas
          </h2>          
        </div>

        <div className="product-categories__grid">
          {categories.map((category) => (
            <a
              key={category.id}
              href={category.href}
              className="product-categories__item"
              onClick={(e) => {
                e.preventDefault();
                handleCategoryClick(category);
              }}
            >
              <div className="product-categories__image-container">
                <div className="product-categories__image-wrapper">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="product-categories__image"
                    loading="lazy"
                  />
                  <div className="product-categories__overlay">
                    <span className="product-categories__icon">
                      {category.icon}
                    </span>
                  </div>
                </div>
                <div className="product-categories__badge">
                  <span className="product-categories__badge-text">Top</span>
                </div>
              </div>
              
              <div className="product-categories__content">
                <h3 className="product-categories__name">
                  {category.name}
                </h3>
                <p className="product-categories__description">
                  {category.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;