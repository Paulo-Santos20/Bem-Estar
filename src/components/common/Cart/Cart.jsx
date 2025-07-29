import React, { useEffect } from 'react';
import { useCart } from '../../../contexts/CartContext';
import './Cart.css';

const Cart = () => {
  const {
    cartItems,
    isCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    closeCart,
    getCartTotal,
    getCartItemsCount,
    formatPrice
  } = useCart();

  // Fechar carrinho com ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape' && isCartOpen) {
        closeCart();
      }
    };

    if (isCartOpen) {
      document.addEventListener('keydown', handleEsc);
      // Prevenir scroll do body quando carrinho estiver aberto
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isCartOpen, closeCart]);

  // Handler para clique no overlay (fechar carrinho)
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeCart();
    }
  };

  // Prevenir propagação de cliques dentro do carrinho
  const handleCartClick = (e) => {
    e.stopPropagation();
  };

  const handleIncreaseQuantity = (item) => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const handleDecreaseQuantity = (item) => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    } else {
      removeFromCart(item.id);
    }
  };

  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
  };

  const handleCheckout = () => {
    // Implementar checkout
    console.log('Finalizar compra');
    alert('Funcionalidade de checkout será implementada em breve!');
  };

  if (!isCartOpen) return null;

  return (
    <div className="cart-overlay" onClick={handleOverlayClick}>
      <div className="cart-sidebar" onClick={handleCartClick}>
        {/* Header do carrinho */}
        <div className="cart-header">
          <h2 className="cart-title">
            Carrinho ({getCartItemsCount()})
          </h2>
          <button 
            className="cart-close-btn"
            onClick={closeCart}
            aria-label="Fechar carrinho"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Conteúdo do carrinho */}
        <div className="cart-content">
          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty-icon">🛒</div>
              <h3>Seu carrinho está vazio</h3>
              <p>Adicione produtos para começar suas compras</p>
              <button className="cart-continue-btn" onClick={closeCart}>
                Continuar Comprando
              </button>
            </div>
          ) : (
            <>
              {/* Lista de itens */}
              <div className="cart-items">
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-image">
                      <img
                        src={item.image}
                        alt={item.title}
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=80&h=80&fit=crop';
                        }}
                      />
                    </div>

                    <div className="cart-item-details">
                      <h4 className="cart-item-title">{item.title}</h4>
                      <div className="cart-item-price">
                        {formatPrice(item.offerPrice || item.price)}
                      </div>

                      <div className="cart-item-controls">
                        <div className="quantity-controls">
                          <button
                            className="quantity-btn quantity-btn--decrease"
                            onClick={() => handleDecreaseQuantity(item)}
                            aria-label="Diminuir quantidade"
                          >
                            −
                          </button>
                          <span className="quantity-display">{item.quantity}</span>
                          <button
                            className="quantity-btn quantity-btn--increase"
                            onClick={() => handleIncreaseQuantity(item)}
                            aria-label="Aumentar quantidade"
                          >
                            +
                          </button>
                        </div>

                        <button
                          className="remove-item-btn"
                          onClick={() => handleRemoveItem(item.id)}
                          aria-label="Remover item"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                            <path d="M10 11v6M14 11v6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          </svg>
                        </button>
                      </div>
                    </div>

                    <div className="cart-item-total">
                      {formatPrice((item.offerPrice || item.price) * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer do carrinho */}
              <div className="cart-footer">
                <div className="cart-summary">
                  <div className="cart-total">
                    <span className="cart-total-label">Total:</span>
                    <span className="cart-total-value">{formatPrice(getCartTotal())}</span>
                  </div>
                </div>

                <div className="cart-actions">
                  <button 
                    className="cart-clear-btn"
                    onClick={clearCart}
                  >
                    Limpar Carrinho
                  </button>
                  <button 
                    className="cart-checkout-btn"
                    onClick={handleCheckout}
                  >
                    Finalizar Compra
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;