// src/lib/getPosts.ts
import clientPromise from './mongodb';
import { Post } from '@/types';

export async function getPosts(): Promise<Post[]> {
  const client = await clientPromise;
  const db = client.db();
  const posts = await db.collection('posts').find().toArray();

  // Convert _id to string
  return posts.map((post: any) => ({
    _id: post._id.toString(),
    title: post.title,
    content: post.content,
  }));
}
