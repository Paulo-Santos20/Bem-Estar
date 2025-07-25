import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../contexts/CartContext';
import './ProductCard.css';

export const ProductCard = ({ product, viewMode = 'grid' }) => {
  const navigate = useNavigate();
  const { addToCart, isInCart, getItemQuantity } = useCart();

  const handleProductClick = () => {
    navigate(`/produto/${product.id}`);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.images[0],
      category: product.category,
      brand: product.brand,
      stock: product.stock
    };
    
    addToCart(cartItem);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const getDiscountPercentage = () => {
    if (!product.originalPrice || product.originalPrice <= product.price) return 0;
    return Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="product-card__star product-card__star--full">★</span>);
    }

    if (hasHalfStar) {
      stars.push(<span key="half" className="product-card__star product-card__star--half">★</span>);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="product-card__star product-card__star--empty">☆</span>);
    }

    return stars;
  };

  return (
    <div 
      className={`product-card product-card--${viewMode}`}
      onClick={handleProductClick}
    >
      {/* Badges */}
      <div className="product-card__badges">
        {product.isNew && (
          <span className="product-card__badge product-card__badge--new">Novo</span>
        )}
        {getDiscountPercentage() > 0 && (
          <span className="product-card__badge product-card__badge--discount">
            -{getDiscountPercentage()}%
          </span>
        )}
        {product.isBestSeller && (
          <span className="product-card__badge product-card__badge--bestseller">
            Mais Vendido
          </span>
        )}
        {isInCart(product.id) && (
          <span className="product-card__badge product-card__badge--cart">
            {getItemQuantity(product.id)}x no carrinho
          </span>
        )}
      </div>

      {/* Imagem */}
      <div className="product-card__image-container">
        <img
          src={product.images?.[0] || '/images/placeholder.jpg'}
          alt={product.name}
          className="product-card__image"
          loading="lazy"
        />
        
        <div className="product-card__overlay">
          <button 
            className="product-card__quick-view"
            onClick={(e) => {
              e.stopPropagation();
                            handleProductClick();
            }}
          >
            <span className="icon">👁️</span>
            Ver Produto
          </button>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="product-card__content">
        <div className="product-card__brand">{product.brand}</div>
        
        <h3 className="product-card__title">{product.name}</h3>
        
        {viewMode === 'list' && (
          <p className="product-card__description">{product.shortDescription}</p>
        )}
        
        {/* Avaliação */}
        <div className="product-card__rating">
          <div className="product-card__stars">
            {renderStars(product.rating || 0)}
          </div>
          <span className="product-card__rating-count">
            ({product.reviewCount || 0})
          </span>
        </div>

        {/* Preços */}
        <div className="product-card__pricing">
          <span className="product-card__price">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="product-card__original-price">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Parcelamento */}
        {product.installments && (
          <div className="product-card__installments">
            ou {product.installments.count}x de {formatPrice(product.installments.value)}
          </div>
        )}

        {/* Estoque */}
        <div className="product-card__stock">
          {product.stock > 0 ? (
            <span className="product-card__stock--available">
              ✓ Em estoque ({product.stock} unidades)
            </span>
          ) : (
            <span className="product-card__stock--unavailable">
              ✗ Fora de estoque
            </span>
          )}
        </div>

        {/* Botão */}
        <button 
          className={`product-card__add-to-cart ${
            isInCart(product.id) ? 'product-card__add-to-cart--active' : ''
          } ${product.stock === 0 ? 'product-card__add-to-cart--disabled' : ''}`}
          onClick={handleAddToCart}
          disabled={product.stock === 0}
        >
          <span className="icon">🛒</span>
          <span className="product-card__add-to-cart-text">
            {product.stock === 0 
              ? 'Fora de Estoque' 
              : isInCart(product.id) 
                ? 'Adicionar Mais' 
                : 'Adicionar ao Carrinho'
            }
          </span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;