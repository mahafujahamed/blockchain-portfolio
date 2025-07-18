'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type Post = {
  _id: string;
  title: string;
  slug: string;
  content: string;
};

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch('/api/posts')
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <section className="py-16 bg-white dark:bg-gray-950">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-900 dark:text-white">
          Blog
        </h2>
        <div className="space-y-8">
          {posts.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400">No posts yet.</p>
          ) : (
            posts.map((post) => (
              <div key={post._id}>
                <h3 className="text-2xl font-semibold text-blue-600 hover:underline">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {post.content.slice(0, 100)}...
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
