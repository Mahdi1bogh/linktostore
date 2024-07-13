// Assuming this is a page within the pages directory, e.g., pages/vendor-admin/products.tsx
'use client';
import React, { useContext, useEffect, useState } from 'react';
import { columns } from '@/components/vendor-admin/data-table/productsTable/Columns';
import { DataTable } from '@/components/vendor-admin/data-table/productsTable/DataTable';
import { AuthContext } from '@/context/ShopContext';
import { createClient } from '@/utils/supabase/client';
import AddProductSheet from '@/components/common/AddProductSheet';

// Create the Supabase client outside of the component
const supabase = createClient();

const ProductsPage = () => {
  const [storeId, setStoreId] = useState<string | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { store } = useContext(AuthContext);

  useEffect(() => {
    // Only set the store ID if it's available
    if (store?.id) {
      setStoreId(store.id);
    }
  }, [store]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (storeId) {
        setLoading(true);
        try {
          const { data: product, error } = await supabase
            .from('product')
            .select(
              'name, price, discount_percentage, quantity, created_at, category (name)'
            )
            .eq('store_id', storeId);

          if (error) throw error;
          const newData = product.map((p: any) => ({
            ...p,
            created_at: new Intl.DateTimeFormat('en-GB', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            }).format(new Date(p.created_at)),
            category: p.category?.name,
          }));

          setProducts(newData);
        } catch (error) {
          console.error('Error fetching products:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProducts();
  }, [storeId]);

  if (loading) return <div>Loading...</div>;
  return (
    <div className="flex flex-col gap-y-2">
      <AddProductSheet />
      <div className="px-4 py-2 bg-white dark:bg-background">
        <DataTable columns={columns} data={products} />
      </div>
    </div>
  );
};

export default ProductsPage;
