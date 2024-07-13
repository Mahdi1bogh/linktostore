'use client';
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

interface ProductProps {
  name: string;
  price: number;
  img: string;
}

interface CartItemProps extends ProductProps {
  quantity: any;
  totalPrice: any;
  img: string;
}

interface CartContextType {
  cartItems: CartItemProps[];
  addToCart: (product: CartItemProps) => void;
  removeFromCart: (productName: string) => void;
  updateQuantity: (productName: string, quantity: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItemProps[]>([]);

  // Effect for loading cart items from local storage only on client-side
  useEffect(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems));
    }
  }, []);

  // Effect for saving cart items to local storage whenever they change
  useEffect(() => {
    if (cartItems.length)
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems.length]);

  const addToCart = (product: ProductProps) => {
    setCartItems((prevItems) => {
      // Check if item already exists in the cart
      const existingItem = prevItems.find((item) => item.name === product.name);
      if (existingItem) {
        // Increase quantity if item exists
        return prevItems.map((item) =>
          item.name === product.name
            ? {
                ...item,
                quantity: item.quantity + 1,
                totalPrice: item.price * (item.quantity + 1),
              }
            : item
        );
      } else {
        // Add new item with quantity 1 if it doesn't exist
        const newItem: CartItemProps = {
          ...product,
          quantity: 1,
          totalPrice: product.price,
          img: product.img,
        };
        return [...prevItems, newItem];
      }
    });
  };

  const removeFromCart = (productName: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.name !== productName)
    );
  };

  const updateQuantity = (productName: string, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.name === productName
          ? { ...item, quantity, totalPrice: item.price * quantity }
          : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity }}
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
  // Calculate the total price for the cart
  const total = context.cartItems.reduce(
    (total, item) => total + item.totalPrice,
    0
  );
  return { ...context, total };
};
