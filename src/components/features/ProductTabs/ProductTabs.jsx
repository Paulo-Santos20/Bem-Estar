import React from 'react';
import './ProductTabs.css';

export const ProductTabs = ({ product, activeTab, onTabChange }) => {
  const tabs = [
    { id: 'description', label: 'Descrição', icon: '📝' },
    { id: 'specifications', label: 'Especificações', icon: '📋' },
    { id: 'benefits', label: 'Benefícios', icon: '✨' },
    { id: 'usage', label: 'Como Usar', icon: '💡' }
  ];

  return (
    <div className="product-tabs">
      {/* Navegação das Abas */}
      <div className="product-tabs__nav">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`product-tabs__nav-item ${
              activeTab === tab.id ? 'product-tabs__nav-item--active' : ''
            }`}
            onClick={() => onTabChange(tab.id)}
          >
            <span className="product-tabs__nav-icon">{tab.icon}</span>
            <span className="product-tabs__nav-label">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Conteúdo das Abas */}
      <div className="product-tabs__content">
        {activeTab === 'description' && (
          <div className="product-tabs__panel">
            <h3 className="product-tabs__panel-title">Descrição do Produto</h3>
            <div className="product-tabs__panel-content">
              <p>{product.description}</p>
              
              {product.highlights && (
                <div className="product-tabs__highlights">
                  <h4>Destaques:</h4>
                  <ul>
                    {product.highlights.map((highlight, index) => (
                      <li key={index}>{highlight}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'specifications' && (
          <div className="product-tabs__panel">
            <h3 className="product-tabs__panel-title">Especificações Técnicas</h3>
            <div className="product-tabs__panel-content">
              {product.specifications ? (
                <div className="product-tabs__specs">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="product-tabs__spec-item">
                      <span className="product-tabs__spec-label">{key}:</span>
                      <span className="product-tabs__spec-value">{value}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p>Especificações não disponíveis para este produto.</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'benefits' && (
          <div className="product-tabs__panel">
            <h3 className="product-tabs__panel-title">Benefícios</h3>
            <div className="product-tabs__panel-content">
              {product.benefits ? (
                <div className="product-tabs__benefits">
                  {product.benefits.map((benefit, index) => (
                    <div key={index} className="product-tabs__benefit-item">
                      <span className="product-tabs__benefit-icon">✓</span>
                      <span className="product-tabs__benefit-text">{benefit}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p>Informações de benefícios não disponíveis.</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'usage' && (
          <div className="product-tabs__panel">
            <h3 className="product-tabs__panel-title">Como Usar</h3>
            <div className="product-tabs__panel-content">
              {product.usage ? (
                <div className="product-tabs__usage">
                  {Array.isArray(product.usage) ? (
                    <ol>
                      {product.usage.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ol>
                  ) : (
                    <p>{product.usage}</p>
                  )}
                </div>
              ) : (
                <div className="product-tabs__usage">
                  <p>Siga as orientações da embalagem ou consulte um profissional de saúde.</p>
                  <div className="product-tabs__warning">
                    <strong>⚠️ Importante:</strong>
                    <ul>
                      <li>Mantenha fora do alcance de crianças</li>
                      <li>Armazene em local seco e arejado</li>
                      <li>Consulte um médico antes de usar</li>
                      <li>Não exceda a dose recomendada</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductTabs;