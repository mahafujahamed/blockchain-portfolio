// src/app/admin/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getIdToken } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import axios from 'axios';

interface DashboardData {
  counts: {
    posts: number;
    projects: number;
    contacts: number;
  };
  recent: {
    posts: any[];
    projects: any[];
    contacts: any[];
  };
}

export default function AdminDashboard() {
  const router = useRouter();
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      const user = auth.currentUser;
      if (!user) {
        router.push('/admin/login');
        return;
      }

      try {
        const token = await getIdToken(user);
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/dashboard`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDashboard(res.data.data);
      } catch (err) {
        console.error('Dashboard fetch failed:', err);
        router.push('/admin/login');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [router]);

  if (loading) return <div className="p-4 text-center">Loading dashboard...</div>;

  if (!dashboard) return <div className="p-4 text-red-500">Failed to load dashboard.</div>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>

      {/* --- Stats --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <StatCard title="Posts" value={dashboard.counts.posts} />
        <StatCard title="Projects" value={dashboard.counts.projects} />
        <StatCard title="Contacts" value={dashboard.counts.contacts} />
      </div>

      {/* --- Recent Entries --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <RecentList title="Recent Posts" items={dashboard.recent.posts} keyField="title" />
        <RecentList title="Recent Projects" items={dashboard.recent.projects} keyField="title" />
        <RecentList title="Recent Contacts" items={dashboard.recent.contacts} keyField="name" />
      </div>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl shadow p-6 text-center">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}

function RecentList({
  title,
  items,
  keyField,
}: {
  title: string;
  items: any[];
  keyField: string;
}) {
  return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl shadow p-4">
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
        {items.length === 0 && <li>No recent entries.</li>}
        {items.map((item) => (
          <li key={item._id}>
            <span className="font-medium">{item[keyField]}</span>
            <span className="block text-xs text-zinc-500">
              {new Date(item.createdAt).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
