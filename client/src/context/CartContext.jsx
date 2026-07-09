import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';

const CartContext = createContext(null);

const initialState = {
  items: [],
};

const isPurchasableProduct = (product) => product?.category !== 'Online Training';

const readCart = () => {
  try {
    const stored = localStorage.getItem('robotics_cart');
    return stored ? JSON.parse(stored) : initialState;
  } catch {
    return initialState;
  }
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const product = action.payload;
      if (!isPurchasableProduct(product)) {
        return state;
      }
      const existing = state.items.find((item) => item.id === product.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      }
      return { ...state, items: [...state.items, { ...product, quantity: 1 }] };
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter((item) => item.id !== action.payload) };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: Math.max(1, Number(action.payload.quantity) || 1) }
              : item
          )
          .filter((item) => item.quantity > 0),
      };
    case 'CLEAR_CART':
      return initialState;
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, readCart);

  useEffect(() => {
    localStorage.setItem('robotics_cart', JSON.stringify(state));
  }, [state]);

  const addToCart = (product) => dispatch({ type: 'ADD_ITEM', payload: product });
  const removeFromCart = (id) => dispatch({ type: 'REMOVE_ITEM', payload: id });
  const updateQuantity = (id, quantity) => dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  const purchasableItems = state.items.filter(isPurchasableProduct);
  const subtotal = purchasableItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = purchasableItems.reduce((sum, item) => sum + item.quantity, 0);

  const value = useMemo(
    () => ({ items: purchasableItems, subtotal, itemCount, addToCart, removeFromCart, updateQuantity, clearCart }),
    [purchasableItems, subtotal, itemCount]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
