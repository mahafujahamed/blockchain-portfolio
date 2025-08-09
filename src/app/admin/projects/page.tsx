// src/app/admin/projects/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function AdminProjectsPage() {
  const { token } = useAuth();
  const [projects, setProjects] = useState<any[]>([]);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to load projects");
        return res.json();
      })
      .then((data) => setProjects(Array.isArray(data.projects) ? data.projects : data))
      .catch((e) => setErr(e.message));
  }, [token]);

  async function handleDelete(id: string) {
    if (!confirm("Delete this project?")) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Delete failed");
      setProjects((p) => p.filter((x) => x._id !== id));
    } catch (e: any) {
      alert(e.message || "Delete failed");
    }
  }

  if (!token) return <p>Please log in to manage projects.</p>;
  if (err) return <p className="text-red-600">{err}</p>;
  if (!projects.length) return <p>No projects found</p>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Projects</h2>
        <Link href="/admin/projects/create"><a className="px-3 py-1 bg-green-600 text-white rounded">Create Project</a></Link>
      </div>

      <ul className="space-y-3">
        {projects.map((p) => (
          <li key={p._id} className="p-4 bg-white dark:bg-neutral-800 rounded shadow flex justify-between items-center">
            <div>
              <h3 className="font-semibold">{p.title}</h3>
              <p className="text-sm text-neutral-500">{p.description}</p>
            </div>
            <div className="flex gap-3">
              <Link href={`/admin/projects/${p._id}/edit`}><a className="text-blue-600">Edit</a></Link>
              <button onClick={() => handleDelete(p._id)} className="text-red-600">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
