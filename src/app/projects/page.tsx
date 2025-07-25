// src/app/projects/page.tsx

import Link from 'next/link';
import Image from 'next/image';
import { ProjectType } from '@/types/ProjectType';

export const dynamic = 'force-dynamic';

export default async function ProjectsPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/projects`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    return (
      <div className="text-center mt-10 text-red-500">
        Failed to load projects.
      </div>
    );
  }

  const projects: ProjectType[] = await res.json();

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">Projects</h1>

      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Link
            key={project._id}
            href={`/projects/${project.slug}`}
            className="border rounded-xl p-4 hover:shadow-lg transition"
          >
            <Image
              src={project.imageUrls?.[0] || '/placeholder.jpg'}
              alt={project.title}
              width={500}
              height={300}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
            <p className="text-gray-600 line-clamp-3">
              {project.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
