// src/lib/posts.ts
import clientPromise from './mongodb';

export async function getPosts() {
  const client = await clientPromise;
  const db = client.db('postdb');
  return db.collection('posts').find({}).toArray();
}

export async function getPostBySlug(slug: string) {
  const client = await clientPromise;
  const db = client.db('postdb');
  return db.collection('posts').findOne({ slug });
}
