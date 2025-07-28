// Nome do arquivo: src/components/features/ProductCarousel/ProductCard/ProductCard.jsx
import React from 'react';
import styles from './ProductCard.module.css';

const ProductCard = ({ product }) => {
  // Função para renderizar estrelas de avaliação
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    // Estrelas cheias
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`full-${i}`} className={styles.star}>★</span>);
    }
    // Meia estrela (se houver)
    if (hasHalfStar) {
      stars.push(<span key="half" className={styles.starHalf}>★</span>);
    }
    // Estrelas vazias para completar 5
    for (let i = stars.length; i < 5; i++) {
      stars.push(<span key={`empty-${i}`} className={styles.starEmpty}>☆</span>);
    }
    return stars;
  };

  return (
    <div className={styles.productCard}>
      <img src={product.image} alt={product.name} className={styles.productImage} />
      <div className={styles.productInfo}>
        <h4 className={styles.productName}>{product.name}</h4>
        <div className={styles.productRating}>
          {renderStars(product.rating)}
          <span className={styles.ratingText}>({product.rating.toFixed(1)})</span>
        </div>
        <div className={styles.productPrices}>
          {product.oldPrice && (
            <span className={styles.oldPrice}>R\$ {product.oldPrice.toFixed(2).replace('.', ',')}</span>
          )}
          <span className={styles.currentPrice}>R\$ {product.price.toFixed(2).replace('.', ',')}</span>
        </div>
        <button className={styles.addToCartButton}>
          <span className={styles.cartIcon}>🛒</span> Adicionar
        </button>
      </div>
    </div>
  );
};

export default ProductCard;