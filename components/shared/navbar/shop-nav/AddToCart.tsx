'use client';
import { useCart } from '@/context/CartContext';
import { ShoppingCart } from 'lucide-react';
import React from 'react';

const AddToCart = ({ quantity, totalPrice, name, price, img }: any) => {
  const { addToCart } = useCart();
  return (
    <button
      onClick={() => addToCart({ quantity, totalPrice, name, price, img })}
      className="mt-6 w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      <ShoppingCart className="h-5 w-5 mr-3" />
      Add to Cart
    </button>
  );
};

export default AddToCart;
