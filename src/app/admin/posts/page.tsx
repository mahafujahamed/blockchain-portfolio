"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Trash2, Pencil, Plus } from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function AdminPostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_BASE}/api/blog`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setPosts(data);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    const token = localStorage.getItem("token");
    const res = await fetch(`${API_BASE}/api/blog/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.ok) {
      setPosts((prev) => prev.filter((post: any) => post._id !== id));
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">All Posts</h1>
        <Link
          href="/admin/posts/new"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 inline-flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> New Post
        </Link>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <div className="overflow-x-auto border rounded-lg">
          <table className="min-w-full text-sm">
            <thead className="bg-zinc-100 dark:bg-zinc-800">
              <tr>
                <th className="px-4 py-2 text-left">Title</th>
                <th className="px-4 py-2 text-left">Tags</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post: any) => (
                <tr key={post._id} className="border-t">
                  <td className="px-4 py-2">{post.title}</td>
                  <td className="px-4 py-2">{(post.tags || []).join(", ")}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <Link
                      href={`/admin/posts/edit/${post._id}`}
                      className="text-blue-600 hover:underline"
                    >
                      <Pencil className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(post._id)}
                      className="text-red-600 hover:underline"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
