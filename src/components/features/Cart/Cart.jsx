import React from 'react';
import { useCart } from '../../../contexts/CartContext';
import Button from '../../ui/Button/Button';
import './Cart.css';

const Cart = () => {
  const { 
    items, 
    isOpen, 
    removeItem, 
    updateQuantity, 
    clearCart, 
    toggleCart, 
    getTotalPrice,
    getTotalItems 
  } = useCart();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeItem(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = () => {
    // Implementar lógica de checkout
    alert('Redirecionando para o checkout...');
    console.log('Items do carrinho:', items);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="cart-overlay" onClick={toggleCart}></div>
      
      {/* Carrinho */}
      <div className="cart">
        <div className="cart__header">
          <h3 className="cart__title">
            <span className="cart__icon">🛒</span>
            Meu Carrinho
            {getTotalItems() > 0 && (
              <span className="cart__count">({getTotalItems()})</span>
            )}
          </h3>
          <button 
            className="cart__close"
            onClick={toggleCart}
            aria-label="Fechar carrinho"
          >
            ✕
          </button>
        </div>

        <div className="cart__content">
          {items.length === 0 ? (
            <div className="cart__empty">
              <div className="cart__empty-icon">🛒</div>
              <h4>Seu carrinho está vazio</h4>
              <p>Adicione produtos para começar suas compras</p>
              <Button 
                variant="primary" 
                onClick={toggleCart}
                className="cart__continue-shopping"
              >
                Continuar Comprando
              </Button>
            </div>
          ) : (
            <>
              <div className="cart__items">
                {items.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item__image">
                      <img 
                        src={item.image || '/placeholder-product.jpg'} 
                        alt={item.name}
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjRjhGOUZBIi8+CjxwYXRoIGQ9Ik0zMCAyNUM0MS4wNDU3IDI1IDUwIDMzLjk1NDMgNTAgNDVDNTAgNTYuMDQ1NyA0MS4wNDU3IDY1IDMwIDY1QzE4Ljk1NDMgNjUgMTAgNTYuMDQ1NyAxMCA0NUMxMCAzMy45NTQzIDE4Ljk1NDMgMjUgMzAgMjVaIiBmaWxsPSIjRTUzOTM1Ii8+CjxwYXRoIGQ9Ik0zNS41IDM3LjVIMjQuNVYzOS41SDM1LjVWMzcuNVoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0zMS41IDMzLjVIMjguNVY1My41SDMxLjVWMzMuNVoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=';
                        }}
                      />
                    </div>
                    
                    <div className="cart-item__details">
                      <h4 className="cart-item__name">{item.name}</h4>
                      <p className="cart-item__description">{item.description}</p>
                      <div className="cart-item__price">
                        {formatPrice(item.price)}
                      </div>
                    </div>

                    <div className="cart-item__controls">
                      <div className="cart-item__quantity">
                        <button
                          className="cart-item__quantity-btn"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          aria-label="Diminuir quantidade"
                        >
                          −
                        </button>
                        <span className="cart-item__quantity-value">
                          {item.quantity}
                        </span>
                        <button
                          className="cart-item__quantity-btn"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          aria-label="Aumentar quantidade"
                        >
                          +
                        </button>
                      </div>
                      
                      <div className="cart-item__total">
                        {formatPrice(item.price * item.quantity)}
                      </div>
                      
                      <button
                        className="cart-item__remove"
                        onClick={() => removeItem(item.id)}
                        aria-label="Remover item"
                        title="Remover item"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart__footer">
                <div className="cart__summary">
                  <div className="cart__total">
                    <span className="cart__total-label">Total:</span>
                    <span className="cart__total-value">
                      {formatPrice(getTotalPrice())}
                    </span>
                  </div>
                  
                  <div className="cart__shipping-info">
                    <span className="cart__shipping-icon">🚚</span>
                    <span>Frete grátis para compras acima de R\$ 50,00</span>
                  </div>
                </div>

                <div className="cart__actions">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={clearCart}
                    className="cart__clear"
                  >
                    Limpar Carrinho
                  </Button>
                  
                  <Button 
                    variant="primary" 
                    size="lg"
                    onClick={handleCheckout}
                    className="cart__checkout"
                    icon={<span>💳</span>}
                  >
                    Finalizar Compra
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;