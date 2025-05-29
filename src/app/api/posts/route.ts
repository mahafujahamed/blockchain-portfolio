// src/app/api/posts/route.ts
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const client = await clientPromise;
  const posts = await client.db().collection('posts').find({}).toArray();
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const client = await clientPromise;
  const result = await client.db().collection('posts').insertOne(body);
  return NextResponse.json(result);
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const client = await clientPromise;
  const { _id, ...update } = body;

  const result = await client.db().collection('posts').updateOne(
    { _id: new ObjectId(_id) },
    { $set: update }
  );
  return NextResponse.json(result);
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const client = await clientPromise;
  const result = await client.db().collection('posts').deleteOne({
    _id: new ObjectId(id),
  });
  return NextResponse.json(result);
}
