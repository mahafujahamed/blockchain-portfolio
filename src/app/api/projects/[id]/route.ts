import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import ProjectModel from '@/models/Project';

export async function GET(req: Request, context: any) {
  const { id } = context.params;

  await connectDB();

  const project = await ProjectModel.findById(id).lean();

  if (!project) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }

  return NextResponse.json(project);
}
