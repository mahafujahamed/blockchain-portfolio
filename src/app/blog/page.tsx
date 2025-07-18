import { connectDB } from '@/lib/mongoose';
import { Post } from '@/models/Post';

export default async function BlogPage() {
  await connectDB(); // ✅ Ensure MongoDB is connected

  const posts = await Post.find().sort({ createdAt: -1 });

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>

      {posts.length === 0 && <p>No posts found.</p>}

      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post._id}>
            <a href={`/blog/${post.slug}`} className="text-xl text-blue-600 hover:underline">
              {post.title}
            </a>
            <p className="text-gray-600 mt-1">{new Date(post.createdAt).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
