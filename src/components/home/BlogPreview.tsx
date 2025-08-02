"use client";
import useSWR from "swr";
import PostCard from "../PostCard";

export default function BlogPreview() {
  const { data: posts } = useSWR("/api/posts?limit=3", fetcher);

  if (!posts) return null;

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Latest Articles</h2>
      <div className="space-y-4">
        {posts.map((post: any) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </section>
  );
}
