'use client';
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { CirclePlus, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useAuth } from '@/context/ShopContext';
import { create } from 'domain';
import { createClient } from '@/utils/supabase/client';

interface Cat {
  name: string;
}
const supabase = createClient();

const AddCategory = () => {
  const { store, categories: existingCategories } = useAuth();
  const [cats, setCategories] = useState([{ name: '' }]);
  // Extract existing category names
  const existingCategoryNames = existingCategories.map((category: any) =>
    category.name.toLowerCase().trim()
  );

  // Custom validation to check if the category already exists
  const categorySchema = z.object({
    cats: z
      .array(
        z.object({
          name: z
            .string()
            .min(1, 'Ce champ est vide')
            .refine(
              (name) =>
                !existingCategoryNames.includes(name.trim().toLowerCase()),
              {
                message: 'Cette catégorie existe déjà',
              }
            ),
        })
      )
      .min(1, 'Au moins une catégorie est requise'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(categorySchema),
  });

  const addCategoryField = () => {
    setCategories([...cats, { name: '' }]);
  };

  const removeCategoryField = (index: number) => {
    const newCategories = cats.filter((_, i) => i !== index);
    setCategories(newCategories);
  };

  const onSubmit = async (data: any) => {
    try {
      const { cats } = data;
      const { error } = await supabase.from('category').insert(
        cats.map((cat: Cat) => ({
          name: cat.name,
          store_id: store.id,
        }))
      ); // Replace 'your_store_id' with the actual store ID

      if (error) {
        console.error('Error inserting categories:', error);
        alert('Error inserting categories');
        setCategories([{ name: '' }]);
        window.location.href = 'admin/categories';
      } else {
        alert('Categories inserted successfully');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while inserting categories');
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="ml-auto">
        <Button className="w-max bg-blue-600 hover:bg-blue-500">
          + Nouvelle catégorie
        </Button>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <h2 className="text-xl font-bold mb-4">Ajouter des catégories</h2>
          {cats.map((category: Cat, index) => (
            <div key={index} className="mb-4 flex items-center gap-x-4">
              <div className="w-full">
                <input
                  type="text"
                  placeholder={`Catégorie ${index + 1}`}
                  {...register(`cats.${index}.name`)}
                  className="mt-1 block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                {errors.cats && errors.cats[index] && (
                  <p className="text-red-500 text-sm ml-1 mt-1">
                    {errors.cats[index].name?.message}
                  </p>
                )}
              </div>
              {index > 0 && (
                <Button
                  onClick={() => removeCategoryField(index)}
                  variant={'ghost'}
                  size="icon"
                  className="mt-2 text-red-500 hover:text-red-600"
                >
                  <Trash2 className="h-6 w-6" />
                </Button>
              )}
            </div>
          ))}
          <div className="w-full flex items-center">
            <Button type="submit">Soumettre</Button>
            <Button
              type="button"
              variant={'ghost'}
              className="ml-auto"
              onClick={addCategoryField}
            >
              <CirclePlus /> &nbsp;Ajouter une autre
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategory;
