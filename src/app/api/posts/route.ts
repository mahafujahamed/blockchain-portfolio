import { NextResponse } from 'next/server';
import { getPosts, createPost } from '@/lib/firestore';

export async function GET() {
  const posts = await getPosts();
  return NextResponse.json(posts);
}

export async function POST(req: Request) {
  const data = await req.json();
  const id = await createPost(data);
  return NextResponse.json({ id });
}
