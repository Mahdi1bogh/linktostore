import Link from 'next/link';
import React from 'react';

const ProductCard = ({ product, url }: any) => {
  const hasDiscount = product.discount_percentage > 0;
  const priceAfterDiscount =
    product.price - (product.price * product.discount_percentage) / 100;
  return (
    <div className="aspect-square transition-opacity animate-fadeIn">
      <Link
        className="relative inline-block h-full w-full"
        href={url}
        target="_blank"
      >
        <div className="group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-white hover:border-blue-600 dark:bg-black relative border-neutral-200 dark:border-neutral-800">
          <img
            alt={product.name}
            srcSet={product.srcSet}
            src={`${process.env.NEXT_PUBLIC_STORAGE}/${
              JSON.parse(product.images)[0]
            }`}
            className="object-cover"
            style={{
              position: 'absolute',
              height: '100%',
              width: '100%',
              inset: 0,
              color: 'transparent',
            }}
          />
          <div className="absolute bottom-0 left-0 flex w-full px-4 pb-4">
            <div className="flex items-center rounded-full border bg-white/70 p-1 text-xs font-semibold text-black backdrop-blur-md dark:border-neutral-800 dark:bg-black/70 dark:text-white">
              <h3 className="mr-4 line-clamp-2 flex-grow pl-2 leading-none tracking-tight">
                {product.name}
              </h3>
              <div>
                <p className="flex-none rounded-full bg-blue-600 p-2 text-white">
                  {!hasDiscount ? product.price : priceAfterDiscount}

                  <span className="ml-1 inline hidden sm:inline">TND</span>
                  {hasDiscount && (
                    <span className="ml-1 text-[10px] line-through font-thin inline hidden sm:inline">
                      {product.price}TND
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
