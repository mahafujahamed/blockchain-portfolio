import { notFound } from 'next/navigation';
import { connectDB } from '@/lib/mongodb';
import Post from '@/models/Post';

type PageProps = {
  params: {
    slug: string;
  };
};

export default async function Page({ params }: PageProps) {
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
