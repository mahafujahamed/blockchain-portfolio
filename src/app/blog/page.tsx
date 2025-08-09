// app/blog/page.tsx
import { Metadata } from "next";
import { getAllPosts } from "@/lib/api";
import { BlogCard } from "@/components/BlogCard";
import { SearchInput } from "@/components/SearchInput";
import { FilterBar } from "@/components/FilterBar";
import Pagination from "@/components/Pagination";
import { motion } from "framer-motion";

// SEO
export const metadata: Metadata = {
  title: "Blog | Mahafuj Ahamed",
  description: "Insights, tutorials, and thoughts on blockchain development by Mahafuj Ahamed.",
};

export default async function BlogPage({ searchParams }: { searchParams?: { page?: string } }) {
  const currentPage = Number(searchParams?.page) || 1;
  const postsPerPage = 6;

  const { posts, total } = await getAllPosts(currentPage, postsPerPage);
  const uniqueTags = [...new Set(posts.flatMap((post: any) => post.tags || []))];

  const totalPages = Math.ceil(total / postsPerPage);

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1
        className="text-3xl font-bold mb-4 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        My Blog
      </motion.h1>

      <SearchInput />
      <FilterBar tags={uniqueTags} />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {posts.map((post: any) => (
          <BlogCard key={post._id} post={post} />
        ))}
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
