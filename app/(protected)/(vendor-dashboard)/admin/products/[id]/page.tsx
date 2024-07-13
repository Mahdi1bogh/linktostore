'use client';
import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { PostgrestError } from '@supabase/supabase-js';

const supabase = createClient();

const ProductPage = ({ params }: any) => {
  const [product, setProduct] = useState<any>(null); // Initialize with null
  const [error, setError] = useState<PostgrestError | null>(null); // State for errors

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data, error } = await supabase
          .from('product')
          .select('*')
          .eq('id', params.id)
          .single();

        if (!error) {
          setProduct(data);
        } else {
          setError(error); // Store error for handling
        }
      } catch (error: any) {
        setError(error); // Catch any unexpected errors
      }
    };

    fetchProduct();
  }, []);
  console.log(JSON.parse(product.images));
  // Display loading message or handle no product case
  if (!product && !error) return <h1>Loading...</h1>;

  // Handle errors if any
  if (error) {
    console.error('Error fetching product:', error);
    return <p>Error: {error.message}</p>; // Display user-friendly error message
  }

  return (
    <div>
      {product && (
        <>
          {/* Display product details if available */}
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          {/* ... other product details ... */}

          {/* Image display */}
          <h2>Images</h2>
          {product.images &&
            JSON.parse(product.images).map((img: string, idx: number) => (
              <img
                key={idx + 'product-img'}
                height={'100px'}
                width={'100px'}
                src={`${process.env.NEXT_PUBLIC_STORAGE}/${img}`}
                alt=""
              />
            ))}
        </>
      )}
    </div>
  );
};

export default ProductPage;
