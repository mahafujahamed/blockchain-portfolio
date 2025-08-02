import { Metadata } from "next";
import PostsList from "@/components/posts/PostsList";

export const metadata: Metadata = {
  title: "Blog – Mahafuj Ahamed",
  description:
    "Read blockchain development articles and insights by Mahafuj Ahamed. Topics include smart contracts, Web3 tools, Solidity tips, and more.",
};

export default function BlogPage() {
  return (
    <main className="px-6 md:px-12 lg:px-24 py-12 space-y-8">
      <h1 className="text-3xl font-bold text-center">My Blog Posts</h1>
      <PostsList />
    </main>
  );
}
