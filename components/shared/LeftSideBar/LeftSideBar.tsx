'use client';
import React, { useCallback } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const CategoriesMenu = ({ categories, shopname }: any) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
  return (
    <>
      <h3 className="hidden text-xs text-neutral-500 md:block dark:text-neutral-400">
        Categories
      </h3>
      <ul className="hidden md:block">
        {categories.map((item: any) => (
          <li
            key={'/lemhall/' + item.name}
            className="mt-2 flex text-black dark:text-white"
          >
            <button
              className="w-full text-left text-sm underline-offset-4 hover:underline dark:hover:text-neutral-100"
              onClick={() => {
                router.push(
                  '/lemhall/p' + '?' + createQueryString('category', item.name)
                );
              }}
            >
              {item.name}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default CategoriesMenu;
