import express from 'express';
import { verifyFirebaseToken } from '../middleware/firebaseAuth.js';
import Post from '../models/Post.js';
import Project from '../models/Project.js';
import Contact from '../models/Contact.js';

const router = express.Router();

router.get('/dashboard-summary', verifyFirebaseToken, async (req, res) => {
  try {
    const posts = await Post.countDocuments();
    const projects = await Project.countDocuments();
    const contacts = await Contact.countDocuments();

    res.json({ posts, projects, contacts });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch dashboard summary' });
  }
});

export default router;
