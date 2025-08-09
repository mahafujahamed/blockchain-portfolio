// src/components/Projects.tsx
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

interface Project {
  _id: string;
  title: string;
  description: string;
  image: string;
  github: string;
  demo: string;
  tags: string[];
}

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/projects`);
        if (!res.ok) throw new Error("Failed to fetch projects");
        const data = await res.json();
        // Defensive: if data.projects exists, use it, else fallback to data
        setProjects(Array.isArray(data.projects) ? data.projects : data);
      } catch (error) {
        console.error("Failed to fetch projects", error);
        setProjects([]);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-neutral-900">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-12 text-center text-neutral-800 dark:text-white">
          Projects
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <motion.div
              key={project._id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="bg-white dark:bg-neutral-800 shadow-md hover:shadow-lg transition-shadow rounded-2xl overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-48 w-full object-cover"
                />
                <CardContent className="p-5">
                  <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-300 text-sm mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      GitHub →
                    </a>
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-green-600 dark:text-green-400 hover:underline"
                      >
                        Live Demo →
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
