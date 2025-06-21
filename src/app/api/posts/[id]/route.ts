// src/app/api/posts/[id]/route.ts

import { NextRequest } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Post from '@/models/Post';
import { verifyFirebaseAuth } from '@/lib/authUtils';

export async function GET(_: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const post = await Post.findById(params.id);
  if (!post) {
    return new Response(JSON.stringify({ message: 'Post not found' }), { status: 404 });
  }
  return new Response(JSON.stringify(post), { status: 200 });
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const token = req.headers.get('authorization')?.split('Bearer ')[1];
  const isVerified = await verifyFirebaseAuth(token);
  if (!isVerified) return new Response('Unauthorized', { status: 401 });

  const data = await req.json();
  await connectDB();
  const updatedPost = await Post.findByIdAndUpdate(params.id, data, { new: true });
  return new Response(JSON.stringify(updatedPost), { status: 200 });
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const token = req.headers.get('authorization')?.split('Bearer ')[1];
  const isVerified = await verifyFirebaseAuth(token);
  if (!isVerified) return new Response('Unauthorized', { status: 401 });

  await connectDB();
  await Post.findByIdAndDelete(params.id);
  return new Response(JSON.stringify({ message: 'Post deleted' }), { status: 200 });
}
