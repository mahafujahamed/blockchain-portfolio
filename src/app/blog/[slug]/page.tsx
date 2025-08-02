import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/posts/${params.slug}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) return {};

  const post = await res.json();
  return {
    title: `${post.title} – Mahafuj Ahamed`,
    description: post.description || post.excerpt,
    openGraph: {
      title: post.title,
      description: post.description || post.excerpt,
    },
  };
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/posts/${params.slug}`, {
    cache: "no-store",
  });

  if (!res.ok) return notFound();

  const post = await res.json();

  return (
    <article className="prose dark:prose-invert max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold">{post.title}</h1>
      <p className="text-sm text-gray-500 mb-8">{post.publishedAt}</p>
      <div
        dangerouslySetInnerHTML={{ __html: post.content }}
        className="text-base"
      />
    </article>
  );
}
