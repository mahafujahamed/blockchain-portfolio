import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import ProjectModel from '@/models/Project';
import { verifyToken } from '@/lib/verifyToken';

export async function GET() {
  await connectDB();
  const projects = await ProjectModel.find().sort({ createdAt: -1 });
  return NextResponse.json(projects);
}

export async function POST(req: Request) {
  await verifyToken();
  await connectDB();

  const data = await req.json();
  try {
    const newProject = await ProjectModel.create(data);
    return NextResponse.json(newProject);
  } catch (err) {
    return NextResponse.json({ message: 'Create failed' }, { status: 500 });
  }
}
