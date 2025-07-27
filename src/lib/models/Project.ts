// src/lib/models/Project.ts

import { Schema, models, model } from "mongoose";

const ProjectSchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    image: String,
    githubUrl: String,
    liveUrl: String,
    tags: [String],
  },
  { timestamps: true }
);

const Project = models.Project || model("Project", ProjectSchema);
export default Project;
