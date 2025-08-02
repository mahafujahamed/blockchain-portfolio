import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: String,
  slug: String,
  content: String,
  coverImage: String,
  tags: [String],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Post', postSchema);
