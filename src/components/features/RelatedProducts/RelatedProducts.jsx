import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../../../data/products';
import './RelatedProducts.css';

export const RelatedProducts = ({ currentProductId, category }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    // Filtrar produtos relacionados da mesma categoria, excluindo o produto atual
    const related = products
      .filter(product => 
        product.category === category && 
        product.id !== currentProductId
      )
      .slice(0, 4); // Limitar a 4 produtos

    setRelatedProducts(related);
  }, [currentProductId, category]);

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className="related-products">
      <div className="related-products__header">
        <h2 className="related-products__title">
          <span className="related-products__title-icon">🔗</span>
          Produtos Relacionados
        </h2>
        <p className="related-products__subtitle">
          Outros produtos que podem interessar você
        </p>
      </div>

      <div className="related-products__grid">
        {relatedProducts.map((product) => (
          <Link
            key={product.id}
            to={`/produto/${product.id}`}
            className="related-products__item"
          >
            <div className="related-products__image-container">
              <img
                src={product.images[0]}
                alt={product.name}
                className="related-products__image"
              />
              
              {/* Badges */}
              <div className="related-products__badges">
                {product.isNew && (
                  <span className="related-products__badge related-products__badge--new">
                    Novo
                  </span>
                )}
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="related-products__badge related-products__badge--discount">
                    -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                  </span>
                )}
              </div>

              {/* Overlay de Ação */}
              <div className="related-products__overlay">
                <span className="related-products__view-button">
                  Ver Produto
                </span>
              </div>
            </div>

            <div className="related-products__info">
              <h3 className="related-products__name">{product.name}</h3>
              
              <div className="related-products__rating">
                <div className="related-products__stars">
                  {[...Array(5)].map((_, index) => (
                    <span
                      key={index}
                      className={`related-products__star ${
                        index < Math.floor(product.rating) ? 'related-products__star--filled' : ''
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="related-products__rating-text">
                  ({product.reviewCount})
                </span>
              </div>

              <div className="related-products__pricing">
                <span className="related-products__price">
                  R\$ {product.price.toFixed(2).replace('.', ',')}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="related-products__original-price">
                    R\$ {product.originalPrice.toFixed(2).replace('.', ',')}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;