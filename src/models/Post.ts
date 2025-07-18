// src/models/Post.ts
import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  title: String,
  content: String,
  slug: String,
}, { timestamps: true });

export const Post = mongoose.models.Post || mongoose.model('Post', PostSchema);
