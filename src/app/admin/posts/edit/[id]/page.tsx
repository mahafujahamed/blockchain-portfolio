"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch post data
  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blog/${id}`
        );
        const data = await res.json();
        setTitle(data.title);
        setDescription(data.description);
        setContent(data.content);
        setTags(data.tags?.join(", ") || "");
      } catch (err) {
        console.error("Failed to fetch post:", err);
      }
    }
    if (id) fetchPost();
  }, [id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const updatedPost = {
      title,
      description,
      content,
      tags: tags.split(",").map((tag) => tag.trim()),
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blog/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedPost),
        }
      );

      if (res.ok) {
        router.push("/admin/posts");
      } else {
        console.error("Failed to update post");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Edit Post</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded px-3 py-2"
            rows={2}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border rounded px-3 py-2"
            rows={10}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Tags (comma separated)</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="flex justify-between items-center">
          <Link href="/admin/posts" className="text-blue-500 hover:underline">
            Cancel
          </Link>

          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {loading ? "Updating..." : "Update Post"}
          </button>
        </div>
      </form>
    </div>
  );
}
