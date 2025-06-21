import { notFound } from 'next/navigation';
import { connectDB } from '@/lib/mongodb';
import Post from '@/models/Post';

export default async function Page({
  params,
}: {
  params: { slug: string };
}) {
  await connectDB();

  const post = await Post.findOne({ slug: params.slug });

  if (!post) return notFound();

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          className="rounded-md mb-6 w-full object-cover"
        />
      )}

      <article className="prose">
        <p>{post.content}</p>
      </article>
    </main>
  );
}

// ✅ Use inline type — DO NOT reference external `Props` type
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  await connectDB();

  const post = await Post.findOne({ slug: params.slug });

  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: `${post.title} | Blog`,
    description: post.content?.slice(0, 160),
    openGraph: {
      images: post.image ? [post.image] : [],
    },
  };
}
