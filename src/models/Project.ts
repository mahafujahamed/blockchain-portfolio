import mongoose, { Schema, Document } from 'mongoose';

export interface ProjectDocument extends Document {
  title: string;
  description: string;
  image: string;
  github?: string;
  demo?: string;
  tags: string[];
}

const ProjectSchema = new Schema<ProjectDocument>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    github: { type: String },
    demo: { type: String },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

const Project = mongoose.models.Project || mongoose.model<ProjectDocument>('Project', ProjectSchema);
export default Project;
