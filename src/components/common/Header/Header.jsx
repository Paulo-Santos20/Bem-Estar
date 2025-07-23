import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from '../../ui/Button/Button';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { path: '/', label: 'Início' },
    { path: '/produtos', label: 'Produtos' },
    { path: '/servicos', label: 'Serviços' },
    { path: '/sobre', label: 'Sobre Nós' },
    { path: '/blog', label: 'Blog' },
    { path: '/contato', label: 'Contato' }
  ];

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
      <div className="container">
        <div className="header__content">
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

          {/* Navigation Desktop */}
          <nav className="header__nav">
            <ul className="header__nav-list">
              {navItems.map((item) => (
                <li key={item.path} className="header__nav-item">
                  <Link 
                    to={item.path} 
                    className={`header__nav-link ${location.pathname === item.path ? 'header__nav-link--active' : ''}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Header Actions */}
          <div className="header__actions">
            <div className="header__contact">
              <a href="tel:+5511999999999" className="header__contact-item">
                <span className="header__contact-icon">📞</span>
                <span className="header__contact-text">(11) 99999-9999</span>
              </a>
            </div>

            <Button 
              variant="primary" 
              size="sm"
              icon={<span>🛒</span>}
              className="header__cta"
            >
              Comprar Agora
            </Button>

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

        {/* Mobile Navigation */}
        <nav className={`header__mobile-nav ${isMenuOpen ? 'header__mobile-nav--open' : ''}`}>
          <ul className="header__mobile-nav-list">
            {navItems.map((item) => (
              <li key={item.path} className="header__mobile-nav-item">
                <Link 
                  to={item.path} 
                  className={`header__mobile-nav-link ${location.pathname === item.path ? 'header__mobile-nav-link--active' : ''}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          
          <div className="header__mobile-actions">
            <a href="tel:+5511999999999" className="header__mobile-contact">
              <span className="header__contact-icon">📞</span>
              <span>(11) 99999-9999</span>
            </a>
            
            <a href="https://wa.me/5511999999999" className="header__mobile-contact">
              <span className="header__contact-icon">💬</span>
              <span>WhatsApp</span>
            </a>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="header__overlay" 
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </header>
  );
};

export default Header;