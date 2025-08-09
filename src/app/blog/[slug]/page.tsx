// app/blog/[slug]/page.tsx

import { Metadata } from "next";
import { getPostBySlug } from "@/lib/api";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "@/styles/markdown.css";

// ✅ Import CommentSection and ShareButtons
import dynamic from "next/dynamic";
const CommentSection = dynamic(() => import("@/components/CommentSection"), { ssr: false });
const ShareButtons = dynamic(() => import("@/components/ShareButtons"), { ssr: false });

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return { title: "Post not found" };
  return {
    title: `${post.title} | Mahafuj Ahamed`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://mahafujahamed.me/blog/${params.slug}`,
      siteName: "Mahafuj Ahamed",
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getPostBySlug(params.slug);

  if (!post) return notFound();

  return (
    <article className="max-w-3xl mx-auto px-4 py-10">
      <Link
        href="/blog"
        className="inline-flex items-center text-sm text-blue-500 hover:underline mb-4"
      >
        <ArrowLeft className="w-4 h-4 mr-1" /> Back to Blog
      </Link>

      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <div className="text-sm text-zinc-500 mb-6">
        {formatDate(post.createdAt)} &middot; {post.readTime || "2"} min read
      </div>

      <div className="prose dark:prose-invert max-w-none">
        <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
          {post.content}
        </Markdown>
      </div>

      {/* Tags */}
      <div className="mt-6 flex gap-2 flex-wrap">
        {post.tags?.map((tag: string) => (
          <span
            key={tag}
            className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-800/20 text-blue-700 dark:text-blue-300 rounded"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* 🔗 Share Buttons */}
      <ShareButtons url={`https://mahafujahamed.me/blog/${params.slug}`} />

      {/* 💬 Comment Section */}
      <CommentSection slug={params.slug} />
    </article>
  );
}
