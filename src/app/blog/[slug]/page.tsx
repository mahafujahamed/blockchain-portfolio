import { getPostBySlug } from '@/lib/getPostBySlug';
import { notFound } from 'next/navigation';

interface Props {
  params: { slug: string };
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getPostBySlug(params.slug);
  if (!post) return notFound();

  return (
    <article className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-sm text-gray-600">{new Date(post.createdAt).toLocaleDateString()}</p>
      <img src={post.image} alt={post.title} className="w-full h-64 object-cover rounded mt-4" />
      <div className="mt-6 whitespace-pre-line">{post.content}</div>
    </article>
  );
}
