import { connectDB } from './mongodb';
import ProjectModel from '@/models/Project';
import { Types } from 'mongoose';

export const getAllProjects = async () => {
  await connectDB();
  const projects = await ProjectModel.find().sort({ createdAt: -1 });

  return projects.map((project) => ({
    _id: (project._id as Types.ObjectId).toHexString(),
    title: project.title,
    description: project.description,
    image: project.image,
    url: project.url,
    github: project.github,
    createdAt: project.createdAt,
  }));
};
