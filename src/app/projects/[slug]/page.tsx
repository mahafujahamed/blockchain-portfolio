// src/app/projects/[slug]/page.tsx

import { notFound } from 'next/navigation';
import { ProjectType } from '@/types/ProjectType';
import Image from 'next/image';

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/projects/${slug}`, {
    cache: 'no-store',
  });

  if (!res.ok) return notFound();

  const project: ProjectType = await res.json();

  return (
    <main className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-6">{project.title}</h1>
      <Image
        src={project.imageUrls?.[0] || '/placeholder.jpg'}
        alt={project.title}
        width={800}
        height={450}
        className="rounded-xl object-cover w-full"
        priority
      />
      <p className="mt-6 text-lg text-gray-700">{project.description}</p>
    </main>
  );
}
