import { notFound } from 'next/navigation';
import { ProjectType } from '@/types/ProjectType';
import Image from 'next/image';

type Props = {
  params: { slug: string };
};

export default async function ProjectPage({ params }: Props) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/projects/${params.slug}`, {
    cache: 'no-store',
  });

  if (!res.ok) return notFound();

  const project: ProjectType = await res.json();

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
      <Image
        src={project.imageUrls?.[0] || '/placeholder.jpg'}
        alt={project.title}
        width={600}
        height={400}
        className="rounded-xl w-full h-auto object-cover"
      />
      <p className="mt-4 text-lg text-gray-700">{project.description}</p>
    </div>
  );
}
