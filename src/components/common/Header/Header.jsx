import React, { useState } from 'react';
import { useCart } from '../../../contexts/CartContext';
import './Header.css';

const Header = () => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMainCategory, setActiveMainCategory] = useState('medicamentos');
  const { items, itemCount, total, formatPrice, removeFromCart, updateQuantity } = useCart();

  const toggleCategories = () => {
    setIsCategoriesOpen(!isCategoriesOpen);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  // Categorias principais
  const mainCategories = [
    { name: 'Medicamentos', href: '#medicamentos' },
    { name: 'Vitaminas', href: '#vitaminas' },
    { name: 'Beleza', href: '#beleza' },
    { name: 'Higiene', href: '#higiene' },
    { name: 'Suplementos', href: '#suplementos' }
  ];

  // Estrutura completa de categorias
  const categoriesData = {
    medicamentos: {
      title: '💊 Medicamentos',
      subcategories: [
        {
          title: 'Dor e Febre',
          items: ['Paracetamol', 'Ibuprofeno', 'Aspirina', 'Dipirona', 'Nimesulida']
        },
        {
          title: 'Digestivos',
          items: ['Antiácidos', 'Probióticos', 'Laxantes', 'Antidiarreicos', 'Enzimas']
        },
        {
          title: 'Respiratórios',
          items: ['Xaropes', 'Descongestionantes', 'Antialérgicos', 'Broncodilatadores']
        },
        {
          title: 'Antibióticos',
          items: ['Amoxicilina', 'Azitromicina', 'Cefalexina', 'Ciprofloxacino']
        }
      ],
      featured: [
        {
          name: 'Paracetamol 500mg',
          price: 8.90,
          originalPrice: 15.90,
          image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=60&h=60&fit=crop'
        },
        {
          name: 'Dipirona Gotas',
          price: 12.50,
          originalPrice: 18.90,
          image: 'https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=60&h=60&fit=crop'
        },
        {
          name: 'Ibuprofeno 600mg',
          price: 15.90,
          originalPrice: 22.90,
          image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=60&h=60&fit=crop'
        }
      ]
    },
    vitaminas: {
      title: '🌿 Vitaminas & Suplementos',
      subcategories: [
        {
          title: 'Vitaminas',
          items: ['Vitamina C', 'Vitamina D', 'Complexo B', 'Vitamina E', 'Ácido Fólico']
        },
        {
          title: 'Minerais',
          items: ['Cálcio', 'Ferro', 'Zinco', 'Magnésio', 'Selênio']
        },
        {
          title: 'Ômega',
          items: ['Ômega 3', 'Ômega 6', 'Óleo de Peixe', 'DHA', 'EPA']
        },
        {
          title: 'Multivitamínicos',
          items: ['Adulto', 'Infantil', 'Idoso', 'Gestante', 'Esportista']
        }
      ],
      featured: [
        {
          name: 'Vitamina C 1000mg',
          price: 22.90,
          originalPrice: 35.90,
          image: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=60&h=60&fit=crop'
        },
        {
          name: 'Ômega 3 Premium',
          price: 39.90,
          originalPrice: 58.90,
          image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=60&h=60&fit=crop'
        },
        {
          name: 'Multivitamínico',
          price: 28.90,
          originalPrice: 42.90,
          image: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=60&h=60&fit=crop'
        }
      ]
    },
    beleza: {
      title: '💄 Beleza & Cuidados',
      subcategories: [
        {
          title: 'Proteção Solar',
          items: ['FPS 30', 'FPS 60', 'Infantil', 'Facial', 'Corporal']
        },
        {
          title: 'Hidratantes',
          items: ['Facial', 'Corporal', 'Mãos', 'Pés', 'Anti-idade']
        },
        {
          title: 'Maquiagem',
          items: ['Base', 'Batom', 'Rímel', 'Pó Compacto', 'Corretivo']
        },
        {
          title: 'Perfumes',
          items: ['Feminino', 'Masculino', 'Infantil', 'Desodorante Colônia']
        }
      ],
      featured: [
        {
          name: 'Protetor Solar FPS 60',
          price: 34.90,
          originalPrice: 49.90,
          image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=60&h=60&fit=crop'
        },
        {
          name: 'Hidratante Facial',
          price: 25.90,
          originalPrice: 38.90,
          image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=60&h=60&fit=crop'
        },
        {
          name: 'Base Líquida',
          price: 45.90,
          originalPrice: 65.90,
          image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=60&h=60&fit=crop'
        }
      ]
    },
    higiene: {
      title: '🧼 Higiene Pessoal',
      subcategories: [
        {
          title: 'Cabelos',
          items: ['Shampoo', 'Condicionador', 'Máscara', 'Finalizadores', 'Anticaspa']
        },
        {
          title: 'Corpo',
          items: ['Sabonetes', 'Gel de Banho', 'Esfoliantes', 'Óleos Corporais']
        },
        {
          title: 'Bucal',
          items: ['Creme Dental', 'Enxaguante', 'Fio Dental', 'Escova de Dente']
        },
        {
          title: 'Desodorantes',
          items: ['Roll-on', 'Aerosol', 'Stick', 'Antitranspirante']
        }
      ],
      featured: [
        {
          name: 'Shampoo Anticaspa',
          price: 16.90,
          originalPrice: 24.90,
          image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=60&h=60&fit=crop'
        },
        {
          name: 'Sabonete Líquido',
          price: 8.90,
          originalPrice: 12.90,
          image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=60&h=60&fit=crop'
        },
        {
          name: 'Creme Dental',
          price: 5.90,
          originalPrice: 8.90,
          image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=60&h=60&fit=crop'
        }
      ]
    },
    suplementos: {
      title: '💪 Suplementos',
      subcategories: [
        {
          title: 'Proteínas',
          items: ['Whey Protein', 'Caseína', 'Albumina', 'Proteína Vegetal']
        },
        {
          title: 'Energéticos',
          items: ['Creatina', 'Cafeína', 'Taurina', 'Guaraná', 'Açaí']
        },
        {
          title: 'Emagrecimento',
          items: ['Termogênicos', 'Bloqueadores', 'Diuréticos', 'Fibras']
        },
        {
          title: 'Recuperação',
          items: ['BCAA', 'Glutamina', 'Arginina', 'HMB']
        }
      ],
      featured: [
        {
          name: 'Whey Protein 1kg',
          price: 89.90,
          originalPrice: 129.90,
          image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=60&h=60&fit=crop'
        },
        {
          name: 'Creatina 300g',
          price: 45.90,
          originalPrice: 65.90,
          image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=60&h=60&fit=crop'
        },
        {
          name: 'BCAA 120 caps',
          price: 35.90,
          originalPrice: 52.90,
          image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=60&h=60&fit=crop'
        }
      ]
    }
  };

  const currentCategory = categoriesData[activeMainCategory];

  return (
    <header className="header">
      {/* SEÇÃO SUPERIOR */}
      <div className="header__top">
        <div className="container">
          <div className="header__top-content">
            {/* Logo */}
            <div className="header__logo">
              <div className="header__logo-icon">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                  <circle cx="20" cy="20" r="18" fill="#E53935"/>
                  <path d="M20 8c-3 0-5 2-5 5 0 2 1 4 3 5v8c0 1 1 2 2 2s2-1 2-2v-8c2-1 3-3 3-5 0-3-2-5-5-5z" fill="white"/>
                  <circle cx="20" cy="30" r="2" fill="white"/>
                </svg>
              </div>
              <div className="header__logo-text">
                <span className="header__logo-name">Bem Estar</span>
                <span className="header__logo-tagline">Farmácia</span>
              </div>
            </div>

            {/* Busca Central */}
            <div className="header__search">
              <input 
                type="text" 
                placeholder="Busque por medicamentos, vitaminas, beleza..."
                className="header__search-input"
              />
              <button className="header__search-button">
                <span>🔍</span>
              </button>
            </div>

            {/* Ações do Header */}
            <div className="header__actions">
              {/* Carrinho */}
              <div className="header__cart">
                <button 
                  className="header__cart-button"
                  onClick={toggleCart}
                  aria-label="Abrir carrinho"
                >
                  <span className="header__cart-icon">🛒</span>
                  <div className="header__cart-info">
                    <span className="header__cart-label">Carrinho</span>
                    <span className="header__cart-count-text">
                      {itemCount} {itemCount === 1 ? 'item' : 'itens'}
                    </span>
                  </div>
                  {itemCount > 0 && (
                    <span className="header__cart-badge">{itemCount}</span>
                  )}
                </button>

                {/* Dropdown do Carrinho */}
                {isCartOpen && (
                  <div className="header__cart-dropdown">
                    <div className="header__cart-header">
                      <h3>Meu Carrinho</h3>
                      <button 
                        className="header__cart-close"
                        onClick={toggleCart}
                        aria-label="Fechar carrinho"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="header__cart-items">
                      {items.length === 0 ? (
                        <p className="header__cart-empty">Seu carrinho está vazio</p>
                      ) : (
                        items.map(item => (
                          <div key={item.id} className="header__cart-item">
                            <img 
                              src={item.image} 
                              alt={item.title}
                              className="header__cart-item-image"
                            />
                            <div className="header__cart-item-info">
                              <h4 className="header__cart-item-title">{item.title}</h4>
                              <p className="header__cart-item-price">
                                {formatPrice(item.offerPrice)}
                              </p>
                              <div className="header__cart-item-quantity">
                                <button 
                                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                  className="header__cart-quantity-btn"
                                  aria-label="Diminuir quantidade"
                                >
                                  -
                                </button>
                                <span>{item.quantity}</span>
                                <button 
                                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                  className="header__cart-quantity-btn"
                                  aria-label="Aumentar quantidade"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                            <button 
                              onClick={() => removeFromCart(item.id)}
                              className="header__cart-item-remove"
                              aria-label="Remover item"
                            >
                              🗑️
                            </button>
                          </div>
                        ))
                      )}
                    </div>

                    {items.length > 0 && (
                      <div className="header__cart-footer">
                        <div className="header__cart-total">
                          <strong>Total: {formatPrice(total)}</strong>
                        </div>
                        <button className="header__cart-checkout">
                          Finalizar Compra
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Favoritos */}
              <button className="header__favorites" aria-label="Favoritos">
                <span className="header__favorites-icon">♡</span>
                <div className="header__favorites-info">
                  <span className="header__favorites-label">Favoritos</span>
                  <span className="header__favorites-count">0 itens</span>
                </div>
              </button>

              {/* Menu Mobile */}
              <button 
                className={`header__mobile-toggle ${isMobileMenuOpen ? 'header__mobile-toggle--active' : ''}`}
                onClick={toggleMobileMenu}
                aria-label="Menu"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* SEÇÃO INFERIOR - NAVEGAÇÃO */}
      <div className="header__bottom">
        <div className="container">
          <div className="header__nav">
            {/* Botão Todas as Categorias */}
            <div className="header__categories">
              <button 
                className={`header__categories-button ${isCategoriesOpen ? 'header__categories-button--active' : ''}`}
                onClick={toggleCategories}
                aria-label="Todas as categorias"
                aria-expanded={isCategoriesOpen}
              >
                <span className="header__categories-icon">☰</span>
                <span className="header__categories-text">Todas as Categorias</span>
                <span className="header__categories-arrow">▼</span>
              </button>

              {/* Dropdown de Categorias - LAYOUT 3 COLUNAS */}
              {isCategoriesOpen && (
                <div className="header__categories-dropdown">
                  <div className="header__categories-content">
                    
                    {/* COLUNA 1 - CATEGORIAS PRINCIPAIS */}
                    <div className="header__categories-main">
                      {Object.keys(categoriesData).map((categoryKey) => (
                        <button
                          key={categoryKey}
                          className={`header__main-category ${
                            activeMainCategory === categoryKey ? 'header__main-category--active' : ''
                          }`}
                          onMouseEnter={() => setActiveMainCategory(categoryKey)}
                          onClick={() => setActiveMainCategory(categoryKey)}
                        >
                          {categoriesData[categoryKey].title}
                        </button>
                      ))}
                    </div>

                    {/* COLUNA 2 - SUBCATEGORIAS */}
                    <div className="header__subcategories">
                      <h3 className="header__subcategories-title">
                        {currentCategory.title}
                      </h3>
                      <div className="header__subcategories-list">
                        {currentCategory.subcategories.map((subcat, index) => (
                          <div key={index} className="header__subcategory-group">
                            <h4 className="header__subcategory-title">{subcat.title}</h4>
                            <ul className="header__subcategory-items">
                              {subcat.items.map((item, itemIndex) => (
                                <li key={itemIndex}>
                                  <a 
                                    href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} 
                                    className="header__subcategory-link"
                                  >
                                    {item}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* COLUNA 3 - PRODUTOS EM DESTAQUE */}
                    <div className="header__featured-products">
                      <h3 className="header__featured-title">
                        Produtos em Destaque
                      </h3>
                      <div className="header__featured-list">
                        {currentCategory.featured.map((product, index) => (
                          <div 
                            key={index} 
                            className="header__featured-product"
                            onClick={() => console.log('Produto clicado:', product.name)}
                          >
                            <img 
                              src={product.image} 
                              alt={product.name}
                              className="header__featured-image"
                            />
                            <div className="header__featured-info">
                              <h4 className="header__featured-name">{product.name}</h4>
                              <p className="header__featured-price">
                                {formatPrice(product.price)}
                                <span className="header__featured-original-price">
                                  {formatPrice(product.originalPrice)}
                                </span>
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              )}
            </div>

            {/* Categorias Principais */}
            <nav className="header__main-nav">
              <ul className="header__main-nav-list">
                {mainCategories.map((category, index) => (
                  <li key={index}>
                    <a href={category.href} className="header__main-nav-link">
                      {category.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Links Adicionais */}
            <div className="header__extra-links">
              <a href="#ofertas" className="header__extra-link header__extra-link--highlight">
                🔥 Ofertas
              </a>
              <a href="#contato" className="header__extra-link">
                Contato
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Mobile */}
      {isMobileMenuOpen && (
        <div className="header__mobile-menu">
          <div className="header__mobile-categories">
            <h3>Categorias</h3>
            {Object.keys(categoriesData).map((categoryKey) => (
              <div key={categoryKey} className="header__mobile-category">
                <h4>{categoriesData[categoryKey].title}</h4>
                {categoriesData[categoryKey].subcategories.map((subcat, index) => (
                  <div key={index}>
                    <h5 style={{margin: '10px 0 5px 0', fontSize: '14px', fontWeight: '600'}}>
                      {subcat.title}
                    </h5>
                    <ul>
                      {subcat.items.map((item, itemIndex) => (
                        <li key={itemIndex}>
                          <a 
                            href={`#${item.toLowerCase().replace(/\s+/g, '-')}`} 
                            onClick={toggleMobileMenu}
                          >
                            {item}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;