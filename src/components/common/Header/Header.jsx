// src/components/common/Header/Header.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../../contexts/CartContext';
import './Header.css';

const Header = () => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMainCategory, setActiveMainCategory] = useState('medicamentos');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  // Estados para navegação mobile hierárquica
  const [mobileMenuView, setMobileMenuView] = useState('main');
  const [selectedMobileCategory, setSelectedMobileCategory] = useState(null);
  const [expandedSecondLevelIndex, setExpandedSecondLevelIndex] = useState(null);

  const navigate = useNavigate();

  // Usar o contexto do carrinho com verificação de segurança
  const cartContext = useCart();
  const {
    cartItems = [],
    isCartOpen: cartContextOpen = false,
    toggleCart,
    removeFromCart,
    updateQuantity,
    getCartTotal,
    getCartItemsCount,
    formatPrice
  } = cartContext || {};

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fechar menus ao redimensionar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
        setIsSearchOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fechar menus ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.header__categories') && isCategoriesOpen) {
        setIsCategoriesOpen(false);
      }
      if (!event.target.closest('.header__cart') && isCartOpen) {
        setIsCartOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isCategoriesOpen, isCartOpen]);

  // Calcular valores do carrinho com segurança
  const itemCount = getCartItemsCount ? getCartItemsCount() : (Array.isArray(cartItems) ? cartItems.length : 0);
  const total = getCartTotal ? getCartTotal() : 0;
  const items = Array.isArray(cartItems) ? cartItems : [];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/produtos?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };

  const toggleCategories = () => {
    setIsCategoriesOpen(!isCategoriesOpen);
  };

  const handleCartToggle = () => {
    if (toggleCart) {
      toggleCart();
    } else {
      setIsCartOpen(!isCartOpen);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isMobileMenuOpen) {
      setMobileMenuView('main');
      setSelectedMobileCategory(null);
      setExpandedSecondLevelIndex(null);
    }
  };

  const handleMobileCategoryClick = (categoryKey) => {
    setSelectedMobileCategory(categoryKey);
    setMobileMenuView('subcategory');
    setExpandedSecondLevelIndex(null);
  };

  const handleMobileBackToMain = () => {
    setMobileMenuView('main');
    setSelectedMobileCategory(null);
    setExpandedSecondLevelIndex(null);
  };

  const handleSecondLevelClick = (index) => {
    if (expandedSecondLevelIndex === index) {
      setExpandedSecondLevelIndex(null);
    } else {
      setExpandedSecondLevelIndex(index);
    }
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      if (removeFromCart) removeFromCart(productId);
    } else {
      if (updateQuantity) updateQuantity(productId, newQuantity);
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
    setIsCategoriesOpen(false);
  };

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setTimeout(() => {
        const searchInput = document.querySelector('.header__search-input');
        if (searchInput) {
          searchInput.focus();
        }
      }, 100);
    }
  };

  // Função segura para formatar preço
  const safeFormatPrice = (price) => {
    if (formatPrice) {
      return formatPrice(price);
    }
    const numPrice = typeof price === 'number' ? price : parseFloat(price) || 0;
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(numPrice);
  };

  // Categorias principais
  const mainCategories = [
    { name: 'Medicamentos', href: '/produtos?category=medicamentos' },
    { name: 'Vitaminas', href: '/produtos?category=vitaminas' },
    { name: 'Beleza', href: '/produtos?category=beleza' },
    { name: 'Higiene', href: '/produtos?category=higiene' },
    { name: 'Suplementos', href: '/produtos?category=suplementos' }
  ];

  // Estrutura de categorias SEM terceiro nível
  const categoriesData = {
    medicamentos: {
      title: '💊 Medicamentos',
      icon: '💊',
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
      icon: '🌿',
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
        }
      ]
    },
    beleza: {
      title: '💄 Beleza & Cuidados',
      icon: '💄',
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
        }
      ]
    },
    higiene: {
      title: '🧼 Higiene Pessoal',
      icon: '🧼',
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
        }
      ]
    },
    suplementos: {
      title: '💪 Suplementos',
      icon: '💪',
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
        }
      ]
    }
  };

  const currentCategory = categoriesData[activeMainCategory] || categoriesData.medicamentos;
  const selectedCategory = selectedMobileCategory ? categoriesData[selectedMobileCategory] : null;

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
      {/* ===== LAYOUT DESKTOP ===== */}
      <div className="header__desktop">
        {/* SEÇÃO SUPERIOR */}
        <div className="header__top">
          <div className="container">
            <div className="header__top-content">
              <div className="header__top-info">
                <span className="header__top-item">
                  <span className="header__top-icon">📞</span>
                  (81) 99528-4440
                </span>
                <span className="header__top-item">
                  <span className="header__top-icon">📍</span>
                  Rua das Flores, 123 - Centro
                </span>
                <span className="header__top-item">
                  <span className="header__top-icon">⏰</span>
                  Seg-Sáb: 7h-22h
                </span>
              </div>
              <div className="header__top-social">
                <a href="#" className="header__top-social-link" aria-label="Facebook">
                  📘
                </a>
                <a href="#" className="header__top-social-link" aria-label="Instagram">
                  📷
                </a>
                <a href="#" className="header__top-social-link" aria-label="WhatsApp">
                  💬
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* SEÇÃO PRINCIPAL */}
        <div className="header__main">
          <div className="container">
            <div className="header__main-content">
              {/* Logo */}
              <button
                className="header__logo"
                onClick={() => handleNavigation('/')}
              >
                <div className="header__logo-icon">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <circle cx="20" cy="20" r="18" fill="#E53935" />
                    <path d="M20 8c-3 0-5 2-5 5 0 2 1 4 3 5v8c0 1 1 2 2 2s2-1 2-2v-8c2-1 3-3 3-5 0-3-2-5-5-5z" fill="white" />
                    <circle cx="20" cy="30" r="2" fill="white" />
                  </svg>
                </div>
                <div className="header__logo-text">
                  <span className="header__logo-name">Bem Estar</span>
                  <span className="header__logo-tagline">Farmácia</span>
                </div>
              </button>

              {/* Busca Central */}
              <div className={`header__search ${isSearchOpen ? 'header__search--open' : ''}`}>
                <form className="header__search-form" onSubmit={handleSearch}>
                  <input
                    type="text"
                    placeholder="Busque por medicamentos, vitaminas, beleza..."
                    className="header__search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button type="submit" className="header__search-button">
                    <span>🔍</span>
                  </button>
                </form>
              </div>

              {/* Ações do Header */}
              <div className="header__actions">
                {/* Busca mobile */}
                <button
                  className="header__action header__action--search"
                  onClick={handleSearchToggle}
                  aria-label="Buscar"
                >
                  🔍
                </button>

                {/* Favoritos */}
                <button
                  className="header__action header__action--favorites"
                  onClick={() => handleNavigation('/favoritos')}
                  aria-label="Favoritos"
                >
                  <span className="header__action-icon">❤️</span>
                  <span className="header__action-badge">0</span>
                </button>

                {/* Carrinho */}
                <div className="header__cart">
                  <button
                    className="header__cart-button"
                    onClick={handleCartToggle}
                    aria-label={`Carrinho com ${itemCount} itens`}
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
                  {(isCartOpen || cartContextOpen) && (
                    <div className="header__cart-dropdown">
                      <div className="header__cart-header">
                        <h3>Meu Carrinho</h3>
                        <button
                          className="header__cart-close"
                          onClick={handleCartToggle}
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
                                alt={item.title || item.name}
                                className="header__cart-item-image"
                                onError={(e) => {
                                  e.target.src = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=60&h=60&fit=crop';
                                }}
                              />
                              <div className="header__cart-item-info">
                                <h4 className="header__cart-item-title">{item.title || item.name}</h4>
                                <p className="header__cart-item-price">
                                  {safeFormatPrice(item.offerPrice || item.price)}
                                </p>
                                <div className="header__cart-item-quantity">
                                  <button
                                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                    className="header__cart-quantity-btn header__cart-quantity-btn--decrease"
                                    aria-label="Diminuir quantidade"
                                  >
                                    −
                                  </button>
                                  <span className="header__cart-quantity-display">{item.quantity}</span>
                                  <button
                                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                    className="header__cart-quantity-btn header__cart-quantity-btn--increase"
                                    aria-label="Aumentar quantidade"
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                              <button
                                onClick={() => removeFromCart && removeFromCart(item.id)}
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
                            <strong>Total: {safeFormatPrice(total)}</strong>
                          </div>
                          <button
                            className="header__cart-checkout"
                            onClick={() => handleNavigation('/checkout')}
                          >
                            Finalizar Compra
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                </div>
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

                {/* Dropdown de Categorias - SEM TERCEIRO NÍVEL */}
                {isCategoriesOpen && (
                  <div className="header__categories-dropdown">
                    <div className="header__categories-content">
                      {/* COLUNA 1 - CATEGORIAS PRINCIPAIS */}
                      <div className="header__categories-main">
                        {Object.keys(categoriesData).map((categoryKey) => (
                          <button
                            key={categoryKey}
                            className={`header__main-category ${activeMainCategory === categoryKey ? 'header__main-category--active' : ''}`}
                            onMouseEnter={() => setActiveMainCategory(categoryKey)}
                            onClick={() => {
                              setActiveMainCategory(categoryKey);
                              handleNavigation(`/produtos?category=${categoryKey}`);
                            }}
                          >
                            <span className="header__main-category-icon">
                              {categoriesData[categoryKey].icon}
                            </span>
                            <span className="header__main-category-text">
                              {categoriesData[categoryKey].title.replace(/^[^\s]+ /, '')}
                            </span>
                          </button>
                        ))}
                      </div>

                      {/* COLUNA 2 - SUBCATEGORIAS SIMPLES */}
                      <div className="header__subcategories-wrapper">
                        <h3 className="header__subcategories-area-title">
                          {currentCategory.title}
                        </h3>
                        <div className="header__subcategories-grid">
                          {currentCategory.subcategories.map((subcat, index) => (
                            <div key={index} className="header__subcategory-group-simple">
                              <h4 className="header__subcategory-title-simple">
                                {subcat.title}
                              </h4>
                              <div className="header__subcategory-items">
                                {subcat.items.map((item, itemIndex) => (
                                  <button
                                    key={itemIndex}
                                    className="header__subcategory-item-link"
                                    onClick={() => {
                                      handleNavigation(`/produtos?search=${encodeURIComponent(item)}`);
                                    }}
                                  >
                                    {item}
                                  </button>
                                ))}
                              </div>
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
                            <button
                              key={index}
                              className="header__featured-product"
                              onClick={() => handleNavigation(`/produtos?search=${encodeURIComponent(product.name)}`)}
                            >
                              <img
                                src={product.image}
                                alt={product.name}
                                className="header__featured-image"
                                onError={(e) => {
                                  e.target.src = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=60&h=60&fit=crop';
                                }}
                              />
                              <div className="header__featured-info">
                                <h4 className="header__featured-name">{product.name}</h4>
                                <p className="header__featured-price">
                                  {safeFormatPrice(product.price)}
                                  <span className="header__featured-original-price">
                                    {safeFormatPrice(product.originalPrice)}
                                  </span>
                                </p>
                              </div>
                            </button>
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
                      <button
                        className="header__main-nav-link"
                        onClick={() => handleNavigation(category.href)}
                      >
                        {category.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Links Adicionais */}
              <div className="header__extra-links">
                <button
                  className="header__extra-link header__extra-link--highlight"
                  onClick={() => handleNavigation('/ofertas')}
                >
                  🔥 Ofertas
                </button>
                <button
                  className="header__extra-link"
                  onClick={() => handleNavigation('/contato')}
                >
                  Contato
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== LAYOUT MOBILE ===== */}
      <div className="header__mobile">
        {/* Linha Superior Mobile */}
        <div className="header__mobile-top">
          <div className="container">
            <div className="header__mobile-content">
              {/* Hambúrguer */}
              <button
                className="header__mobile-hamburger"
                onClick={toggleMobileMenu}
                aria-label="Menu de categorias"
              >
                <span className="header__hamburger-icon">☰</span>
              </button>

              {/* Logo Mobile */}
              <button
                className="header__mobile-logo"
                onClick={() => handleNavigation('/')}
              >
                <div className="header__mobile-logo-icon">
                  <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
                    <circle cx="20" cy="20" r="18" fill="#E53935" />
                    <path d="M20 8c-3 0-5 2-5 5 0 2 1 4 3 5v8c0 1 1 2 2 2s2-1 2-2v-8c2-1 3-3 3-5 0-3-2-5-5-5z" fill="white" />
                    <circle cx="20" cy="30" r="2" fill="white" />
                  </svg>
                </div>
                <div className="header__mobile-logo-text">
                  <span className="header__mobile-logo-name">Bem Estar</span>
                  <span className="header__mobile-logo-tagline">Farmácia</span>
                </div>
              </button>

              {/* Carrinho Mobile */}
              <div className="header__mobile-cart">
                <button
                  className="header__mobile-cart-button"
                  onClick={handleCartToggle}
                  aria-label="Abrir carrinho"
                >
                  <span className="header__mobile-cart-icon">🛒</span>
                  {itemCount > 0 && (
                    <span className="header__mobile-cart-badge">{itemCount}</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Busca Mobile */}
        <div className="header__mobile-search">
          <div className="container">
            <div className="header__mobile-search-container">
              <form className="header__mobile-search-form" onSubmit={handleSearch}>
                <input
                  type="text"
                  placeholder="Busque por medicamentos, vitaminas..."
                  className="header__mobile-search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="header__mobile-search-button">
                  <span>🔍</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay Mobile */}
      <div
        className={`header__mobile-overlay ${isMobileMenuOpen ? 'header__mobile-overlay--show' : ''}`}
        onClick={toggleMobileMenu}
      ></div>

      {/* Menu Mobile Simplificado - SEM TERCEIRO NÍVEL */}
      <div className={`header__mobile-menu ${isMobileMenuOpen ? 'header__mobile-menu--show' : ''}`}>
        <div className="header__mobile-menu-header">
          {mobileMenuView === 'main' ? (
            <>
              <div className="header__mobile-menu-spacer"></div>
              <h3 className="header__mobile-menu-title">
                <span className="header__mobile-title-icon">📂</span>
                Categorias
              </h3>
              <button
                className="header__mobile-menu-close"
                onClick={toggleMobileMenu}
                aria-label="Fechar menu"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </>
          ) : (
            <>
              <button
                className="header__mobile-back-button"
                onClick={handleMobileBackToMain}
                aria-label="Voltar para categorias"
              >
                <span className="header__mobile-back-icon">←</span>
                <span className="header__mobile-back-text">Voltar</span>
              </button>
              <h3 className="header__mobile-menu-title">
                <span className="header__mobile-title-icon">{selectedCategory?.icon}</span>
                {selectedCategory?.title?.replace(/^[^\s]+ /, '')}
              </h3>
              <button
                className="header__mobile-menu-close"
                onClick={toggleMobileMenu}
                aria-label="Fechar menu"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </>
          )}
        </div>

        <div className="header__mobile-content-area">
          {mobileMenuView === 'main' ? (
            /* VIEW PRINCIPAL - CATEGORIAS PRINCIPAIS */
            <div className="header__mobile-main-categories">
              {Object.keys(categoriesData).map((categoryKey) => (
                <button
                  key={categoryKey}
                  className="header__mobile-main-category"
                  onClick={() => handleMobileCategoryClick(categoryKey)}
                >
                  <div className="header__mobile-category-info">
                    <span className="header__mobile-category-icon">
                      {categoriesData[categoryKey].icon}
                    </span>
                    <span className="header__mobile-category-name">
                      {categoriesData[categoryKey].title.replace(/^[^\s]+ /, '')}
                    </span>
                  </div>
                  <span className="header__mobile-category-arrow">→</span>
                </button>
              ))}
            </div>
          ) : (
            /* VIEW SUBCATEGORIAS SIMPLIFICADAS */
            <div className="header__mobile-subcategories">
              {selectedCategory?.subcategories.map((subcat, subcatIndex) => (
                <div key={subcatIndex} className="header__mobile-subcategory-group">
                  <button
                    className={`header__mobile-subcategory-header ${expandedSecondLevelIndex === subcatIndex ? 'header__mobile-subcategory-header--expanded' : ''}`}
                    onClick={() => handleSecondLevelClick(subcatIndex)}
                  >
                    <div className="header__mobile-subcategory-info">
                      <span className="header__mobile-subcategory-icon">📋</span>
                      <span className="header__mobile-subcategory-title">{subcat.title}</span>
                    </div>
                    <span className={`header__mobile-subcategory-toggle ${expandedSecondLevelIndex === subcatIndex ? 'header__mobile-subcategory-toggle--expanded' : ''}`}>
                      ▼
                    </span>
                  </button>

                  {expandedSecondLevelIndex === subcatIndex && (
                    <div className="header__mobile-subcategory-items">
                      {subcat.items.map((item, itemIndex) => (
                        <button
                          key={itemIndex}
                          className="header__mobile-subcategory-item-link"
                          onClick={() => {
                            handleNavigation(`/produtos?search=${encodeURIComponent(item)}`);
                          }}
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Botão Ver Todos */}
              <div className="header__mobile-view-all">
                <button
                  className="header__mobile-view-all-button"
                  onClick={() => {
                    handleNavigation(`/produtos?category=${selectedMobileCategory}`);
                  }}
                >
                  <span className="header__mobile-view-all-icon">🛍️</span>
                  <div className="header__mobile-view-all-content">
                    <span className="header__mobile-view-all-title">
                      Ver Todos
                    </span>
                    <span className="header__mobile-view-all-subtitle">
                      {selectedCategory?.title?.replace(/^[^\s]+ /, '')}
                    </span>
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;