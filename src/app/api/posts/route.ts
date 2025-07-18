import { connectToDatabase } from '@/lib/mongodb';
import { Post } from '@/models/Post';
import { NextResponse } from 'next/server';

export async function GET() {
  await connectToDatabase();
  const posts = await Post.find().sort({ createdAt: -1 });
  return NextResponse.json(posts);
}
