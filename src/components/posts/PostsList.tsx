"use client";
import useSWR from "swr";
import PostCard from "../PostCard";
import { fetcher } from "@/lib/api";

export default function PostsList() {
  const { data: posts, error, isLoading } = useSWR("/api/posts", fetcher);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to load posts.</p>;
  if (!posts?.length) return <p>No blog posts found.</p>;

  return (
    <div className="space-y-6">
      {posts.map((post: any) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
}
