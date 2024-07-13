// import { Button } from '@/components/ui/button';
// import { ShoppingCart, Star } from 'lucide-react';
// import Link from 'next/link';
// import React from 'react';

// const ShopNavbar = ({ shopname }: { shopname: string }) => {
//   return (
//     <>
//       <nav className="px-5 border-gray-200 border-b">
//         <div className="flex flex-wrap justify-between items-center p-4">
//           <Link
//             href="/"
//             className="flex items-center space-x-3 rtl:space-x-reverse"
//           >
//             <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
//               {shopname}
//             </span>
//           </Link>
//           <div className="flex items-center space-x-6 rtl:space-x-reverse">
//             <Button
//               size={'sm'}
//               className="hover:bg-gray-100 bg-gray-50 text-xs text-zinc-600"
//             >
//               <Star className="mr-2 h-4 w-4" color="pink" /> Stars{' '}
//               <span className="ml-2 rounded-full p-1  bg-pink-100">96</span>
//             </Button>
//             <Link href="tel:5541251234" className=" dark:text-white">
//               <ShoppingCart size={18} className="hover:scale-110" />
//             </Link>
//             <Link href="/login">
//               <Button size={'sm'}>Login</Button>
//             </Link>
//           </div>
//         </div>
//       </nav>
//     </>
//   );
// };

// export default ShopNavbar;
'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Search, ShoppingBag, ShoppingCart } from 'lucide-react';

import { usePathname, useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import StoreHeaderCart from './CartSheet';
import { ThemeToggle } from '@/components/common/ThemeToggle';

const Navbar = ({ params }: any) => {
  // const { cartItems } = useCart();
  const { push } = useRouter();
  const pathname = usePathname();
  const pathSegments = pathname.split('/');
  const shopName = pathSegments[1];
  return (
    <nav className="relative flex items-center justify-between p-4 lg:px-6">
      <div className="block flex-none md:hidden">
        {/* Mobile menu button */}
        <button
          aria-label="Open mobile menu"
          className="flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors md:hidden dark:border-neutral-700 dark:text-white"
        >
          {/* Mobile menu icon */}
          {/* Add onClick handler for mobile menu here */}
        </button>
      </div>
      <div className="flex w-full items-center">
        <div className="flex w-full md:w-1/3">
          <Link
            className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
            href="/"
          >
            {/* <div className="hidden md:flex flex-none items-center justify-center border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-black h-[40px] w-[40px] rounded-xl">
              <img src="/lts.png" alt="logo" />
            </div> */}
            <div className="ml-2 flex-none text-sm font-medium uppercase md:hidden lg:block">
              {shopName}
            </div>
          </Link>
        </div>
        <div className="hidden justify-center md:flex md:w-1/3">
          {/* Search form */}
          {/* Add onSubmit handler for search here */}
          <div className="relative ml-auto flex-1 md:grow-0">
            <Input
              type="search"
              placeholder="Search for products..."
              autoFocus={false}
              autoComplete={'off'}
              className="w-full ring-transparent dark:bg-transparent rounded-lg pl-5 md:w-[200px] lg:w-[500px]"
            />
            <Search className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        <div className="flex gap-x-2 justify-end md:w-1/3">
          <ThemeToggle />
          <StoreHeaderCart />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
