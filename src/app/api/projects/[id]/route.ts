import { connectDB } from "@/lib/mongoose";
import Project from "@/lib/models/Project";
import { verifyFirebaseToken } from "@/lib/firebaseAdmin";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

// GET SINGLE PROJECT
export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const project = await Project.findById(params.id);
    if (!project) return NextResponse.json({ message: "Project not found" }, { status: 404 });
    return NextResponse.json(project, { status: 200 });
  } catch (error) {
    console.error("GET project error:", error);
    return NextResponse.json({ message: "Failed to fetch project" }, { status: 500 });
  }
}

// UPDATE PROJECT
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const token = req.headers.get("authorization")?.split("Bearer ")[1];
  if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    await verifyFirebaseToken(token);
    const data = await req.json();
    await connectDB();

    const updated = await Project.findByIdAndUpdate(params.id, data, { new: true });
    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    console.error("PUT project error:", error);
    return NextResponse.json({ message: "Failed to update project" }, { status: 500 });
  }
}

// DELETE PROJECT
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const token = req.headers.get("authorization")?.split("Bearer ")[1];
  if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  try {
    await verifyFirebaseToken(token);
    await connectDB();

    await Project.findByIdAndDelete(params.id);
    return NextResponse.json({ message: "Project deleted" }, { status: 200 });
  } catch (error) {
    console.error("DELETE project error:", error);
    return NextResponse.json({ message: "Failed to delete project" }, { status: 500 });
  }
}
