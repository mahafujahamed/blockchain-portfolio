// src/app/api/posts/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { verifyIdToken } from '@/lib/firebaseAdmin';

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const decoded = await verifyIdToken(token);
    if (!decoded) return NextResponse.json({ error: 'Invalid token' }, { status: 401 });

    const { title, content, image } = await req.json();
    if (!title || !content || !image) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const db = await connectDB();
    const result = await db.collection('posts').insertOne({
      title,
      content,
      image,
      createdAt: new Date(),
    });

    return NextResponse.json({ message: 'Post created', id: result.insertedId }, { status: 201 });
  } catch (err) {
    console.error('POST /api/posts error:', err);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}
