'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebaseClient';
import toast from 'react-hot-toast';

export default function AdminNavbar() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    document.cookie = 'token=; Max-Age=0; path=/;';
    toast.success('Logged out!');
    router.push('/admin/login');
  };

  return (
    <div className="w-full flex justify-between items-center py-4 px-6 bg-gray-100 border-b">
      <h1 className="text-lg font-semibold">Admin Dashboard</h1>
      <Button onClick={handleLogout} variant="destructive">
        Logout
      </Button>
    </div>
  );
}
