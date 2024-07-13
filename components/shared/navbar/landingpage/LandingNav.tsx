'use client';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import Typography from '@/components/ui/typography';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { CircleUser, MenuIcon, X } from 'lucide-react';

import WebLogo from '@/components/shared/Logo/LTS';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import { ThemeToggle } from '@/components/common/ThemeToggle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import SignoutButton from '@/components/SignoutButton';
interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function LandingNav({ className }: SidebarProps) {
  const pathname = usePathname();
  const supabase = createClient();
  const [user, setUser] = useState<any>();
  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (!error || data) {
        setUser(data?.user);
      }
    };
    getUser();
  }, []);
  console.log('user ', user);
  const items = [
    {
      href: 'https://map.sistilli.dev/public/coding/SaaS+Boilerplate',
      title: 'Book a demo',
      openInNewTab: true,
    },
    { href: '#pricing', title: 'Features' },
    {
      href: 'mailto:myemail@.com',
      title: 'Contact Us',
    },
  ];
  const isHidden = pathname === '/';
  const getLogo = () => (
    <Link href="/" className="pointer flex items-center">
      <div>
        <WebLogo />
      </div>
      <Typography className="!text-black dark:!text-white !text-base font-medium ">
        LinkToStore
      </Typography>
    </Link>
  );

  const getAuthButtons = () =>
    !user ? (
      <div className="flex ml-2 gap-4 items-center">
        <Link href="login" target="_blank">
          <Typography variant="p">Login</Typography>
        </Link>
      </div>
    ) : (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon" className="rounded-full">
            <CircleUser className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Link href={'/admin/dashboard'}> Dashboard</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <SignoutButton />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );

  const getHeaderItems = () => {
    return (
      <>
        {items.map((item) => {
          const selected =
            pathname === item.href || pathname.includes(item.href);
          return (
            <Link
              href={item.href}
              className="pointer block w-fit"
              target={item.openInNewTab ? '_blank' : ''}
              key={item.title}
            >
              <Typography
                variant="p"
                className={cn(selected && 'text-primary')}
              >
                {item.title}
              </Typography>
            </Link>
          );
        })}
      </>
    );
  };

  return (
    <div
      className={cn(
        `flex md:h-12 h-14 items-center justify-center w-full ${
          !isHidden ? 'hidden' : ''
        }
         `,
        className
      )}
    >
      <div className="w-full max-w-[1280px] md:px-8 px-4">
        {/* Desktop */}
        <div className="flex items-center gap-x-8 w-full">
          <div className="md:flex-0 min-w-fit flex-1">{getLogo()}</div>
          <div className="hidden md:flex  items-center w-full">
            <div className="flex items-center gap-x-8 flex-1">
              {getHeaderItems()}
            </div>
            <div className="flex items-center gap-x-2">
              <ThemeToggle />
              {getAuthButtons()}
            </div>
          </div>
          {/* Mobile */}
          <div className="md:hidden flex gap-x-4 items-center">
            {getAuthButtons()}
            <Drawer direction="right">
              <DrawerTrigger asChild>
                <MenuIcon />
              </DrawerTrigger>
              <DrawerContent className="h-screen top-0 right-0 left-auto mt-0 w-64 rounded-none">
                <div className="mx-auto w-full p-5">
                  <DrawerHeader>
                    <DrawerClose asChild>
                      <div className="w-full flex items-end justify-end">
                        <X />
                      </div>
                    </DrawerClose>
                  </DrawerHeader>
                  <div className="p-4 pb-0 space-y-4">{getHeaderItems()}</div>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
    </div>
  );
}
