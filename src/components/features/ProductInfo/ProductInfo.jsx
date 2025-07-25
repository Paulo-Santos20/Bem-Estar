import React, { useState } from 'react';
import './ProductInfo.css';

export const ProductInfo = ({
  product,
  selectedVariant,
  onVariantChange,
  quantity,
  onQuantityChange,
  onAddToCart
}) => {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  const currentPrice = selectedVariant?.price || product.price;
  const originalPrice = selectedVariant?.originalPrice || product.originalPrice;
  const discount = originalPrice ? Math.round(((originalPrice - currentPrice) / originalPrice) * 100) : 0;

  const handleQuantityChange = (type) => {
    if (type === 'increase') {
      onQuantityChange(quantity + 1);
    } else if (type === 'decrease' && quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  const isInStock = product.stock > 0;
  const stockLevel = product.stock;

  return (
    <div className="product-info">
      {/* Cabeçalho */}
      <div className="product-info__header">
        <div className="product-info__badges">
          {product.isNew && (
            <span className="product-info__badge product-info__badge--new">Novo</span>
          )}
          {discount > 0 && (
            <span className="product-info__badge product-info__badge--discount">
              -{discount}%
            </span>
          )}
          {product.isBestSeller && (
            <span className="product-info__badge product-info__badge--bestseller">
              Mais Vendido
            </span>
          )}
        </div>

        <h1 className="product-info__title">{product.name}</h1>
        
        <div className="product-info__meta">
          <span className="product-info__brand">Marca: {product.brand}</span>
          <span className="product-info__sku">SKU: {product.sku}</span>
          <span className="product-info__category">
            Categoria: {product.category}
          </span>
        </div>
      </div>

      {/* Avaliações */}
      <div className="product-info__rating">
        <div className="product-info__stars">
          {[...Array(5)].map((_, index) => (
            <span
              key={index}
              className={`product-info__star ${
                index < Math.floor(product.rating) ? 'product-info__star--filled' : ''
              }`}
            >
              ★
            </span>
          ))}
        </div>
        <span className="product-info__rating-text">
          {product.rating} ({product.reviewCount} avaliações)
        </span>
      </div>

      {/* Preços */}
      <div className="product-info__pricing">
        <div className="product-info__price-main">
          <span className="product-info__price-current">
            R\$ {currentPrice.toFixed(2).replace('.', ',')}
          </span>
          {originalPrice && originalPrice > currentPrice && (
            <span className="product-info__price-original">
              R\$ {originalPrice.toFixed(2).replace('.', ',')}
            </span>
          )}
        </div>
        
        {product.installments && (
          <div className="product-info__installments">
            ou {product.installments.count}x de R\$ {
              (currentPrice / product.installments.count).toFixed(2).replace('.', ',')
            } sem juros
          </div>
        )}
      </div>

      {/* Descrição Curta */}
      <div className="product-info__description">
        <p>{product.shortDescription}</p>
      </div>

      {/* Variações */}
      {product.variants && product.variants.length > 0 && (
        <div className="product-info__variants">
          {/* Tamanhos */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="product-info__variant-group">
              <label className="product-info__variant-label">Tamanho:</label>
              <div className="product-info__variant-options">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`product-info__variant-option ${
                      selectedSize === size ? 'product-info__variant-option--active' : ''
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Cores */}
          {product.colors && product.colors.length > 0 && (
            <div className="product-info__variant-group">
              <label className="product-info__variant-label">Cor:</label>
              <div className="product-info__variant-options">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    className={`product-info__variant-option product-info__variant-option--color ${
                      selectedColor === color.name ? 'product-info__variant-option--active' : ''
                    }`}
                    onClick={() => setSelectedColor(color.name)}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  >
                    <span className="sr-only">{color.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Quantidade e Estoque */}
      <div className="product-info__stock-quantity">
        <div className="product-info__stock">
          <span className={`product-info__stock-status ${
            isInStock ? 'product-info__stock-status--available' : 'product-info__stock-status--unavailable'
          }`}>
            {isInStock ? '✓ Em estoque' : '✗ Fora de estoque'}
          </span>
          {isInStock && stockLevel <= 10 && (
            <span className="product-info__stock-warning">
              Apenas {stockLevel} unidades restantes!
            </span>
          )}
        </div>

        {isInStock && (
          <div className="product-info__quantity">
            <label className="product-info__quantity-label">Quantidade:</label>
            <div className="product-info__quantity-controls">
              <button
                className="product-info__quantity-btn"
                onClick={() => handleQuantityChange('decrease')}
                disabled={quantity <= 1}
              >
                -
              </button>
              <input
                type="number"
                className="product-info__quantity-input"
                value={quantity}
                onChange={(e) => onQuantityChange(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
                max={stockLevel}
              />
              <button
                className="product-info__quantity-btn"
                onClick={() => handleQuantityChange('increase')}
                disabled={quantity >= stockLevel}
              >
                +
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Ações */}
      <div className="product-info__actions">
        <button
          className="product-info__add-to-cart"
          onClick={onAddToCart}
          disabled={!isInStock}
        >
          <span className="icon">🛒</span>
          {isInStock ? 'Adicionar ao Carrinho' : 'Produto Indisponível'}
        </button>

        <button className="product-info__wishlist">
          <span className="icon">♡</span>
          Favoritar
        </button>

        <button className="product-info__share">
          <span className="icon">📤</span>
          Compartilhar
        </button>
      </div>

      {/* Informações Extras */}
      <div className="product-info__extras">
        <div className="product-info__feature">
          <span className="icon">🚚</span>
          <div>
            <strong>Entrega Rápida</strong>
            <p>Receba em até 2 dias úteis</p>
          </div>
        </div>

        <div className="product-info__feature">
          <span className="icon">🔄</span>
          <div>
            <strong>Troca Garantida</strong>
            <p>30 dias para trocar ou devolver</p>
          </div>
        </div>

        <div className="product-info__feature">
          <span className="icon">🔒</span>
          <div>
            <strong>Compra Segura</strong>
            <p>Seus dados protegidos</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;