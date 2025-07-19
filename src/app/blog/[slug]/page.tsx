import { connectDB } from '@/lib/mongoose';
import { Post } from '@/models/Post';

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  await connectDB();
  const post = await Post.findOne({ slug: resolvedParams.slug });

  if (!post)
    return <div className="p-8 text-red-500">Post not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="mt-4">{post.content}</p>
    </div>
  );
}
