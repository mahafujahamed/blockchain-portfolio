"use client";
import useSWR from "swr";
import ProjectCard from "../ProjectCard";
import { fetcher } from "@/lib/api";

export default function ProjectsList() {
  const { data: projects, error, isLoading } = useSWR("/api/projects", fetcher);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to load projects.</p>;
  if (!projects?.length) return <p>No projects found.</p>;

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {projects.map((project: any) => (
        <ProjectCard key={project._id} project={project} />
      ))}
    </div>
  );
}
