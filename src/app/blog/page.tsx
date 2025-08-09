import { Metadata } from "next";
import { getAllPosts } from "@/lib/api";
import { BlogCard } from "@/components/BlogCard";
import { SearchInput } from "@/components/SearchInput";
import { FilterBar } from "@/components/FilterBar";
import Pagination from "@/components/Pagination";
import { AnimatedHeading } from "@/components/AnimatedHeading"; // new client component import

export const metadata: Metadata = {
  title: "Blog | Mahafuj Ahamed",
  description: "Insights, tutorials, and thoughts on blockchain development by Mahafuj Ahamed.",
};

export default async function BlogPage({ searchParams }: { searchParams?: { page?: string } }) {
  const currentPage = Number(searchParams?.page) || 1;
  const postsPerPage = 6;

  const { posts, total } = await getAllPosts(currentPage, postsPerPage);
  const safePosts = Array.isArray(posts) ? posts : [];
  const uniqueTags = [...new Set(safePosts.flatMap((post: any) => post.tags || []))];
  const totalPages = Math.ceil(total / postsPerPage);


  return (
    <div className="container mx-auto px-4 py-8">
      <AnimatedHeading>My Blog</AnimatedHeading>

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
