'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Post { id: string; title: string; content: string; }

export default function AdminDashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/posts').then(res => res.json()).then(setPosts);
  }, []);

  const deletePost = async (id: string) => {
    await fetch(`/api/posts/${id}`, { method: 'DELETE' });
    setPosts(posts.filter(p => p.id !== id));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Manage Blog Posts</h1>
      <button
        onClick={() => router.push('/admin/create')}
        className="my-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        + New Post
      </button>
      <ul className="space-y-4">
        {posts.map(p => (
          <li key={p.id} className="p-4 border rounded">
            <h2 className="font-semibold">{p.title}</h2>
            <p className="text-sm text-gray-600">{p.content.substring(0, 150)}...</p>
            <div className="mt-2 space-x-2">
              <button
                onClick={() => router.push(`/admin/edit/${p.id}`)}
                className="px-2 py-1 bg-yellow-500 text-white rounded"
              >
                Edit
              </button>
              <button
                onClick={() => deletePost(p.id)}
                className="px-2 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
