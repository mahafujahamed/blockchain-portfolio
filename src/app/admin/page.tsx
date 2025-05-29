'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type Post = {
  _id: string;
  title: string;
  createdAt: string;
};

export default function AdminDashboard() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/posts');
      const data = await res.json();
      setPosts(data.posts);
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <Link href="/admin/create">
        <button className="bg-blue-600 text-white px-4 py-2 rounded mb-4">Create New Post</button>
      </Link>
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post._id} className="p-4 border rounded shadow-sm bg-white">
            <h2 className="text-lg font-semibold">{post.title}</h2>
            <p className="text-sm text-gray-600">{new Date(post.createdAt).toLocaleDateString()}</p>
            <div className="mt-2 space-x-2">
              <Link href={`/admin/edit/${post._id}`}>
                <button className="text-sm text-blue-600 hover:underline">Edit</button>
              </Link>
              <Link href={`/admin/delete/${post._id}`}>
                <button className="text-sm text-red-600 hover:underline">Delete</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
