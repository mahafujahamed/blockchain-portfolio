'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebaseClient';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        {user && (
          <div className="text-right">
            <p className="text-sm">Welcome, {user.displayName || user.email}</p>
            <button
              onClick={() => auth.signOut()}
              className="text-blue-500 hover:underline text-sm mt-1"
            >
              Logout
            </button>
          </div>
        )}
      </div>
      {children}
    </div>
  );
}
