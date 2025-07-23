import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from '../../ui/Button/Button';
import SearchBar from '../../ui/SearchBar/SearchBar';
import CategoryDropdown from '../../ui/CategoryDropdown/CategoryDropdown';
import { useCart } from '../../../contexts/CartContext';
import { categories, mainCategories, getCategoryById } from '../../../data/categories';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { getTotalItems, toggleCart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsCategoriesOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleCategories = () => {
    setIsCategoriesOpen(!isCategoriesOpen);
  };

  const handleSearch = (searchTerm) => {
    console.log('Buscando por:', searchTerm);
    // Aqui você pode implementar a lógica de busca
    // Por exemplo, redirecionar para uma página de resultados
    // navigate(`/produtos?busca=${encodeURIComponent(searchTerm)}`);
  };

  const handleCategoryClick = (categoryId) => {
    console.log('Navegando para categoria:', categoryId);
    // Implementar navegação para categoria
    // navigate(`/categoria/${categoryId}`);
  };

  const totalItems = getTotalItems();

  // Obter as 4 categorias principais
  const displayCategories = mainCategories.map(id => getCategoryById(id)).filter(Boolean);

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
      {/* Parte Superior - Logo, Busca e Ações */}
      <div className="header__top">
        <div className="container">
          <div className="header__top-content">
            {/* Logo */}
            <Link to="/" className="header__logo">
              <div className="header__logo-icon">
                <span className="header__logo-leaf">🍃</span>
              </div>
              <div className="header__logo-text">
                <span className="header__logo-name">Bem Estar</span>
                <span className="header__logo-subtitle">Farmácia</span>
              </div>
            </Link>

            {/* Search Bar */}
            <div className="header__search">
              <SearchBar 
                onSearch={handleSearch}
                placeholder="Buscar medicamentos, produtos..."
              />
            </div>

            {/* Header Actions */}
            <div className="header__actions">
              <div className="header__contact">
                <a href="tel:+5511999999999" className="header__contact-item">
                  <span className="header__contact-icon">📞</span>
                  <div className="header__contact-info">
                    <span className="header__contact-label">Ligue grátis</span>
                    <span className="header__contact-number">(11) 99999-9999</span>
                  </div>
                </a>
              </div>

              <div className="header__action-buttons">
                <Button 
                  variant="ghost" 
                  size="md"
                  icon={<span>❤️</span>}
                  className="header__action-btn header__wishlist"
                  title="Lista de Desejos"
                >
                  <div className="header__action-content">
                    <span className="header__action-label">Meus</span>
                    <span className="header__action-text">Favoritos</span>
                  </div>
                </Button>

                <Button 
                  variant="primary" 
                  size="md"
                  icon={<span>🛒</span>}
                  className="header__action-btn header__cart"
                  onClick={toggleCart}
                  title="Abrir carrinho"
                >
                  <div className="header__action-content">
                    <span className="header__action-label">Meu</span>
                    <span className="header__action-text">Carrinho</span>
                  </div>
                  {totalItems > 0 && (
                    <span className="header__cart-count">{totalItems}</span>
                  )}
                </Button>
              </div>

              {/* Mobile Menu Button */}
              <button 
                className={`header__menu-toggle ${isMenuOpen ? 'header__menu-toggle--active' : ''}`}
                onClick={toggleMenu}
                aria-label="Toggle menu"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Parte Inferior - Categorias */}
      <div className="header__bottom">
        <div className="container">
          <div className="header__bottom-content">
            {/* Todas as Categorias */}
            <button 
              className="header__all-categories"
              onClick={toggleCategories}
            >
              <span className="header__all-categories-icon">☰</span>
              <span className="header__all-categories-text">Todas as Categorias</span>
              <span className="header__all-categories-arrow">▼</span>
            </button>

            {/* Categorias Principais */}
            <nav className="header__main-categories">
              {displayCategories.map((category) => (
                <button
                  key={category.id}
                  className="header__main-category"
                  onClick={() => handleCategoryClick(category.id)}
                >
                  <span className="header__main-category-name">{category.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav className={`header__mobile-nav ${isMenuOpen ? 'header__mobile-nav--open' : ''}`}>
        {/* Search Bar Mobile */}
        <div className="header__mobile-search">
          <SearchBar 
            onSearch={handleSearch}
            placeholder="Buscar produtos..."
            className="header__mobile-search-bar"
          />
        </div>

        {/* Categories Mobile */}
        <div className="header__mobile-categories">
          <button 
            className="header__mobile-categories-toggle"
            onClick={toggleCategories}
          >
            <span className="header__all-categories-icon">☰</span>
            <span>Todas as Categorias</span>
          </button>
        </div>

        {/* Quick Categories Mobile */}
        <div className="header__mobile-quick-categories">
          <h4>Categorias Principais</h4>
          <div className="header__mobile-categories-grid">
            {displayCategories.map((category) => (
              <button
                key={category.id}
                className="header__mobile-category-item"
                onClick={() => handleCategoryClick(category.id)}
              >
                <span className="header__mobile-category-name">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
        
        <div className="header__mobile-actions">
          <a href="tel:+5511999999999" className="header__mobile-contact">
            <span className="header__contact-icon">📞</span>
            <span>(11) 99999-9999</span>
          </a>
          
          <a href="https://wa.me/5511999999999" className="header__mobile-contact">
            <span className="header__contact-icon">💬</span>
            <span>WhatsApp</span>
          </a>

          <div className="header__mobile-buttons">
            <Button variant="outline" size="sm" icon={<span>❤️</span>}>
              Favoritos
            </Button>
            <Button 
              variant="primary" 
              size="sm" 
              icon={<span>🛒</span>}
              onClick={toggleCart}
            >
              Carrinho ({totalItems})
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="header__overlay" 
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}

      {/* Category Dropdown */}
      <CategoryDropdown 
        isOpen={isCategoriesOpen}
        onClose={() => setIsCategoriesOpen(false)}
      />
    </header>
  );
};

export default Header;