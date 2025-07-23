import React from 'react';
import { useCart } from '../../../contexts/CartContext';
import Button from '../Button/Button';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addItem, getItemQuantity } = useCart();
  
  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const handleAddToCart = () => {
    addItem(product);
  };

  const quantity = getItemQuantity(product.id);

  return (
    <div className="product-card">
      <div className="product-card__image">
        <img src={product.image || '/placeholder-product.jpg'} alt={product.name} />
      </div>
      
      <div className="product-card__content">
        <h3 className="product-card__name">{product.name}</h3>
        <p className="product-card__description">{product.description}</p>
        <div className="product-card__price">{formatPrice(product.price)}</div>
        
        <Button 
          variant="primary" 
          size="sm"
          onClick={handleAddToCart}
          icon={<span>🛒</span>}
          className="product-card__add-btn"
        >
          {quantity > 0 ? `Adicionar mais (${quantity})` : 'Adicionar ao Carrinho'}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;