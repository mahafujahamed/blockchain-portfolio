// src/app/api/posts/[id]/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Post from '@/models/Post';
import { adminAuth } from '@/lib/firebaseAdmin';

function getIdFromRequest(req: NextRequest) {
  // Extract id from the URL path: /api/posts/{id}
  const url = new URL(req.url);
  const segments = url.pathname.split('/');
  return segments[segments.length - 1]; // last segment is id
}

export async function GET(req: NextRequest) {
  const id = getIdFromRequest(req);

  await connectDB();

  try {
    const post = await Post.findById(id);
    if (!post) {
      return NextResponse.json({ message: 'Post not found' }, { status: 404 });
    }
    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.error('GET error:', error);
    return NextResponse.json({ message: 'Failed to fetch post' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const id = getIdFromRequest(req);

  const token = req.headers.get('authorization')?.split('Bearer ')[1];
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    await adminAuth.verifyIdToken(token);
  } catch (error) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  await connectDB();
  const data = await req.json();

  try {
    const updatedPost = await Post.findByIdAndUpdate(id, data, { new: true });
    return NextResponse.json(updatedPost, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Update failed' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const id = getIdFromRequest(req);

  const token = req.headers.get('authorization')?.split('Bearer ')[1];
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    await adminAuth.verifyIdToken(token);
  } catch (error) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }

  await connectDB();

  try {
    await Post.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Post deleted' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Delete failed' }, { status: 500 });
  }
}
