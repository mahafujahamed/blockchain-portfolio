"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, getIdToken } from "firebase/auth";
import Sidebar from "@/components/admin/Sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [checking, setChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        localStorage.removeItem("token");
        router.replace("/admin/login");
      } else {
        // ensure token exists/refresh token
        const token = await getIdToken(user, true);
        localStorage.setItem("token", token);
        setChecking(false);
      }
    });
    return () => unsub();
  }, [router]);

  if (checking) {
    return <div className="p-6">Checking admin session...</div>;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-50 dark:bg-zinc-900">{children}</main>
    </div>
  );
}
