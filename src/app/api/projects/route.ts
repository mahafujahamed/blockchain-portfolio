import { connectDB } from "@/lib/mongoose";
import Project from "@/lib/models/Project";
import { verifyFirebaseToken } from "@/lib/firebaseAdmin";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

// GET ALL PROJECTS
export async function GET() {
  try {
    await connectDB();
    const projects = await Project.find().sort({ createdAt: -1 });
    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    console.error("Fetch projects error:", error);
    return NextResponse.json({ message: "Failed to fetch projects" }, { status: 500 });
  }
}

// CREATE NEW PROJECT
export async function POST(req: Request) {
  const token = req.headers.get("authorization")?.split("Bearer ")[1];
  if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    await verifyFirebaseToken(token);
    const body = await req.json();

    await connectDB();
    const newProject = await Project.create(body);
    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    console.error("Project POST error:", error);
    return NextResponse.json({ message: "Failed to create project" }, { status: 500 });
  }
}
