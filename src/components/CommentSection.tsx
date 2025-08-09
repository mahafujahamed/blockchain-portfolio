// components/CommentSection.tsx
"use client";

import { useEffect, useState } from "react";
import { getComments, postComment } from "@/lib/api";

export default function CommentSection({ slug }: { slug: string }) {
  const [comments, setComments] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getComments(slug).then(setComments);
  }, [slug]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!name || !message) return;

    setLoading(true);
    try {
      await postComment(slug, { name, message });
      const updated = await getComments(slug);
      setComments(updated);
      setName("");
      setMessage("");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10">
      <h3 className="text-xl font-semibold mb-4">Leave a Comment</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Your Comment"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-2 border rounded"
          rows={4}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>

      <div className="mt-8 space-y-4">
        {comments.length === 0 ? (
          <p className="text-gray-500">No comments yet.</p>
        ) : (
          comments.map((c, i) => (
            <div key={i} className="border-t pt-4">
              <p className="text-sm text-gray-700 dark:text-gray-200">
                <strong>{c.name}</strong> says:
              </p>
              <p className="text-gray-800 dark:text-gray-100">{c.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
