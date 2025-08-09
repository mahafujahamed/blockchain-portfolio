// src/app/admin/posts/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function AdminPostsPage() {
  const { token } = useAuth();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blog?page=1&limit=100`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    })
      .then(async (res) => {
        if (!res.ok) throw new Error(`Failed (${res.status})`);
        return res.json();
      })
      .then((data) => {
        // adapt if your API returns { posts, total }
        setPosts(Array.isArray(data.posts) ? data.posts : data);
      })
      .catch((e) => setErr(e.message))
      .finally(() => setLoading(false));
  }, [token]);

  async function handleDelete(id: string) {
    if (!confirm("Delete this post?")) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blog/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Delete failed");
      setPosts((p) => p.filter((x) => x._id !== id));
    } catch (e: any) {
      alert(e.message || "Delete failed");
    }
  }

  if (!token) return <p>Please log in to manage posts.</p>;
  if (loading) return <p>Loading posts...</p>;
  if (err) return <p className="text-red-600">{err}</p>;
  if (!posts.length) return <p>No posts found</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Posts</h2>
        <Link href="/admin/posts/create"><a className="px-3 py-1 bg-green-600 text-white rounded">Create Post</a></Link>
      </div>

      <ul className="space-y-3">
        {posts.map((post) => (
          <li key={post._id} className="p-4 bg-white dark:bg-neutral-800 rounded shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{post.title}</h3>
                <p className="text-sm text-neutral-500">{post.excerpt ?? post.description}</p>
              </div>
              <div className="flex gap-2">
                <Link href={`/admin/posts/${post._id}/edit`}><a className="text-blue-600">Edit</a></Link>
                <button onClick={() => handleDelete(post._id)} className="text-red-600">Delete</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
