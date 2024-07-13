// components/ProductForm.tsx
import React, { useState, useContext } from 'react';
import { createClient } from '@/utils/supabase/client';
import { AuthContext } from '@/context/ShopContext';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { uploadImages } from '@/utils/api';

const supabase = createClient();

const AddProductForm = () => {
  const { store, categories } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [brand, setBrand] = useState('');
  const [quantity, setQuantity] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [category_id, setCategoryId] = useState('');
  const [images, setImages] = useState<FileList | null | never[]>([]); // Assuming images is a JSON array as string

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    // Validate the store context
    if (!store?.id) {
      alert('Store ID is not available.');
      return;
    }
    const imgs = await uploadImages(images, store.id);
    console.log(imgs);
    const product = {
      store_id: store.id,
      name,
      brand,
      category_id: Number(category_id),
      description,
      price: parseFloat(price),
      quantity: parseInt(quantity, 10),
      discount_percentage: parseFloat(discountPercentage),
      images: JSON.stringify(imgs), // Parse the images JSON string to an actual JSON object
    };
    // console.log(product);

    const { error } = await supabase.from('product').insert([product]);

    if (error) {
      console.error('Error inserting product:', error);
      alert('Failed to add product.');
    } else {
      setBrand('');
      setName('');
      setDescription('');
      setPrice('');
      setDiscountPercentage('');
      setQuantity('');
      setImages([]);
      setCategoryId('');

      alert('Product added successfully!');
      // Clear the form or handle the success case
    }
  };

  return (
    <form className="flex py-3 flex-col gap-y-4" onSubmit={handleSubmit}>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-left">
          Name
        </Label>
        <Input
          id="name"
          type="text"
          onChange={(e) => setName(e.target.value)}
          defaultValue={name}
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="brand" className="text-left">
          Brand
        </Label>
        <Input
          id="brand"
          type="text"
          onChange={(e) => setBrand(e.target.value)}
          defaultValue={brand}
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-left">
          Description
        </Label>
        <Textarea
          id="description"
          rows={5}
          onChange={(e) => setDescription(e.target.value)}
          defaultValue={description}
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-left">
          Prix
        </Label>
        <Input
          id="price"
          type="text"
          onChange={(e) => setPrice(e.target.value)}
          defaultValue={price}
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-left">
          Quantité
        </Label>
        <Input
          id="quantity"
          type="number"
          onChange={(e) => setQuantity(e.target.value)}
          defaultValue={quantity}
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-left">
          Remise %
        </Label>
        <Input
          id="discount_percentage"
          type="number"
          onChange={(e) => setDiscountPercentage(e.target.value)}
          defaultValue={discountPercentage}
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="category" className="text-left">
          Category
        </Label>
        <Select
          onValueChange={(e) => setCategoryId(e)}
          defaultValue={category_id}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Categories</SelectLabel>
              {categories &&
                categories.map((c) => {
                  return (
                    <SelectItem key={c.id + c.name + 'form'} value={c.id + ''}>
                      {c.name}
                    </SelectItem>
                  );
                })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="category" className="text-left">
          Image
        </Label>
        <Input
          type="file"
          multiple
          onChange={(e) => setImages(e.target.files)}
          className="col-span-3"
        />
      </div>
      <Button className="ml-auto" type="submit">
        Ajouter
      </Button>
    </form>
  );
};

export default AddProductForm;
