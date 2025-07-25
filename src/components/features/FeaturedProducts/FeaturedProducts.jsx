import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { products } from '../../../data/products';
import './FeaturedProducts.css';

export const FeaturedProducts = ({ 
  title = 'Produtos em Destaque',
  subtitle = 'Confira nossos produtos mais vendidos e novidades',
  maxProducts = 8,
  showFilters = true,
  showViewAll = true
}) => {
  const navigate = useNavigate();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  const filters = [
    { id: 'all', label: 'Todos', icon: '🏷️' },
    { id: 'bestseller', label: 'Mais Vendidos', icon: '🏆' },
    { id: 'new', label: 'Novidades', icon: '✨' },
    { id: 'discount', label: 'Promoções', icon: '🔥' }
  ];

  useEffect(() => {
    const loadFeaturedProducts = async () => {
      setLoading(true);
      
      // Simular delay de carregamento
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Filtrar produtos em destaque
      const featured = products.filter(product => 
        product.isBestSeller || 
        product.isNew || 
        (product.originalPrice && product.originalPrice > product.price)
      ).slice(0, maxProducts);
      
      setFeaturedProducts(featured);
      setFilteredProducts(featured);
      setLoading(false);
    };

    loadFeaturedProducts();
  }, [maxProducts]);

  useEffect(() => {
    let filtered = [...featuredProducts];

    switch (activeFilter) {
      case 'bestseller':
        filtered = featuredProducts.filter(product => product.isBestSeller);
        break;
      case 'new':
        filtered = featuredProducts.filter(product => product.isNew);
        break;
      case 'discount':
        filtered = featuredProducts.filter(product => 
          product.originalPrice && product.originalPrice > product.price
        );
        break;
      default:
        filtered = featuredProducts;
    }

    setFilteredProducts(filtered);
  }, [activeFilter, featuredProducts]);

  const handleProductClick = (product) => {
    console.log('Redirecionando para a página do produto:', product.name);
    navigate(`/produto/${product.id}`);
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    console.log('Adicionando ao carrinho:', product.name);
    
    // Feedback visual
    const button = e.target.closest('.featured-products__add-to-cart');
    if (button) {
      const originalText = button.innerHTML;
      button.innerHTML = '<span class="icon">✓</span> Adicionado!';
      button.style.background = '#28a745';
      
      setTimeout(() => {
        button.innerHTML = originalText;
        button.style.background = '';
      }, 2000);
    }
  };

  const handleViewAll = () => {
    navigate('/produtos');
  };

  const getDiscountPercentage = (originalPrice, currentPrice) => {
    if (!originalPrice || originalPrice <= currentPrice) return 0;
    return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
  };

  if (loading) {
    return (
      <section className="featured-products featured-products--loading">
        <div className="container">
          <div className="featured-products__header">
            <div className="featured-products__title-skeleton"></div>
            <div className="featured-products__subtitle-skeleton"></div>
          </div>
          
          <div className="featured-products__grid">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="featured-products__card featured-products__card--skeleton">
                <div className="featured-products__image-skeleton"></div>
                <div className="featured-products__content-skeleton">
                  <div className="featured-products__title-line-skeleton"></div>
                  <div className="featured-products__title-line-skeleton featured-products__title-line-skeleton--short"></div>
                  <div className="featured-products__rating-skeleton"></div>
                  <div className="featured-products__price-skeleton"></div>
                  <div className="featured-products__button-skeleton"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="featured-products">
      <div className="container">
        {/* Cabeçalho */}
        <div className="featured-products__header">
          <div className="featured-products__title-container">
            <h2 className="featured-products__title">
              <span className="featured-products__title-icon">⭐</span>
              {title}
            </h2>
            <p className="featured-products__subtitle">{subtitle}</p>
          </div>
          
          {showViewAll && (
            <button 
              className="featured-products__view-all"
              onClick={handleViewAll}
            >
              <span className="featured-products__view-all-text">Ver Todos</span>
              <span className="featured-products__view-all-icon">→</span>
            </button>
          )}
        </div>

        {/* Filtros */}
        {showFilters && (
          <div className="featured-products__filters">
            {filters.map((filter) => (
              <button
                key={filter.id}
                className={`featured-products__filter ${
                  activeFilter === filter.id ? 'featured-products__filter--active' : ''
                }`}
                onClick={() => setActiveFilter(filter.id)}
              >
                <span className="featured-products__filter-icon">{filter.icon}</span>
                <span className="featured-products__filter-label">{filter.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Grid de Produtos */}
        <div className="featured-products__grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div 
                key={product.id} 
                className="featured-products__card"
                onClick={() => handleProductClick(product)}
              >
                {/* Imagem do Produto */}
                <div className="featured-products__image-container">
                  <img
                    src={product.images?.[0] || '/images/placeholder.jpg'}
                    alt={product.name}
                    className="featured-products__image"
                    loading="lazy"
                  />
                  
                  {/* Badges */}
                  <div className="featured-products__badges">
                    {product.isNew && (
                      <span className="featured-products__badge featured-products__badge--new">
                        Novo
                      </span>
                    )}
                    {getDiscountPercentage(product.originalPrice, product.price) > 0 && (
                      <span className="featured-products__badge featured-products__badge--discount">
                        -{getDiscountPercentage(product.originalPrice, product.price)}%
                      </span>
                    )}
                    {product.isBestSeller && (
                      <span className="featured-products__badge featured-products__badge--bestseller">
                        Top
                      </span>
                    )}
                  </div>

                  {/* Overlay de Ação */}
                  <div className="featured-products__overlay">
                    <button 
                      className="featured-products__quick-view"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleProductClick(product);
                      }}
                    >
                      <span className="icon">👁️</span>
                      Ver Produto
                    </button>
                  </div>
                </div>

                {/* Conteúdo do Card */}
                <div className="featured-products__content">
                  <div className="featured-products__brand">
                    {product.brand}
                  </div>
                  
                  <h3 className="featured-products__name">
                    {product.name}
                  </h3>
                  
                  {/* Avaliação */}
                  <div className="featured-products__rating">
                    <div className="featured-products__stars">
                      {[...Array(5)].map((_, index) => (
                        <span
                          key={index}
                          className={`featured-products__star ${
                            index < Math.floor(product.rating || 0) ? 'featured-products__star--filled' : ''
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="featured-products__rating-count">
                      ({product.reviewCount || 0})
                    </span>
                  </div>

                  {/* Preços */}
                  <div className="featured-products__pricing">
                    <span className="featured-products__price">
                      R\$ {product.price.toFixed(2).replace('.', ',')}
                    </span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="featured-products__original-price">
                        R\$ {product.originalPrice.toFixed(2).replace('.', ',')}
                      </span>
                    )}
                  </div>

                  {/* Parcelamento */}
                  {product.installments && (
                    <div className="featured-products__installments">
                      ou {product.installments.count}x de R\$ {
                        (product.price / product.installments.count).toFixed(2).replace('.', ',')
                      }
                    </div>
                  )}

                  {/* Botão Adicionar ao Carrinho */}
                  <button 
                    className="featured-products__add-to-cart"
                    onClick={(e) => handleAddToCart(e, product)}
                  >
                    <span className="icon">🛒</span>
                    <span className="featured-products__add-to-cart-text">
                      Adicionar ao Carrinho
                    </span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="featured-products__empty">
              <div className="featured-products__empty-icon">🔍</div>
              <h3 className="featured-products__empty-title">
                Nenhum produto encontrado
              </h3>
              <p className="featured-products__empty-text">
                Tente alterar os filtros para ver mais produtos.
              </p>
            </div>
          )}
        </div>

        {/* Estatísticas */}
        {filteredProducts.length > 0 && (
          <div className="featured-products__stats">
            <div className="featured-products__stat">
              <span className="featured-products__stat-number">
                {filteredProducts.length}
              </span>
              <span className="featured-products__stat-label">
                {filteredProducts.length === 1 ? 'Produto' : 'Produtos'}
              </span>
            </div>
            
            <div className="featured-products__stat">
              <span className="featured-products__stat-number">
                {filteredProducts.filter(p => p.isBestSeller).length}
              </span>
              <span className="featured-products__stat-label">
                Mais Vendidos
              </span>
            </div>
            
            <div className="featured-products__stat">
              <span className="featured-products__stat-number">
                {filteredProducts.filter(p => p.isNew).length}
              </span>
              <span className="featured-products__stat-label">
                Novidades
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;