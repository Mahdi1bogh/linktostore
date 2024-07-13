import Carousel from '@/components/shared/carousel/Carousel';
import AddToCart from '@/components/shared/navbar/shop-nav/AddToCart';
import { createClient } from '@supabase/supabase-js';
import { ShoppingCart, Star } from 'lucide-react';
import { notFound } from 'next/navigation';

import React from 'react';

export default async function Product({
  params: { name },
}: {
  params: { name: string };
}) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  const nameWithoutSpace = name.replaceAll('-', ' ').toLowerCase();

  const { data: product } = await supabase
    .from('product')
    .select()
    .ilike('name', `%${nameWithoutSpace}%`)
    .single();

  if (!product) {
    notFound();
  }

  const ratingValue = 4.5;
  const totalReviews = 150;
  const image = JSON.parse(product.images)[0];
  return (
    <div className="flex justify-center h-full px-4 sm:px-6 lg:px-8 ">
      <div className="flex  gap-x-4 max-h-[80%]  flex-col h-full lg:flex-row w-full">
        <div className="flex justify-center lg:w-1/2 flex-1">
          <Carousel images={JSON.parse(product.images)} />
        </div>
        <div className="mt-6 flex flex-col justify-center flex-1">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            {product.name}
          </h2>
          <div className="flex items-center mt-2">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                className={`h-5 w-5 ${
                  index < Math.floor(ratingValue)
                    ? 'text-yellow-400'
                    : 'text-gray-300 dark:text-gray-600'
                }`}
              />
            ))}
            <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
              {ratingValue.toFixed(1)} ({totalReviews} reviews)
            </span>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {product.description}
          </p>
          <div className="flex justify-between items-center mt-4">
            <div>
              <span className="text-xl font-bold text-green-600 dark:text-green-400">
                ${product.price.toFixed(2)}
              </span>
              {product.discount_percentage > 0 && (
                <span className="text-sm line-through text-gray-400 dark:text-gray-500 ml-2">
                  $
                  {(
                    product.price /
                    (1 - product.discount_percentage / 100)
                  ).toFixed(2)}
                </span>
              )}
            </div>
            <div>
              <span className="text-lg font-medium text-gray-700 dark:text-gray-300 mr-2">
                Quantity:
              </span>
              <span className="text-lg text-gray-900 dark:text-white">
                {product.quantity}
              </span>
            </div>
          </div>
          <AddToCart
            price={product.price}
            totalPrice={product.price}
            quantity={1}
            name={product.name}
            img={JSON.parse(product.images)[0]}
          />
        </div>
      </div>
    </div>
  );
}
