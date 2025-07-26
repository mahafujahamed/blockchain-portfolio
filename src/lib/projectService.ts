import { connectDB } from './mongodb';
import ProjectModel from '@/models/Project';

export async function getAllProjects() {
  await connectDB();

  const projects = await ProjectModel.find().lean();

  return projects.map((project: any) => ({
    _id: project._id.toString(),
    title: project.title,
    description: project.description,
    image: project.image,
    url: project.url,
    github: project.github,
    createdAt: project.createdAt?.toISOString?.() || '',
    imageUrls: project.imageUrls || [],
    live: project.live ?? false,
    techStack: project.techStack || [],
  }));
}
