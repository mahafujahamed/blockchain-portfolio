'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Trash2, Pencil } from 'lucide-react';
import toast from 'react-hot-toast';

type Props = {
  project: {
    _id: string;
    title: string;
    description: string;
    imageUrls: string[];
  };
};

export default function ProjectCard({ project }: Props) {
  const router = useRouter();

  const handleDelete = async () => {
    const res = await fetch(`/api/projects/${project._id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      toast.success('Deleted!');
      router.refresh();
    } else {
      toast.error('Failed to delete.');
    }
  };

  return (
    <div className="border rounded-lg shadow-sm overflow-hidden bg-white">
      {project.imageUrls?.[0] && (
        <Image
          src={project.imageUrls[0]}
          alt={project.title}
          width={600}
          height={400}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h2 className="text-lg font-semibold">{project.title}</h2>
        <p className="text-sm text-gray-500">{project.description}</p>
        <div className="flex gap-2 mt-4">
          <Button
            onClick={() => router.push(`/admin/projects/edit/${project._id}`)}
            size="sm"
            variant="outline"
          >
            <Pencil className="w-4 h-4 mr-1" /> Edit
          </Button>
          <Button onClick={handleDelete} size="sm" variant="destructive">
            <Trash2 className="w-4 h-4 mr-1" /> Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
