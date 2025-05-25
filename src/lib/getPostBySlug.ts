import clientPromise from './mongodb';
import { Post } from '@/types';

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const client = await clientPromise;
  const db = client.db();
  const post = await db.collection<Post>('posts').findOne({ slug });
  return post;
}
