// src/app/api/posts/route.ts
import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { Post } from '@/types';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const posts = await db.collection<Post>('posts').find().toArray();
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, content } = body;

    if (!title || !content) {
      return NextResponse.json({ error: 'Missing title or content' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();
    const result = await db.collection<Post>('posts').insertOne({ title, content });

    // Return inserted document 
    const insertedPost = await db.collection<Post>('posts').findOne({ _id: result.insertedId });

    return NextResponse.json(insertedPost);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}
