// src/app/admin/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Post {
  _id: string;
  title: string;
  content: string;
}

export default function AdminDashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(setPosts);
  }, []);

  const deletePost = async (id: string) => {
    if (!confirm('Delete this post?')) return;
    await fetch(`/api/posts/${id}`, { method: 'DELETE' });
    setPosts(posts.filter((p) => p._id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <button
        onClick={() => router.push('/admin/create')}
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        + Create New Post
      </button>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post._id} className="border p-4 rounded">
            <h2 className="font-semibold">{post.title}</h2>
            <p>{post.content.substring(0, 100)}...</p>
            <div className="mt-2 flex gap-4">
              <button
                onClick={() => router.push(`/admin/edit/${post._id}`)}
                className="text-blue-600 underline"
              >
                Edit
              </button>
              <button onClick={() => deletePost(post._id)} className="text-red-600 underline">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
