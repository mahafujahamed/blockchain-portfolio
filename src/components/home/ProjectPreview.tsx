"use client";
import useSWR from "swr";
import { motion } from "framer-motion";
import ProjectCard from "../ProjectCard";
import { fetcher } from "@/lib/api";

export default function ProjectPreview() {
  const { data: projects } = useSWR("/api/projects?limit=3", fetcher);

  if (!projects) return null;

  return (
    <motion.section
      className="space-y-4"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-2xl font-semibold">Recent Projects</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {projects.map((proj: any) => (
          <ProjectCard key={proj._id} project={proj} />
        ))}
      </div>
    </motion.section>
  );
}
