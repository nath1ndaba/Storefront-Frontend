import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Cart } from '../types';
import { getSessionId } from '../utils/sessionId';

interface CartContextType {
  cart: Cart | null;
  loading: boolean;
  addToCart: (productId: number, quantity: number) => Promise<void>;
  updateCartItem: (itemId: number, quantity: number) => Promise<void>;
  removeFromCart: (itemId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(false);

  const refreshCart = async () => {
    try {
      const sessionId = getSessionId();
      const response = await fetch(`https://storefrontapi.onrender.com/api/cart?sessionId=${sessionId}`);
      
      if (response.ok) {
        const text = await response.text();
        const data = JSON.parse(text);
        
        // Handle both Data (C# style) and data (JS style)
        const cartData = data.Data || data.data || data;
        console.log('Cart data:', cartData);
        setCart(cartData);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const addToCart = async (productId: number, quantity: number) => {
    setLoading(true);
    try {
      const sessionId = getSessionId();
      const response = await fetch('https://storefrontapi.onrender.com/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          SessionId: sessionId,
          ProductId: productId,
          Quantity: quantity,
        }),
      });

      if (response.ok) {
        const text = await response.text();
        const data = JSON.parse(text);
        const cartData = data.Data || data.data || data;
        setCart(cartData);
        console.log('Added to cart:', cartData);
      } else {
        console.error('Failed to add to cart:', response.status);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateCartItem = async (itemId: number, quantity: number) => {
    setLoading(true);
    try {
      const response = await fetch(`https://storefrontapi.onrender.com/api/cart/${itemId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Quantity: quantity }),
      });

      if (response.ok) {
        await refreshCart();
      } else {
        console.error('Update failed with status:', response.status);
        const errorText = await response.text();
        console.error('Error response:', errorText);
      }
    } catch (error) {
      console.error('Error updating cart item:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (itemId: number) => {
    setLoading(true);
    try {
      const response = await fetch(`https://storefrontapi.onrender.com/api/cart/${itemId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await refreshCart();
      } else {
        console.error('Remove failed with status:', response.status);
        const errorText = await response.text();
        console.error('Error response:', errorText);
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    setLoading(true);
    try {
      const sessionId = getSessionId();
      const response = await fetch(`https://storefrontapi.onrender.com/api/cart?sessionId=${sessionId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setCart(null);
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshCart();
  }, []);

  return (
    <CartContext.Provider
      value={{ cart, loading, addToCart, updateCartItem, removeFromCart, clearCart, refreshCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};