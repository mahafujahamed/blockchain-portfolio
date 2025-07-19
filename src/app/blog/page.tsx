import { connectDB } from '@/lib/mongoose';
import { Post } from '@/models/Post';
import Link from 'next/link';

export default async function BlogPage() {
  await connectDB();
  const posts = await Post.find().sort({ createdAt: -1 });

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Blog</h1>
      <div className="space-y-6">
        {posts.map((post) => (
          <Link key={post._id} href={`/blog/${post.slug}`} className="block group">
            <h2 className="text-xl font-semibold group-hover:text-blue-600 transition">{post.title}</h2>
            <p className="text-gray-600">{post.content.slice(0, 100)}...</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
