import React, { useState } from 'react';
import { useCart } from '../../../contexts/CartContext';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { items, itemCount, total, formatPrice, removeFromCart, updateQuantity } = useCart();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__content">
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

          {/* Navegação Desktop */}
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li><a href="#home" className="header__nav-link">Início</a></li>
              <li><a href="#produtos" className="header__nav-link">Produtos</a></li>
              <li><a href="#servicos" className="header__nav-link">Serviços</a></li>
              <li><a href="#sobre" className="header__nav-link">Sobre</a></li>
              <li><a href="#contato" className="header__nav-link">Contato</a></li>
            </ul>
          </nav>

          {/* Ações do Header */}
          <div className="header__actions">
            {/* Busca */}
            <div className="header__search">
              <input 
                type="text" 
                placeholder="Buscar produtos..."
                className="header__search-input"
              />
              <button className="header__search-button">
                <span>🔍</span>
              </button>
            </div>

            {/* Carrinho */}
            <div className="header__cart">
              <button 
                className="header__cart-button"
                onClick={toggleCart}
              >
                <span className="header__cart-icon">🛒</span>
                {itemCount > 0 && (
                  <span className="header__cart-count">{itemCount}</span>
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
                              >
                                -
                              </button>
                              <span>{item.quantity}</span>
                              <button 
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                className="header__cart-quantity-btn"
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="header__cart-item-remove"
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
            <button className="header__favorites">
              <span>♡</span>
            </button>

            {/* Menu Mobile */}
            <button 
              className="header__menu-toggle"
              onClick={toggleMenu}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>

        {/* Menu Mobile */}
        {isMenuOpen && (
          <nav className="header__mobile-nav">
            <ul className="header__mobile-nav-list">
              <li><a href="#home" onClick={toggleMenu}>Início</a></li>
              <li><a href="#produtos" onClick={toggleMenu}>Produtos</a></li>
              <li><a href="#servicos" onClick={toggleMenu}>Serviços</a></li>
              <li><a href="#sobre" onClick={toggleMenu}>Sobre</a></li>
              <li><a href="#contato" onClick={toggleMenu}>Contato</a></li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;