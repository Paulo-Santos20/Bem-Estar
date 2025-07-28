// src/pages/Product/Product.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../../data/products';
import { useCart } from '../../contexts/CartContext';
import './Product.css';

const Product = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart, formatPrice } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    // Buscar produto pelo slug
    const foundProduct = products.find(p => p.slug === slug);
    
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      // Se produto não encontrado, redirecionar para 404 ou produtos
      navigate('/produtos', { replace: true });
    }
    
    setLoading(false);
  }, [slug, navigate]);

  const handleAddToCart = async () => {
    if (!product) return;
    
    try {
      setAddingToCart(true);

      addToCart({
        id: product.id,
        title: product.name,
        offerPrice: product.price,
        image: product.images[0],
        quantity: 1
      });

      setNotification({
        title: product.name,
        price: product.price,
        image: product.images[0]
      });

      setTimeout(() => {
        setNotification(null);
      }, 3000);

    } catch (error) {
      console.error('Erro ao adicionar produto ao carrinho:', error);
    } finally {
      setAddingToCart(false);
    }
  };

  const calculateDiscount = (originalPrice, price) => {
    if (!originalPrice || !price || originalPrice <= price) return 0;
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  };

  if (loading) {
    return (
      <div className="product-loading">
        <div className="loading-spinner">Carregando...</div>
      </div>
    );
  }

  if (!product) {
    return null; // Já redirecionou
  }

  return (
    <div className="product-page">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="product-breadcrumb">
          <button onClick={() => navigate('/')} className="breadcrumb-link">
            Início
          </button>
          <span className="breadcrumb-separator">›</span>
          <button onClick={() => navigate('/produtos')} className="breadcrumb-link">
            Produtos
          </button>
          <span className="breadcrumb-separator">›</span>
          <span className="breadcrumb-current">{product.name}</span>
        </nav>

        <div className="product-content">
          {/* Imagem do produto */}
          <div className="product-image-section">
            <div className="product-image-container">
              <img
                src={product.images[0]}
                alt={product.name}
                className="product-image"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&h=500&fit=crop';
                }}
              />
              
              {/* Badges */}
              <div className="product-badges">
                {calculateDiscount(product.originalPrice, product.price) > 0 && (
                  <span className="product-badge product-badge--discount">
                    -{calculateDiscount(product.originalPrice, product.price)}%
                  </span>
                )}
                {product.isNew && (
                  <span className="product-badge product-badge--new">
                    Novo
                  </span>
                )}
                {product.isBestSeller && (
                  <span className="product-badge product-badge--bestseller">
                    Mais Vendido
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Informações do produto */}
          <div className="product-info-section">
            {product.brand && (
              <div className="product-brand">{product.brand}</div>
            )}
            
            <h1 className="product-title">{product.name}</h1>
            
            {/* Rating */}
            <div className="product-rating">
              <div className="product-stars">
                {Array.from({ length: 5 }, (_, i) => (
                  <span
                    key={i}
                    className={`product-star ${
                      i < Math.round(product.rating) ? 'product-star--filled' : ''
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="product-rating-score">
                ({product.rating.toFixed(1)}) {product.reviewCount} avaliações
              </span>
            </div>

            {/* Preços */}
            <div className="product-pricing">
              {product.originalPrice && product.originalPrice > product.price && (
                <div className="product-original-price">
                  De {formatPrice(product.originalPrice)}
                </div>
              )}
              <div className="product-current-price">
                {formatPrice(product.price)}
              </div>
              {product.originalPrice && product.originalPrice > product.price && (
                <div className="product-savings">
                  Economize {formatPrice(product.originalPrice - product.price)}
                </div>
              )}
            </div>

            {/* Botão de adicionar ao carrinho */}
            <button
              className={`product-add-to-cart ${addingToCart ? 'loading' : ''}`}
              onClick={handleAddToCart}
              disabled={addingToCart}
            >
              {addingToCart ? (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" className="loading-spinner">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="31.416" strokeDashoffset="31.416">
                      <animate attributeName="stroke-dasharray" dur="2s" values="0 31.416;15.708 15.708;0 31.416" repeatCount="indefinite"/>
                      <animate attributeName="stroke-dashoffset" dur="2s" values="0;-15.708;-31.416" repeatCount="indefinite"/>
                    </circle>
                  </svg>
                  Adicionando...
                </>
              ) : (
                <>
                  🛒 Adicionar ao carrinho
                </>
              )}
            </button>

            {/* Informações adicionais */}
            <div className="product-details">
              <h3>Detalhes do produto</h3>
              <p>{product.description || 'Produto de alta qualidade da farmácia Bem Estar.'}</p>
              
              <div className="product-specs">
                <div className="spec-item">
                  <strong>Categoria:</strong> {product.category || 'Medicamentos'}
                </div>
                <div className="spec-item">
                  <strong>Marca:</strong> {product.brand}
                </div>
                <div className="spec-item">
                  <strong>Disponibilidade:</strong> Em estoque
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notificação */}
      {notification && (
        <div className="product-notification product-notification--show">
          <div className="product-notification__content">
            <span className="product-notification__icon">✅</span>
            <div className="product-notification__info">
              <h4>{notification.title}</h4>
              <p>Adicionado ao carrinho!</p>
            </div>
            <button
              className="product-notification__close"
              onClick={() => setNotification(null)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;