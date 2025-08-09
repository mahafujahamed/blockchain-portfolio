"use client";

import { useEffect, useState } from "react";

type Message = {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
};

export default function AdminContactPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMessages() {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/contact`
      );
      const data = await res.json();
      setMessages(data);
      setLoading(false);
    }
    fetchMessages();
  }, []);

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this message?")) return;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/contact/${id}`,
      { method: "DELETE" }
    );

    if (res.ok) {
      setMessages((prev) => prev.filter((msg) => msg._id !== id));
    } else {
      alert("Failed to delete message.");
    }
  }

  if (loading) return <p>Loading messages...</p>;

  if (messages.length === 0) return <p>No messages found.</p>;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Contact Messages</h1>

      <div className="space-y-6">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className="border p-4 rounded-lg bg-white dark:bg-zinc-900 shadow-sm"
          >
            <div className="flex justify-between items-center mb-2">
              <div>
                <p className="font-semibold">{msg.name}</p>
                <p className="text-sm text-zinc-500">{msg.email}</p>
              </div>
              <button
                onClick={() => handleDelete(msg._id)}
                className="text-red-500 text-sm hover:underline"
              >
                Delete
              </button>
            </div>
            <p className="text-sm">{msg.message}</p>
            <p className="text-xs text-zinc-400 mt-2">
              {new Date(msg.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
