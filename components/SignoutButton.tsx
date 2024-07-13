'use client';
import { createClient } from '@/utils/supabase/client';
const supabase = createClient();

export default function SignoutButton() {
  const signOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = '/login';
  };

  return (
    <button
      onClick={signOut}
      className="w-full flex justify-start"
      type="submit"
    >
      Logout
    </button>
  );
}
