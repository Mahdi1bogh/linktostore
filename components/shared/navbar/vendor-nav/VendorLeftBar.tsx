'use client';
import Link from 'next/link';
import {
  Bell,
  Home,
  ListIcon,
  LogIn,
  Package,
  Settings,
  ShoppingCart,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/ShopContext';
export type NavLinkItem = {
  href: string;
  icon: React.ReactNode;
  label: string;
  badgeCount?: number;
};

const navLinkItems: NavLinkItem[] = [
  // {
  //   href: '/admin/dashboard',
  //   icon: <Home className="h-4 w-4" />,
  //   label: 'Dashboard',
  // },
  {
    href: '/admin/products',
    icon: <Package className="h-4 w-4" />,
    label: 'Products',
  },
  // {
  //   href: '/admin/orders',
  //   icon: <ShoppingCart className="h-4 w-4" />,
  //   label: 'Orders',
  // },
  {
    href: '/admin/categories',
    icon: <ListIcon className="h-4 w-4" />,
    label: 'Categories',
  },
  // {
  //   href: '/admin/settings',
  //   icon: <Settings className="h-4 w-4" />,
  //   label: 'Settings',
  // },
  {
    href: '/lemhall/p',
    icon: <LogIn className="h-4 w-4" />,
    label: 'Visit Shop',
  },
];

interface storeData {
  name: string;
  logo: string;
}
interface props {
  store?: storeData;
}
const LeftBar: React.FC<props> = () => {
  const pathname = usePathname();
  const { store } = useAuth();
  return (
    <div className="hidden border-r w-full border-muted  md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 gap-x-2 items-center border-b dark:border-muted border-zinc-700 px-4 lg:h-[60px] lg:px-6">
          <Link href="/" passHref>
            <div className="flex items-center gap-2 font-semibold cursor-pointer">
              {/* <Package2 className="h-6 w-6" /> */}
              <img
                src={store?.logo}
                className="object-contain"
                height={25}
                width={25}
                alt=""
              />
              {/* <span>DariDeco</span> */}
              <span className="text-white">{store ? store?.name : null}</span>
            </div>
          </Link>
          <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {navLinkItems.map((item) => (
              <Link key={item.label} href={item.href} passHref>
                <div
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all cursor-pointer ${
                    pathname.includes(item.href)
                      ? 'bg-zinc-700 text-white'
                      : 'hover:bg-zinc-900 hover:text-white'
                  }`}
                >
                  {item.icon}
                  {item.label}
                  {item.badgeCount && (
                    <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                      {item.badgeCount}
                    </Badge>
                  )}
                </div>
              </Link>
            ))}
          </nav>
        </div>
        {/* <div className="mt-auto p-4">
          <Card className="border-muted">
            <CardHeader className="p-2 pt-0 md:p-4">
              <CardTitle>Upgrade to Pro</CardTitle>
              <CardDescription>
                Unlock all features and get unlimited access to our support
                team.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
              <Button size="sm" className="w-full">
                Upgrade
              </Button>
            </CardContent>
          </Card>
        </div> */}
      </div>
    </div>
  );
};

export default LeftBar;
