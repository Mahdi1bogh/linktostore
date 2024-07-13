import CategoriesMenu from '@/components/shared/LeftSideBar/LeftSideBar';
import MobileCategoriesMenu from '@/components/shared/LeftSideBar/MobileSidebar';
import ShopNavbar from '@/components/shared/navbar/shop-nav/ShopNavbar';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function Layout({
  children,
  params,
}: {
  params: { shop: string };
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const { data: categories } = await supabase
    .from('store')
    .select('category (name)')
    .ilike('name', `%${params.shop}%`)
    .single();

  return (
    <>
      <ShopNavbar shopname={params?.shop} />
      <main className="min-h-screen pt-3 flex">
        <div className="w-full flex flex-col gap-8 px-4 text-black md:flex-row dark:text-white">
          <div className="order-first w-full flex-none md:max-w-[125px]">
            <CategoriesMenu
              shopname={params?.shop}
              categories={categories?.category}
            />
            <MobileCategoriesMenu
              shopname={params?.shop}
              categories={categories?.category}
            />
          </div>

          <div className="order-last w-full md:order-none">{children}</div>
        </div>
      </main>
    </>
  );
}
