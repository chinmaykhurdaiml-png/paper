import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '../types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  shippingFee: number;
  freeShippingThreshold: number;
  discountCode: string | null;
  discountAmount: number;
  applyDiscount: (code: string) => { success: boolean; message: string };
  removeDiscount: () => void;
  total: number;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  toast: { message: string; type: 'success' | 'info' | 'error' } | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  closeToast: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD = 499;
const STANDARD_SHIPPING = 50;

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('papernest_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('papernest_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [discountCode, setDiscountCode] = useState<string | null>(() => {
    try {
      return localStorage.getItem('papernest_discount_code') || null;
    } catch {
      return null;
    }
  });

  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error' } | null>(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('papernest_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  // Sync wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('papernest_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed to save wishlist to localStorage', e);
    }
  }, [wishlist]);

  // Sync discount to localStorage
  useEffect(() => {
    try {
      if (discountCode) {
        localStorage.setItem('papernest_discount_code', discountCode);
      } else {
        localStorage.removeItem('papernest_discount_code');
      }
    } catch (e) {
      console.error('Failed to save discount code', e);
    }
  }, [discountCode]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToast({ message, type });
  };

  const closeToast = () => {
    setToast(null);
  };

  // Auto-dismiss toast
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => {
        setToast(null);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added "${product.name}" to your cart!`, 'success');
  };

  const removeFromCart = (productId: string) => {
    const item = cart.find((i) => i.product.id === productId);
    setCart((prev) => prev.filter((i) => i.product.id !== productId));
    if (item) {
      showToast(`Removed "${item.product.name}" from your cart`, 'info');
    }
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    showToast('Your cart has been cleared', 'info');
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        showToast('Removed from your saved items', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to your wishlist!', 'success');
        return [...prev, productId];
      }
    });
  };

  const isWishlisted = (productId: string) => {
    return wishlist.includes(productId);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  let discountAmount = 0;
  if (discountCode === 'NEST10') {
    discountAmount = Math.round(subtotal * 0.1); // 10% off
  } else if (discountCode === 'WELCOME50') {
    discountAmount = Math.min(50, subtotal);
  }

  const shippingFee =
    cart.length === 0 ? 0 : subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING;

  const total = Math.max(0, subtotal - discountAmount + shippingFee);

  const applyDiscount = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'NEST10') {
      setDiscountCode('NEST10');
      showToast('Promo code NEST10 applied! 10% discount added.', 'success');
      return { success: true, message: '10% discount applied successfully!' };
    } else if (clean === 'WELCOME50') {
      setDiscountCode('WELCOME50');
      showToast('Promo code WELCOME50 applied! ₹50 discount added.', 'success');
      return { success: true, message: '₹50 welcome discount applied!' };
    } else {
      showToast('Invalid coupon code. Try NEST10', 'error');
      return { success: false, message: 'Invalid promo code. Please check and try again.' };
    }
  };

  const removeDiscount = () => {
    setDiscountCode(null);
    showToast('Discount code removed', 'info');
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        shippingFee,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        discountCode,
        discountAmount,
        applyDiscount,
        removeDiscount,
        total,
        wishlist,
        toggleWishlist,
        isWishlisted,
        toast,
        showToast,
        closeToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
