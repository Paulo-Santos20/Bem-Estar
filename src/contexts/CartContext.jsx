// src/contexts/CartContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    // Retornar valores padrão ao invés de erro
    return {
      cartItems: [],
      isCartOpen: false,
      addToCart: () => {},
      removeFromCart: () => {},
      updateQuantity: () => {},
      clearCart: () => {},
      toggleCart: () => {},
      openCart: () => {},
      closeCart: () => {},
      getCartTotal: () => 0,
      getCartItemsCount: () => 0,
      formatPrice: (price) => `R\$ ${price?.toFixed(2) || '0,00'}`
    };
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Carregar carrinho do localStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        // Verificar se é um array válido
        if (Array.isArray(parsedCart)) {
          setCartItems(parsedCart);
        }
      }
    } catch (error) {
      console.error('Erro ao carregar carrinho:', error);
      setCartItems([]); // Garantir que seja um array
    }
  }, []);

  // Salvar carrinho no localStorage
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Erro ao salvar carrinho:', error);
    }
  }, [cartItems]);

  // Adicionar item ao carrinho
  const addToCart = (product) => {
    if (!product || !product.id) {
      console.error('Produto inválido:', product);
      return;
    }

    setCartItems(prevItems => {
      // Garantir que prevItems seja um array
      const items = Array.isArray(prevItems) ? prevItems : [];
      const existingItem = items.find(item => item.id === product.id);
      
      if (existingItem) {
        return items.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item
        );
      }
      
      return [...items, { ...product, quantity: product.quantity || 1 }];
    });
  };

  // Remover item do carrinho
  const removeFromCart = (productId) => {
    setCartItems(prevItems => {
      const items = Array.isArray(prevItems) ? prevItems : [];
      return items.filter(item => item.id !== productId);
    });
  };

  // Atualizar quantidade
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prevItems => {
      const items = Array.isArray(prevItems) ? prevItems : [];
      return items.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      );
    });
  };

  // Limpar carrinho
  const clearCart = () => {
    setCartItems([]);
  };

  // Abrir/fechar carrinho
  const toggleCart = () => {
    setIsCartOpen(prev => !prev);
  };

  const openCart = () => {
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  // Calcular total
  const getCartTotal = () => {
    const items = Array.isArray(cartItems) ? cartItems : [];
    return items.reduce((total, item) => {
      const price = item.offerPrice || item.price || 0;
      const quantity = item.quantity || 0;
      return total + (price * quantity);
    }, 0);
  };

  // Calcular quantidade total
  const getCartItemsCount = () => {
    const items = Array.isArray(cartItems) ? cartItems : [];
    return items.reduce((total, item) => total + (item.quantity || 0), 0);
  };

  // Formatar preço
  const formatPrice = (price) => {
    const numPrice = typeof price === 'number' ? price : parseFloat(price) || 0;
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(numPrice);
  };

  const value = {
    cartItems: Array.isArray(cartItems) ? cartItems : [], // Garantir que seja array
    isCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleCart,
    openCart,
    closeCart,
    getCartTotal,
    getCartItemsCount,
    formatPrice
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};