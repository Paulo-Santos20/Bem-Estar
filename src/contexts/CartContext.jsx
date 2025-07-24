import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Estado inicial do carrinho
const initialState = {
  items: [],
  total: 0,
  itemCount: 0
};

// Ações do carrinho
const cartActions = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  LOAD_CART: 'LOAD_CART'
};

// Reducer do carrinho
const cartReducer = (state, action) => {
  switch (action.type) {
    case cartActions.ADD_ITEM: {
      const { product } = action.payload;
      const existingItem = state.items.find(item => item.id === product.id);

      let newItems;
      if (existingItem) {
        // Se o item já existe, aumenta a quantidade
        newItems = state.items.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Se é um novo item, adiciona com quantidade 1
        newItems = [...state.items, { ...product, quantity: 1 }];
      }

      const newTotal = newItems.reduce((sum, item) => sum + (item.offerPrice * item.quantity), 0);
      const newItemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

      return {
        ...state,
        items: newItems,
        total: newTotal,
        itemCount: newItemCount
      };
    }

    case cartActions.REMOVE_ITEM: {
      const { productId } = action.payload;
      const newItems = state.items.filter(item => item.id !== productId);
      const newTotal = newItems.reduce((sum, item) => sum + (item.offerPrice * item.quantity), 0);
      const newItemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

      return {
        ...state,
        items: newItems,
        total: newTotal,
        itemCount: newItemCount
      };
    }

    case cartActions.UPDATE_QUANTITY: {
      const { productId, quantity } = action.payload;
      
      if (quantity <= 0) {
        return cartReducer(state, { 
          type: cartActions.REMOVE_ITEM, 
          payload: { productId } 
        });
      }

      const newItems = state.items.map(item =>
        item.id === productId ? { ...item, quantity } : item
      );
      const newTotal = newItems.reduce((sum, item) => sum + (item.offerPrice * item.quantity), 0);
      const newItemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

      return {
        ...state,
        items: newItems,
        total: newTotal,
        itemCount: newItemCount
      };
    }

    case cartActions.CLEAR_CART:
      return initialState;

    case cartActions.LOAD_CART:
      return action.payload;

    default:
      return state;
  }
};

// Criar contexto
const CartContext = createContext();

// Provider do carrinho
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Carregar carrinho do localStorage na inicialização
  useEffect(() => {
    const savedCart = localStorage.getItem('bem-estar-cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: cartActions.LOAD_CART, payload: parsedCart });
      } catch (error) {
        console.error('Erro ao carregar carrinho do localStorage:', error);
      }
    }
  }, []);

  // Salvar carrinho no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem('bem-estar-cart', JSON.stringify(state));
  }, [state]);

  // Ações do carrinho
  const addToCart = (product) => {
    dispatch({ 
      type: cartActions.ADD_ITEM, 
      payload: { product } 
    });
  };

  const removeFromCart = (productId) => {
    dispatch({ 
      type: cartActions.REMOVE_ITEM, 
      payload: { productId } 
    });
  };

  const updateQuantity = (productId, quantity) => {
    dispatch({ 
      type: cartActions.UPDATE_QUANTITY, 
      payload: { productId, quantity } 
    });
  };

  const clearCart = () => {
    dispatch({ type: cartActions.CLEAR_CART });
  };

  const getItemQuantity = (productId) => {
    const item = state.items.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  const isInCart = (productId) => {
    return state.items.some(item => item.id === productId);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  const value = {
    // Estado
    items: state.items,
    total: state.total,
    itemCount: state.itemCount,
    
    // Ações
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    
    // Utilitários
    getItemQuantity,
    isInCart,
    formatPrice
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Hook para usar o contexto
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
};

export default CartContext;