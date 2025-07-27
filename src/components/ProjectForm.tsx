'use client';

import { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { ProjectType } from '@/types/ProjectType';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface Props {
  project?: ProjectType;
}

export default function ProjectForm({ project }: Props) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: project?.title || '',
    description: project?.description || '',
    imageUrl: project?.imageUrl || '',
    liveUrl: project?.liveUrl || '',
    githubUrl: project?.githubUrl || '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const method = project ? 'PUT' : 'POST';
    const url = project ? `/api/projects/${project._id}` : '/api/projects';

    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      router.push('/admin');
    } else {
      alert('Failed to save project');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Project Title"
        required
      />
      <Textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        required
      />
      <Input
        name="imageUrl"
        value={formData.imageUrl}
        onChange={handleChange}
        placeholder="Image URL"
      />
      <Input
        name="liveUrl"
        value={formData.liveUrl}
        onChange={handleChange}
        placeholder="Live Demo URL"
      />
      <Input
        name="githubUrl"
        value={formData.githubUrl}
        onChange={handleChange}
        placeholder="GitHub Repository URL"
      />
      <Button type="submit">{project ? 'Update' : 'Create'} Project</Button>
    </form>
  );
}
