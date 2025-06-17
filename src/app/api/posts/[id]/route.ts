import { NextResponse } from 'next/server';
import { getPostById, updatePost, deletePost } from '@/lib/firestore';

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const post = await getPostById(params.id);
  return post
    ? NextResponse.json(post)
    : NextResponse.json({ error: 'Not found' }, { status: 404 });
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const data = await req.json();
  await updatePost(params.id, data);
  return NextResponse.json({ success: true });
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  await deletePost(params.id);
  return NextResponse.json({ success: true });
}
