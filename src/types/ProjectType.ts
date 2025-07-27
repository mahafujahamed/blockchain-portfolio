// types/projectType.ts

export interface ProjectType {
  _id?: string; // MongoDB document ID (optional when creating)
  title: string;
  description: string;
  imageUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  techStack?: string[];
  category?: string;
  createdAt?: string;
  updatedAt?: string;
}
