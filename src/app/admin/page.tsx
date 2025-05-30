'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Post {
  id: string;
  title: string;
  content: string;
}

export default function AdminDashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  const handleDelete = async (id: string) => {
    await fetch(`/api/posts/${id}`, { method: 'DELETE' });
    setPosts(posts.filter(post => post.id !== id));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <button
        onClick={() => router.push('/admin/create')}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Create New Post
      </button>
      <ul>
        {posts.map(post => (
          <li key={post.id} className="mb-2">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p>{post.content}</p>
            <button
              onClick={() => router.push(`/admin/edit/${post.id}`)}
              className="mr-2 px-2 py-1 bg-yellow-500 text-white rounded"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(post.id)}
              className="px-2 py-1 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
