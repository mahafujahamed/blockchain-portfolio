// Basic example: Add GET and POST handlers for MongoDB blog posts

import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  const client = await clientPromise;
  const db = client.db('portfolio');
  const posts = await db.collection('posts').find().toArray();
  return NextResponse.json(posts);
}

export async function POST(req: Request) {
  const client = await clientPromise;
  const db = client.db('portfolio');
  const body = await req.json();
  const result = await db.collection('posts').insertOne(body);
  return NextResponse.json(result);
}
