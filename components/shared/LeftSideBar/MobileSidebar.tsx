import Link from 'next/link';
import React from 'react';

const MobileCategoriesMenu = ({ categories }: any) => {
  // Add state and event handlers for mobile menu toggle if needed
  return (
    <ul className="md:hidden">
      <div className="relative">
        <ul className="md:hidden">
          {categories.map((item: any) => (
            <li
              key={'/lemhall/' + item.name}
              className="mt-2 flex text-black dark:text-white"
            >
              <Link
                className="w-full text-sm underline-offset-4 hover:underline dark:hover:text-neutral-100"
                href={'/lemhall/' + item.name}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </ul>
  );
};

export default MobileCategoriesMenu;
