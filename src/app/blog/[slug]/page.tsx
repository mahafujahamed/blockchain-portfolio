import clientPromise from '@/lib/mongodb';
import { Post } from '@/models/Post';

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const client = await clientPromise;
  const db = client.db();

  const post = await Post.findOne({ slug: params.slug });

  if (!post) return <div>Post not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="mt-4">{post.content}</p>
    </div>
  );
}
