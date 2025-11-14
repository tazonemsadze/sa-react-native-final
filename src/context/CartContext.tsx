import React, { createContext, useContext, useEffect, useState } from "react";
import { CartItem } from "../types";
import { getCart, saveCart } from "../services/storage";

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: any, quantity: number) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  updateQuantity: (productId: number, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  getTotalItems: () => number;
  getTotalPrice: () => string;
  loadCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart on mount
  useEffect(() => {
    loadCartData();
  }, []);

  const loadCartData = async () => {
    try {
      const cartData = await getCart();
      setCart(cartData);
    } catch (error) {
      console.error("Error loading cart:", error);
    }
  };

  const loadCart = async () => {
    await loadCartData();
  };

  const addToCart = async (product: any, quantity: number = 1) => {
    try {
      const existingItemIndex = cart.findIndex(
        (item) => item.product.id === product.id
      );

      let updatedCart;
      if (existingItemIndex !== -1) {
        updatedCart = [...cart];
        updatedCart[existingItemIndex].quantity += quantity;
      } else {
        const cartItem: CartItem = { product, quantity };
        updatedCart = [...cart, cartItem];
      }

      setCart(updatedCart);
      await saveCart(updatedCart);
    } catch (error) {
      console.error("Error adding to cart:", error);
      throw error;
    }
  };

  const removeFromCart = async (productId: number) => {
    try {
      const updatedCart = cart.filter(
        (item) => item.product.id !== productId
      );
      setCart(updatedCart);
      await saveCart(updatedCart);
    } catch (error) {
      console.error("Error removing from cart:", error);
      throw error;
    }
  };

  const updateQuantity = async (productId: number, quantity: number) => {
    try {
      if (quantity <= 0) {
        await removeFromCart(productId);
        return;
      }

      const updatedCart = cart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      );

      setCart(updatedCart);
      await saveCart(updatedCart);
    } catch (error) {
      console.error("Error updating quantity:", error);
      throw error;
    }
  };

  const clearCartData = async () => {
    try {
      setCart([]);
      await saveCart([]);
    } catch (error) {
      console.error("Error clearing cart:", error);
      throw error;
    }
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart
      .reduce((total, item) => total + item.product.price * item.quantity, 0)
      .toFixed(2);
  };

  const value: CartContextType = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart: clearCartData,
    getTotalItems,
    getTotalPrice,
    loadCart,
  };

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};
