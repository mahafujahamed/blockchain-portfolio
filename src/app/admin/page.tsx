'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type Post = {
  _id: string;
  title: string;
};

export default function AdminDashboard() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(setPosts);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <Link href="/admin/create" className="bg-blue-600 text-white px-4 py-2 rounded-md mb-4 inline-block">
        Create New Post
      </Link>

      <ul className="mt-4 space-y-4">
        {posts.map(post => (
          <li key={post._id} className="border p-4 rounded-md flex justify-between">
            <span>{post.title}</span>
            <Link href={`/admin/edit/${post._id}`} className="text-blue-500 hover:underline">
              Edit
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
