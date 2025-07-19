import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import { Post } from '@/models/Post';

export const runtime = 'nodejs';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  await connectDB();
  const post = await Post.findById(resolvedParams.id);
  if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(post);
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  await connectDB();
  const data = await req.json();
  const updatedPost = await Post.findByIdAndUpdate(resolvedParams.id, data, {
    new: true,
  });
  if (!updatedPost)
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  return NextResponse.json(updatedPost);
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  await connectDB();
  const deletedPost = await Post.findByIdAndDelete(resolvedParams.id);
  if (!deletedPost)
    return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  return NextResponse.json({ message: 'Deleted successfully' });
}
