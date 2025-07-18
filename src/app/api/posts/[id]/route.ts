export const runtime = 'nodejs';

import clientPromise from '@/lib/mongodb';
import { Post } from '@/models/Post';
import { NextResponse } from 'next/server';

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const client = await clientPromise;
  const db = client.db();
  
  const post = await Post.findById(params.id);
  if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  return NextResponse.json(post);
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const client = await clientPromise;
  const db = client.db();

  const body = await req.json();
  const updated = await Post.findByIdAndUpdate(params.id, body, { new: true });
  return NextResponse.json(updated);
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const client = await clientPromise;
  const db = client.db();

  await Post.findByIdAndDelete(params.id);
  return NextResponse.json({ message: 'Deleted' });
}
