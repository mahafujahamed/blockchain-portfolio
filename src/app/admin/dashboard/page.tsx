// src/app/admin/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      setAuthError(true);
      router.push("/admin/login");
    } else {
      setAuthError(false);
    }
    setLoading(false);
  }, [router]);

  if (loading) return <p>Loading...</p>;
  if (authError) return null;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <button
        onClick={() => {
          localStorage.removeItem("adminToken");
          router.push("/admin/login");
        }}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}
