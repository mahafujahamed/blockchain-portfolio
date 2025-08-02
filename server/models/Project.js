import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  githubLink: String,
  liveLink: String,
  techStack: [String],
  coverImage: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Project', projectSchema);
