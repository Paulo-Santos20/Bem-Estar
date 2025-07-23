import React, { useState } from 'react';
import './ProductCategoryCard.css';

const ProductCategoryCard = ({ category, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Dados de exemplo para cada categoria
  const categoryData = {
    'medicamentos': {
      image: '/api/placeholder/300/200',
      productCount: 150,
      popularItems: ['Paracetamol', 'Dipirona', 'Ibuprofeno'],
      color: '#E53935'
    },
    'vitaminas-suplementos': {
      image: '/api/placeholder/300/200',
      productCount: 80,
      popularItems: ['Vitamina C', 'Vitamina D3', 'Ômega 3'],
      color: '#FF9800'
    },
    'beleza': {
      image: '/api/placeholder/300/200',
      productCount: 120,
      popularItems: ['Protetor Solar', 'Hidratante', 'Shampoo'],
      color: '#E91E63'
    },
    'mamae-bebe': {
      image: '/api/placeholder/300/200',
      productCount: 90,
      popularItems: ['Fraldas', 'Lenços', 'Pomadas'],
      color: '#9C27B0'
    },
    'saude': {
      image: '/api/placeholder/300/200',
      productCount: 70,
      popularItems: ['Termômetro', 'Medidor Pressão', 'Testes'],
      color: '#2196F3'
    },
    'cosmeticos': {
      image: '/api/placeholder/300/200',
      productCount: 60,
      popularItems: ['Maquiagem', 'Perfumes', 'Dermocosméticos'],
      color: '#673AB7'
    },
    'cuidados-diarios': {
      image: '/api/placeholder/300/200',
      productCount: 110,
      popularItems: ['Escova Dental', 'Sabonete', 'Absorvente'],
      color: '#009688'
    },
    'pet': {
      image: '/api/placeholder/300/200',
      productCount: 45,
      popularItems: ['Antipulgas', 'Shampoo Pet', 'Vitaminas'],
      color: '#795548'
    }
  };

  const data = categoryData[category.id] || {
    image: '/api/placeholder/300/200',
    productCount: 50,
    popularItems: ['Produto 1', 'Produto 2', 'Produto 3'],
    color: '#607D8B'
  };

  const handleImageError = (e) => {
    e.target.src = `data:image/svg+xml;base64,${btoa(`
      <svg width="300" height="200" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="300" height="200" fill="#F8F9FA"/>
        <circle cx="150" cy="100" r="30" fill="${data.color}"/>
        <text x="150" y="105" text-anchor="middle" fill="white" font-size="20" font-weight="bold">${category.icon}</text>
      </svg>
    `)}`;
  };

  return (
    <div 
      className="product-category-card"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="product-category-card__image-container">
        <img
          src={data.image}
          alt={category.name}
          className="product-category-card__image"
          onError={handleImageError}
        />
        <div className="product-category-card__overlay">
          <div className="product-category-card__icon" style={{ color: data.color }}>
            {category.icon}
          </div>
        </div>
        <div className="product-category-card__badge">
          <span className="product-category-card__count">
            {data.productCount}+ produtos
          </span>
        </div>
      </div>

      <div className="product-category-card__content">
        <h3 className="product-category-card__title">{category.name}</h3>
        
        <div className="product-category-card__popular">
          <span className="product-category-card__popular-label">Mais procurados:</span>
          <div className="product-category-card__popular-items">
            {data.popularItems.map((item, index) => (
              <span key={index} className="product-category-card__popular-item">
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="product-category-card__subcategories">
          <span className="product-category-card__subcategories-label">
            {category.subcategories.length} subcategorias
          </span>
          {isHovered && (
            <div className="product-category-card__subcategories-preview">
              {category.subcategories.slice(0, 3).map((sub, index) => (
                <span key={index} className="product-category-card__subcategory">
                  {sub.name}
                </span>
              ))}
              {category.subcategories.length > 3 && (
                <span className="product-category-card__subcategory-more">
                  +{category.subcategories.length - 3} mais
                </span>
              )}
            </div>
          )}
        </div>

        <div className="product-category-card__action">
          <span className="product-category-card__action-text">Explorar Categoria</span>
          <span className="product-category-card__action-arrow">→</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCategoryCard;