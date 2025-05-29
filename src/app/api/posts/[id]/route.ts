import { NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebaseAdmin';
import { connectDB } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

async function verifyAuth(request: Request) {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader) return null;
  const token = authHeader.split('Bearer ')[1];
  if (!token) return null;
  try {
    const decoded = await adminAuth.verifyIdToken(token);
    return decoded;
  } catch (error) {
    return null;
  }
}

// GET a single post
export async function GET(_: Request, { params }: { params: { id: string } }) {
  const db = await connectDB();
  const post = await db.collection('posts').findOne({ _id: new ObjectId(params.id) });
  if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 });
  return NextResponse.json(post);
}

// PUT (Update) a post
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const auth = await verifyAuth(request);
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const db = await connectDB();
  await db.collection('posts').updateOne(
    { _id: new ObjectId(params.id) },
    { $set: { ...body } }
  );
  return NextResponse.json({ message: 'Post updated' });
}

// DELETE a post
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const auth = await verifyAuth(request);
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const db = await connectDB();
  await db.collection('posts').deleteOne({ _id: new ObjectId(params.id) });
  return NextResponse.json({ message: 'Post deleted' });
}
