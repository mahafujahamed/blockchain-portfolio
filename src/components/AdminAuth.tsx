// src/components/AdminAuth.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminAuth({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.replace("/admin/login");
      return;
    }

    // quick server-side verification of token
    (async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/dashboard`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          localStorage.removeItem("adminToken");
          router.replace("/admin/login");
          return;
        }

        // token is valid
        setChecking(false);
      } catch (err) {
        localStorage.removeItem("adminToken");
        router.replace("/admin/login");
      }
    })();
  }, [router]);

  if (checking) return <div className="p-6 text-center">Checking credentials…</div>;
  return <>{children}</>;
}
