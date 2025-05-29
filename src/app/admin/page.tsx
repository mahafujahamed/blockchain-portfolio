'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Post } from '@/types/post';

export default function AdminPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/posts');
      const data = await res.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });
      setPosts(posts.filter(post => post._id !== id));
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <Link href="/admin/create" className="bg-blue-600 text-white px-4 py-2 rounded mb-4 inline-block">
        + Create New Post
      </Link>
      <ul className="space-y-4 mt-6">
        {posts.map((post) => (
          <li key={post._id} className="p-4 border rounded-md flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{post.title}</h3>
              <p className="text-sm text-gray-500">{post.category} • {new Date(post.createdAt).toDateString()}</p>
            </div>
            <div className="space-x-2">
              <Link
                href={`/admin/edit/${post._id}`}
                className="text-blue-500 underline"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(post._id)}
                className="text-red-500 underline"
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
