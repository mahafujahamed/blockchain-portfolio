// src/app/api/posts/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { connectDB } from '@/lib/mongodb';
import { verifyIdToken } from '@/lib/firebaseAdmin';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const client = await connectDB();
    const db = client.db(); // ✅ fix: get the DB instance
    const post = await db.collection('posts').findOne({ _id: new ObjectId(params.id) });

    if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 });

    return NextResponse.json({
      ...post,
      _id: post._id.toString(),
      createdAt: post.createdAt?.toISOString?.() || '',
    });
  } catch (error) {
    console.error('[GET /api/posts/[id]]', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const token = req.cookies.get('token')?.value;
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    await verifyIdToken(token);
    const { title, content, image } = await req.json();

    const client = await connectDB();
    const db = client.db();

    const result = await db.collection('posts').updateOne(
      { _id: new ObjectId(params.id) },
      { $set: { title, content, image } }
    );

    return NextResponse.json({ message: 'Post updated', result });
  } catch (error) {
    console.error('[PUT /api/posts/[id]]', error);
    return NextResponse.json({ error: 'Unauthorized or error occurred' }, { status: 401 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const token = req.cookies.get('token')?.value;
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    await verifyIdToken(token);

    const client = await connectDB();
    const db = client.db();

    const result = await db.collection('posts').deleteOne({ _id: new ObjectId(params.id) });

    return NextResponse.json({ message: 'Post deleted', result });
  } catch (error) {
    console.error('[DELETE /api/posts/[id]]', error);
    return NextResponse.json({ error: 'Unauthorized or error occurred' }, { status: 401 });
  }
}
