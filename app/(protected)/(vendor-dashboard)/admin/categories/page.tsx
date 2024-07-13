'use client';
import { categoriesColumns } from '@/components/vendor-admin/data-table/categoriesTable/CategoriesColumns';
import { CategoriesDataTable } from '@/components/vendor-admin/data-table/categoriesTable/CategoriesDataTable';
import { useAuth } from '@/context/ShopContext';
import React from 'react';

const page = () => {
  const { categories } = useAuth();
  // console.log('CATEGORIES ', state);
  return (
    <div>
      Categories
      <CategoriesDataTable columns={categoriesColumns} data={categories} />
    </div>
  );
};

export default page;
