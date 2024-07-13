'use client';
import { createClient } from '@/utils/supabase/client';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/shared/product/ProductCard';
import Link from 'next/link';
import { useEffect, useState } from 'react';
const supabase = createClient();
export default function Page({ params }: { params: { shop: string } }) {
  const [store, setStore] = useState<any>();
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  let categoryName = searchParams.get('category');

  useEffect(() => {
    const fetchP = async () => {
      // console.log(categoryName);
      // if (!categoryName) {
      //   console.error('Category name is missing from the URL.');
      //   setLoading(false);
      //   return;
      // }

      // Fetch the store data
      const { data: storeData, error: storeError } = await supabase
        .from('store')
        .select('name, category(id, name)')
        .ilike('name', `%${params.shop}%`)
        .single();

      if (storeError) {
        console.error('Error fetching store data:', storeError.message);
        setLoading(false);
        return;
      }

      // Find the category object by name
      const cat = storeData.category.find(
        (category: any) => category.name === categoryName
      );

      // if (!cat) {
      //   console.error('Category not found in store data');
      //   setLoading(false);
      //   return;
      // }

      console.log('CAT', cat);

      // Fetch products by category ID

      const { data: products, error: productsError } = categoryName
        ? await supabase.from('product').select('*').eq('category_id', cat?.id)
        : await supabase.from('product').select('*');

      if (productsError) {
        console.error('Error fetching products:', productsError.message);
        setLoading(false);
        return;
      }

      // Update state with fetched products
      setStore({ product: products });
      setLoading(false);
    };

    // Call the function to fetch products
    fetchP();
  }, [categoryName]); // Only re-run the effect if categoryName changes
  if (loading) {
    return <h1>Loading ... </h1>;
  }
  if (!store?.product.length) {
    return <h1>No product found ... </h1>;
  }
  return (
    <div className="w-full py-6 mx-auto px-4 sm:px-6 lg:px-8">
      <div
        className="grid gap-4"
        style={{
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        }}
      >
        {store?.product.map((p: any) => (
          <ProductCard
            url={`/${params.shop}/p/${p.name.replaceAll(' ', '-')}`}
            key={p.name}
            product={p}
          />
        ))}
      </div>
    </div>
  );
}
