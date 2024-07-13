'use client';
import VendorDashboardNav from '@/components/shared/navbar/vendor-nav/VendorDashboardNav';
import LeftBar from '@/components/shared/navbar/vendor-nav/VendorLeftBar';
import { AuthContextProvider } from '@/context/ShopContext';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user) {
        router.push('/login');
      }
      setLoading(false);
    };

    fetchUser();
  }, [router, supabase]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <AuthContextProvider>
      <main className="min-h-screen w-full bg-muted/50 dark:bg-background max-w-dvw flex scrollable-content">
        <div className="flex bg-asidebar-background min-w-[250px]">
          <LeftBar />
        </div>
        <div className="flex-1 ">
          <VendorDashboardNav />
          <div className="px-8">{children}</div>
        </div>
      </main>
    </AuthContextProvider>
  );
}
