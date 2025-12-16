import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { Product } from "@/lib/data";

export type CartItem = {
  productId: string;
  product: Product;
  quantity: number;
  bundleIndex: number | null;
};

type CartContextType = {
  items: CartItem[];
  addItem: (product: Product, quantity: number, bundleIndex: number | null) => void;
  removeItem: (productId: string, bundleIndex: number | null) => void;
  updateQuantity: (productId: string, bundleIndex: number | null, quantity: number) => void;
  clearCart: () => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  totalItems: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const getItemKey = (productId: string, bundleIndex: number | null) => 
    `${productId}-${bundleIndex ?? 'single'}`;

  const addItem = useCallback((product: Product, quantity: number, bundleIndex: number | null) => {
    setItems(current => {
      const existingIndex = current.findIndex(
        item => item.productId === product.id && item.bundleIndex === bundleIndex
      );

      if (existingIndex >= 0) {
        const updated = [...current];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        return updated;
      }

      return [...current, { productId: product.id, product, quantity, bundleIndex }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((productId: string, bundleIndex: number | null) => {
    setItems(current => 
      current.filter(item => !(item.productId === productId && item.bundleIndex === bundleIndex))
    );
  }, []);

  const updateQuantity = useCallback((productId: string, bundleIndex: number | null, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId, bundleIndex);
      return;
    }
    setItems(current =>
      current.map(item =>
        item.productId === productId && item.bundleIndex === bundleIndex
          ? { ...item, quantity }
          : item
      )
    );
  }, [removeItem]);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);
  const toggleCart = useCallback(() => setIsOpen(prev => !prev), []);

  const totalItems = items.reduce((sum, item) => {
    if (item.bundleIndex !== null) {
      return sum + item.product.bundles[item.bundleIndex].units * item.quantity;
    }
    return sum + item.quantity;
  }, 0);

  const totalPrice = items.reduce((sum, item) => {
    if (item.bundleIndex !== null) {
      return sum + item.product.bundles[item.bundleIndex].price * item.quantity;
    }
    return sum + item.product.price * item.quantity;
  }, 0);

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      isOpen,
      openCart,
      closeCart,
      toggleCart,
      totalItems,
      totalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
