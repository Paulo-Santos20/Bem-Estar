import React, { useState } from 'react';
import { categories } from '../../../data/categories';
import './CategoryDropdown.css';

const CategoryDropdown = ({ isOpen, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]?.id || null); // Inicia com a primeira categoria
  const [isHovering, setIsHovering] = useState(false);

  const handleCategoryClick = (categoryId, subcategoryId = null) => {
    console.log('Navegando para:', categoryId, subcategoryId);
    // Implementar navegação
    onClose();
  };

  const handleCategoryHover = (categoryId) => {
    setSelectedCategory(categoryId);
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    // Não limpa o selectedCategory, mantém a última categoria selecionada
  };

  // Imagens de exemplo para cada categoria
  const categoryImages = {
    'saude': [
      { name: 'Termômetro Digital', image: '/api/placeholder/200/200', price: 'R\$ 29,90' },
      { name: 'Medidor de Pressão', image: '/api/placeholder/200/200', price: 'R\$ 89,90' },
      { name: 'Teste de Glicose', image: '/api/placeholder/200/200', price: 'R\$ 45,90' }
    ],
    'medicamentos': [
      { name: 'Paracetamol 500mg', image: '/api/placeholder/200/200', price: 'R\$ 12,50' },
      { name: 'Dipirona 500mg', image: '/api/placeholder/200/200', price: 'R\$ 8,90' },
      { name: 'Ibuprofeno 600mg', image: '/api/placeholder/200/200', price: 'R\$ 15,90' }
    ],
    'vitaminas-suplementos': [
      { name: 'Vitamina C 1g', image: '/api/placeholder/200/200', price: 'R\$ 25,90' },
      { name: 'Vitamina D3', image: '/api/placeholder/200/200', price: 'R\$ 32,90' },
      { name: 'Ômega 3', image: '/api/placeholder/200/200', price: 'R\$ 48,90' }
    ],
    'beleza': [
      { name: 'Protetor Solar FPS 60', image: '/api/placeholder/200/200', price: 'R\$ 39,90' },
      { name: 'Creme Hidratante', image: '/api/placeholder/200/200', price: 'R\$ 24,90' },
      { name: 'Shampoo Anticaspa', image: '/api/placeholder/200/200', price: 'R\$ 18,90' }
    ],
    'cosmeticos': [
      { name: 'Base Facial', image: '/api/placeholder/200/200', price: 'R\$ 45,90' },
      { name: 'Batom Hidratante', image: '/api/placeholder/200/200', price: 'R\$ 22,90' },
      { name: 'Perfume Feminino', image: '/api/placeholder/200/200', price: 'R\$ 89,90' }
    ],
    'mamae-bebe': [
      { name: 'Fralda Descartável', image: '/api/placeholder/200/200', price: 'R\$ 35,90' },
      { name: 'Lenço Umedecido', image: '/api/placeholder/200/200', price: 'R\$ 12,90' },
      { name: 'Pomada Assadura', image: '/api/placeholder/200/200', price: 'R\$ 16,90' }
    ],
    'cuidados-diarios': [
      { name: 'Escova Dental', image: '/api/placeholder/200/200', price: 'R\$ 8,90' },
      { name: 'Creme Dental', image: '/api/placeholder/200/200', price: 'R\$ 6,90' },
      { name: 'Sabonete Líquido', image: '/api/placeholder/200/200', price: 'R\$ 14,90' }
    ],
    'pet': [
      { name: 'Antipulgas', image: '/api/placeholder/200/200', price: 'R\$ 28,90' },
      { name: 'Shampoo Pet', image: '/api/placeholder/200/200', price: 'R\$ 19,90' },
      { name: 'Vitamina Pet', image: '/api/placeholder/200/200', price: 'R\$ 35,90' }
    ]
  };

  if (!isOpen) return null;

  const currentCategory = categories.find(cat => cat.id === selectedCategory);

  return (
    <>
      <div className="category-dropdown-overlay" onClick={onClose}></div>
      
      <div className="category-dropdown">
        <div className="category-dropdown__header">
          <h3 className="category-dropdown__title">
            <span className="category-dropdown__icon">📋</span>
            Todas as Categorias
          </h3>
          <button 
            className="category-dropdown__close"
            onClick={onClose}
            aria-label="Fechar categorias"
          >
            ✕
          </button>
        </div>

        <div className="category-dropdown__content">
          <div className="category-dropdown__layout">
            {/* Coluna de Categorias Principais - 30% */}
            <div className="category-main-column">
              <ul className="category-menu">
                {categories.map((category) => (
                  <li 
                    key={category.id}
                    className={`category-menu__item ${selectedCategory === category.id ? 'category-menu__item--active' : ''}`}
                    onMouseEnter={() => handleCategoryHover(category.id)}
                  >
                    <button
                      className="category-menu__link"
                      onClick={() => handleCategoryClick(category.id)}
                    >
                      {category.name}
                      <span className="category-menu__arrow">›</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Coluna de Subcategorias - 30% */}
            <div className="category-sub-column">
              {selectedCategory && currentCategory && (
                <div className="category-submenu">
                  <div className="category-submenu__content">
                    {currentCategory.subcategories.map((subcategory) => (
                      <div key={subcategory.id} className="subcategory-group">
                        <button
                          className="subcategory-group__title"
                          onClick={() => handleCategoryClick(selectedCategory, subcategory.id)}
                        >
                          {subcategory.name}
                        </button>
                        
                        {subcategory.items && subcategory.items.length > 0 && (
                          <ul className="subcategory-group__list">
                            {subcategory.items.map((item, index) => (
                              <li key={index} className="subcategory-group__item">
                                <button
                                  className="subcategory-group__link"
                                  onClick={() => handleCategoryClick(selectedCategory, subcategory.id, item.id)}
                                >
                                  {item.name}
                                </button>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Coluna de Produtos - 40% */}
            <div className="category-products-column">
              {selectedCategory && categoryImages[selectedCategory] && (
                <div className="category-products">
                  <div className="category-products__header">
                    <h4 className="category-products__title">
                      Produtos em Destaque
                    </h4>
                    <p className="category-products__subtitle">
                      {currentCategory?.name}
                    </p>
                  </div>
                  
                  <div className="category-products__grid">
                    {categoryImages[selectedCategory].map((product, index) => (
                      <div key={index} className="product-card">
                        <div className="product-card__image">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            onError={(e) => {
                              e.target.src = `data:image/svg+xml;base64,${btoa(`
                                <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <rect width="200" height="200" fill="#F8F9FA"/>
                                  <circle cx="100" cy="100" r="40" fill="#E53935"/>
                                  <path d="M85 95h30v10H85V95z" fill="white"/>
                                  <path d="M95 85h10v30H95V85z" fill="white"/>
                                </svg>
                              `)}`;
                            }}
                          />
                          <div className="product-card__overlay">
                            <button className="product-card__quick-view">
                              Ver Produto
                            </button>
                          </div>
                        </div>
                        
                        <div className="product-card__info">
                          <h5 className="product-card__name">{product.name}</h5>
                          <p className="product-card__price">{product.price}</p>
                          <button className="product-card__add-cart">
                            <span>🛒</span>
                            Adicionar
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="category-products__footer">
                    <button 
                      className="category-products__view-all"
                      onClick={() => handleCategoryClick(selectedCategory)}
                    >
                      Ver todos os produtos de {currentCategory?.name}
                    </button>
                  </div>
                </div>
              )}
              
              {!selectedCategory && (
                <div className="category-products__placeholder">
                  <div className="category-products__placeholder-icon">🛍️</div>
                  <h4>Explore Nossos Produtos</h4>
                  <p>Passe o mouse sobre uma categoria para ver os produtos em destaque</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryDropdown;