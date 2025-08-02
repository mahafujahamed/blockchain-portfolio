"use client";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AdminPostsPage() {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({ title: "", slug: "", content: "", tags: "" });
  const [editingId, setEditingId] = useState(null);

  const fetchPosts = async () => {
    const res = await axios.get("/api/posts");
    setPosts(res.data);
  };

  const handleSubmit = async () => {
    const token = await auth.currentUser?.getIdToken();
    const payload = {
      ...form,
      tags: form.tags.split(",").map(t => t.trim()),
    };

    if (editingId) {
      await axios.put(`/api/posts/${editingId}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } else {
      await axios.post("/api/posts", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }

    setForm({ title: "", slug: "", content: "", tags: "" });
    setEditingId(null);
    fetchPosts();
  };

  const handleEdit = (post: any) => {
    setForm({
      title: post.title,
      slug: post.slug,
      content: post.content,
      tags: post.tags.join(", "),
    });
    setEditingId(post._id);
  };

  const handleDelete = async (id: string) => {
    const token = await auth.currentUser?.getIdToken();
    await axios.delete(`/api/posts/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchPosts();
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Manage Posts</h1>

      <div className="mb-6 space-y-2">
        <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Title" className="w-full p-2 border rounded" />
        <input value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} placeholder="Slug" className="w-full p-2 border rounded" />
        <textarea value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} placeholder="Content" className="w-full p-2 border rounded" />
        <input value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} placeholder="Tags (comma separated)" className="w-full p-2 border rounded" />
        <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">
          {editingId ? "Update Post" : "Create Post"}
        </button>
      </div>

      <hr className="my-6" />

      <ul className="space-y-2">
        {posts.map((post: any) => (
          <li key={post._id} className="p-3 border rounded flex justify-between">
            <div>
              <strong>{post.title}</strong>
              <p className="text-sm text-gray-500">{post.slug}</p>
            </div>
            <div className="space-x-2">
              <button onClick={() => handleEdit(post)} className="text-blue-600">Edit</button>
              <button onClick={() => handleDelete(post._id)} className="text-red-600">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
