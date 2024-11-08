const express = require('express');
const router = express.Router();
const Post = require('../models/JobPosts.js'); // Path to your post model

// Create a new job post
router.post('/posts', async (req, res) => {
  try {
    const post = new Post(req.body);
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all job posts
router.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific job post by ID
router.get('/posts/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Job post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a job post by ID
router.put('/posts/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!post) {
      return res.status(404).json({ message: 'Job post not found' });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a job post by ID
router.delete('/posts/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Job post not found' });
    }
    res.status(200).json({ message: 'Job post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get job posts by company name
router.get('/posts/company/:companyName', async (req, res) => {
  try {
    const posts = await Post.find({ companyName: req.params.companyName });
    if (posts.length === 0) {
      return res.status(404).json({ message: 'No job posts found for this company' });
    }
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get job posts by job type (Internship, Part-Time, Full-Time)
router.get('/posts/jobtype/:jobType', async (req, res) => {
  try {
    const posts = await Post.find({ jobType: req.params.jobType });
    if (posts.length === 0) {
      return res.status(404).json({ message: 'No job posts found for this job type' });
    }
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get job posts that are still open (i.e., the last date to apply is in the future)
router.get('/posts/open', async (req, res) => {
  try {
    const posts = await Post.find({ lastDateToApply: { $gte: new Date() } });
    if (posts.length === 0) {
      return res.status(404).json({ message: 'No open job posts found' });
    }
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
