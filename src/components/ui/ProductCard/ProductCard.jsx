import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProductCard.css';

export const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleProductClick = () => {
    console.log('Redirecionando para a página do produto:', product.name);
    navigate(`/produto/${product.id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Evita que o clique no botão acione o clique do card
    console.log('Adicionando ao carrinho:', product.name);
    // Lógica do carrinho aqui
  };

  return (
    <div className="product-card" onClick={handleProductClick}>
      <div className="product-card__image-container">
        <img
          src={product.images?.[0] || '/images/placeholder.jpg'}
          alt={product.name}
          className="product-card__image"
        />
        
        {/* Badges */}
        <div className="product-card__badges">
          {product.isNew && (
            <span className="product-card__badge product-card__badge--new">Novo</span>
          )}
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="product-card__badge product-card__badge--discount">
              -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </span>
          )}
        </div>
      </div>

      <div className="product-card__content">
        <h3 className="product-card__title">{product.name}</h3>
        
        <div className="product-card__rating">
          <div className="product-card__stars">
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                className={`product-card__star ${
                  index < Math.floor(product.rating || 0) ? 'product-card__star--filled' : ''
                }`}
              >
                ★
              </span>
            ))}
          </div>
          <span className="product-card__rating-count">
            ({product.reviewCount || 0})
          </span>
        </div>

        <div className="product-card__pricing">
          <span className="product-card__price">
            R\$ {product.price.toFixed(2).replace('.', ',')}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="product-card__original-price">
              R\$ {product.originalPrice.toFixed(2).replace('.', ',')}
            </span>
          )}
        </div>

        <button 
          className="product-card__add-to-cart"
          onClick={handleAddToCart}
        >
          <span className="icon">🛒</span>
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
};

export default ProductCard;