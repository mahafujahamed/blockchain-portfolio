"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateProjectPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const newProject = {
      title,
      description,
      link,
      tags: tags.split(",").map((tag) => tag.trim()),
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProject),
    });

    if (res.ok) {
      router.push("/admin/projects");
    } else {
      alert("Failed to create project");
    }

    setLoading(false);
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create Project</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            className="w-full border px-3 py-2 rounded"
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Live Link (optional)</label>
          <input
            type="url"
            className="w-full border px-3 py-2 rounded"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Tags (comma-separated)</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Creating..." : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
}
