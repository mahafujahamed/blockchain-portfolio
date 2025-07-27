import { connectDB } from "@/lib/mongoose";
import Project from "@/lib/models/Project";
import { ProjectType } from "@/types/ProjectType";

// CREATE PROJECT
export async function createProject(projectData: ProjectType) {
  try {
    await connectDB();
    const newProject = new Project(projectData);
    await newProject.save();
    return newProject;
  } catch (error) {
    console.error("Create project error:", error);
    throw new Error("Failed to create project");
  }
}

// UPDATE PROJECT
export async function updateProject(id: string, projectData: Partial<ProjectType>) {
  try {
    await connectDB();
    const updated = await Project.findByIdAndUpdate(id, projectData, { new: true });
    return updated;
  } catch (error) {
    console.error("Update project error:", error);
    throw new Error("Failed to update project");
  }
}

// DELETE PROJECT
export async function deleteProject(id: string) {
  try {
    await connectDB();
    await Project.findByIdAndDelete(id);
    return { message: "Project deleted successfully" };
  } catch (error) {
    console.error("Delete project error:", error);
    throw new Error("Failed to delete project");
  }
}

// GET SINGLE PROJECT
export async function getProjectById(id: string) {
  try {
    await connectDB();
    const project = await Project.findById(id);
    return project;
  } catch (error) {
    console.error("Get project error:", error);
    throw new Error("Failed to fetch project");
  }
}
