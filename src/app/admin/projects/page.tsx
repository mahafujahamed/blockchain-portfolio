import AdminNavbar from '@/components/admin/AdminNavbar';
import ProjectCard from '@/components/admin/ProjectCard';
import { getAllProjects } from '@/lib/projectService';
import { Project } from '@/types';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default async function AdminProjectsPage() {
  const projects: Project[] = await getAllProjects();

  return (
    <div>
      <AdminNavbar />
      <div className="max-w-5xl mx-auto py-10 px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Projects</h1>
          <Link href="/admin/projects/create">
            <Button>Add New</Button>
          </Link>
        </div>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project: Project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
