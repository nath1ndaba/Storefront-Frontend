import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Cart } from '../types';
import { Client } from '../services/storefront-client';
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
  const client = new Client();

  const refreshCart = async () => {
    try {
      const sessionId = getSessionId();
      const response = await client.getCart(sessionId);
      if (response.success && response.data) {
        setCart(response.data);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const addToCart = async (productId: number, quantity: number) => {
    setLoading(true);
    try {
      const sessionId = getSessionId();
      const response = await client.addToCart({
        sessionId,
        productId,
        quantity,
      });
      if (response.success && response.data) {
        setCart(response.data);
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
      await client.updateCartItem(itemId, { quantity });
      await refreshCart();
    } catch (error) {
      console.error('Error updating cart item:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (itemId: number) => {
    setLoading(true);
    try {
      await client.removeFromCart(itemId);
      await refreshCart();
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
      await client.clearCart(sessionId);
      setCart(null);
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