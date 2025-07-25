export interface Project {
  _id: string;
  title: string;
  description: string;
  imageUrls: string[];
  github: string;
  live: string;
  techStack: string[];
  createdAt?: string;
  updatedAt?: string;
}
