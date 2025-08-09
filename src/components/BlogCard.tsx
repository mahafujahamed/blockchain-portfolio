
"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { formatDate } from "@/lib/utils";

export function BlogCard({ post }: { post: any }) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="rounded-lg border border-zinc-200 dark:border-zinc-700 p-4 shadow-sm hover:shadow-md transition"
    >
      <Link href={`/blog/${post.slug}`}>
        <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400 mb-1">
          {post.title}
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {formatDate(post.createdAt)}
        </p>
        <p className="mt-2 text-zinc-700 dark:text-zinc-300 line-clamp-3">{post.summary}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {post.tags?.map((tag: string) => (
            <span
              key={tag}
              className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-2 py-0.5 rounded"
            >
              #{tag}
            </span>
          ))}
        </div>
      </Link>
    </motion.div>
  );
}
