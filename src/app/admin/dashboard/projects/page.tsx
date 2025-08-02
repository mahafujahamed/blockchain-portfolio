"use client";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import axios from "axios";

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    githubLink: "",
    liveLink: "",
    techStack: "",
    coverImage: ""
  });
  const [editingId, setEditingId] = useState(null);

  const fetchProjects = async () => {
    const res = await axios.get("/api/projects");
    setProjects(res.data);
  };

  const handleSubmit = async () => {
    const token = await auth.currentUser?.getIdToken();
    const payload = {
      ...form,
      techStack: form.techStack.split(",").map(t => t.trim()),
    };

    if (editingId) {
      await axios.put(`/api/projects/${editingId}`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } else {
      await axios.post("/api/projects", payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
    }

    setForm({ title: "", description: "", githubLink: "", liveLink: "", techStack: "", coverImage: "" });
    setEditingId(null);
    fetchProjects();
  };

  const handleEdit = (project: any) => {
    setForm({
      title: project.title,
      description: project.description,
      githubLink: project.githubLink,
      liveLink: project.liveLink,
      techStack: project.techStack.join(", "),
      coverImage: project.coverImage,
    });
    setEditingId(project._id);
  };

  const handleDelete = async (id: string) => {
    const token = await auth.currentUser?.getIdToken();
    await axios.delete(`/api/projects/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchProjects();
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Manage Projects</h1>

      <div className="mb-6 space-y-2">
        <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Title" className="w-full p-2 border rounded" />
        <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Description" className="w-full p-2 border rounded" />
        <input value={form.githubLink} onChange={e => setForm({ ...form, githubLink: e.target.value })} placeholder="GitHub Link" className="w-full p-2 border rounded" />
        <input value={form.liveLink} onChange={e => setForm({ ...form, liveLink: e.target.value })} placeholder="Live Site Link" className="w-full p-2 border rounded" />
        <input value={form.coverImage} onChange={e => setForm({ ...form, coverImage: e.target.value })} placeholder="Cover Image URL" className="w-full p-2 border rounded" />
        <input value={form.techStack} onChange={e => setForm({ ...form, techStack: e.target.value })} placeholder="Tech Stack (comma separated)" className="w-full p-2 border rounded" />
        <button onClick={handleSubmit} className="bg-green-600 text-white px-4 py-2 rounded">
          {editingId ? "Update Project" : "Create Project"}
        </button>
      </div>

      <hr className="my-6" />

      <ul className="space-y-3">
        {projects.map((p: any) => (
          <li key={p._id} className="p-4 border rounded flex justify-between">
            <div>
              <strong>{p.title}</strong>
              <p className="text-sm text-gray-500">{p.githubLink}</p>
            </div>
            <div className="space-x-2">
              <button onClick={() => handleEdit(p)} className="text-blue-600">Edit</button>
              <button onClick={() => handleDelete(p._id)} className="text-red-600">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
