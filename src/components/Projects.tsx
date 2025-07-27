'use client';

import { useEffect, useState } from 'react';
import { ProjectType } from '@/types/ProjectType';


export default function Projects() {
  const [projects, setProjects] = useState<ProjectType[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await fetch('/api/projects');
      const data = await res.json();
      setProjects(data);
    };

    fetchProjects();
  }, []);

  return (
    <section className="p-4">
      <h2 className="text-2xl font-bold mb-4">Projects</h2>
      <div className="space-y-4">
        {projects.map(project => (
          <div key={project._id} className="border p-4 rounded shadow">
            <h3 className="text-xl font-semibold">{project.title}</h3>
            <p>{project.description}</p>
            {project.liveUrl && (
              <a href={project.liveUrl} className="text-blue-600 underline" target="_blank" rel="noreferrer">
                Visit Live
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
