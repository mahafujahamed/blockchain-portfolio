import { Post } from '@/models/Post';
import { connectDB } from './mongoose';

export async function getAllPosts() {
  await connectDB();
  return await Post.find().sort({ createdAt: -1 }).lean();
}

export async function getPostBySlug(slug: string) {
  await connectDB();
  return await Post.findOne({ slug }).lean();
}
