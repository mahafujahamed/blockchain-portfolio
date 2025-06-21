import { connectDB } from './mongodb';


export async function getPostBySlug(slug: string) {
  const db = await connectDB();
  const post = await db.collection('posts').findOne({ slug });
  return post;
}
