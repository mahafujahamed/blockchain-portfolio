'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ProjectForm from '@/components/ProjectForm';
import { Project } from '@/lib/models/Project';
import { getProjectById } from '@/lib/actions/project.actions';

const EditProjectPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      if (!id || typeof id !== 'string') return;

      try {
        const projectData = await getProjectById(id);
        setProject(projectData);
      } catch (error) {
        console.error('Failed to fetch project:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!project) return <div>Project not found</div>;

  return (
    <section className="p-4 md:p-6 lg:p-10">
      <h1 className="text-3xl font-bold mb-4">Edit Project</h1>
      <ProjectForm type="edit" project={project} />
    </section>
  );
};

export default EditProjectPage;
