import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import { Post } from '@/models/Post';

export const runtime = 'nodejs';

export async function GET() {
  await connectDB();
  const posts = await Post.find().sort({ createdAt: -1 });
  return NextResponse.json(posts);
}
