"use client";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function DashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState({ posts: 0, projects: 0, contacts: 0 });

  useEffect(() => {
    const checkAuthAndFetch = async () => {
      const user = auth.currentUser;
      if (!user) return router.push("/admin/login");

      const token = await user.getIdToken();
      try {
        const { data } = await axios.get("http://localhost:5000/api/dashboard-summary", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setStats(data);
      } catch (err) {
        router.push("/admin/login");
      }
    };

    checkAuthAndFetch();
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card label="Total Posts" count={stats.posts} />
        <Card label="Projects" count={stats.projects} />
        <Card label="Contacts" count={stats.contacts} />
      </div>
    </div>
  );
}

const Card = ({ label, count }: { label: string; count: number }) => (
  <div className="p-6 bg-white rounded-lg shadow text-center">
    <h2 className="text-lg font-semibold">{label}</h2>
    <p className="text-4xl font-bold">{count}</p>
  </div>
);
