"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Trash, Pencil } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchProjects() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects`);
      const data = await res.json();
      setProjects(data);
    }
    fetchProjects();
  }, []);

  async function handleDelete(id: string) {
    const confirm = window.confirm("Are you sure you want to delete this project?");
    if (!confirm) return;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects/${id}`,
      { method: "DELETE" }
    );
    if (res.ok) {
      setProjects(projects.filter((p: any) => p._id !== id));
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Projects</h1>
        <Link
          href="/admin/projects/create"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + New Project
        </Link>
      </div>

      <div className="space-y-4">
        {projects.length === 0 && <p>No projects found.</p>}
        {projects.map((project: any) => (
          <div
            key={project._id}
            className="border rounded p-4 flex justify-between items-center"
          >
            <div>
              <h2 className="font-semibold">{project.title}</h2>
              <p className="text-sm text-gray-500">{project.description}</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => router.push(`/admin/projects/edit/${project._id}`)}
                className="text-blue-600 hover:text-blue-800"
              >
                <Pencil size={18} />
              </button>
              <button
                onClick={() => handleDelete(project._id)}
                className="text-red-600 hover:text-red-800"
              >
                <Trash size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
