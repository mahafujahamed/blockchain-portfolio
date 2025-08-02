const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

// GET /blog - List all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch blog posts" });
  }
});

// GET /blog/:slug - Get single post
router.get("/:slug", async (req, res) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });

    if (!post) return res.status(404).json({ error: "Post not found" });

    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch post" });
  }
});

// POST /blog - Create post (admin only)
router.post("/", async (req, res) => {
  try {
    const { title, slug, content, excerpt } = req.body;
    const newPost = new Post({ title, slug, content, excerpt });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: "Failed to create post" });
  }
});

// PUT /blog/:id - Update post
router.put("/:id", async (req, res) => {
  try {
    const updated = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Failed to update post" });
  }
});

// DELETE /blog/:id - Delete post
router.delete("/:id", async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete post" });
  }
});

module.exports = router;
