const express = require('express');
const router = express.Router();
const Post = require('../models/Jobs.js'); // Import your Post model
const Recruiter = require('../models/Recruiter.js'); // Import your Recruiter model

// Create a new job post
router.post('/posts', async (req, res) => {
  try {
    // Extract recruiterId and jobPosts from the request body
    const { recruiterId, jobPosts } = req.body;

    // Check if recruiter exists
    const recruiter = await Recruiter.findById(recruiterId);
    if (!recruiter) {
      return res.status(404).json({ message: 'Recruiter not found' });
    }

    // Create a new post
    const post = new Post({ recruiterId, jobPosts });
    await post.save();
    res.status(201).json(post); // Send back the created post
  } catch (error) {
    res.status(400).json({ error: error.message }); // Handle errors
  }
});

// Get all job posts
router.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find().populate('recruiterId', 'username companyName'); // Populate recruiter info
    res.status(200).json(posts); // Send back all posts
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle errors
  }
});

// Get job posts by recruiter ID
router.get('/posts/recruiter/:recruiterId', async (req, res) => {
  try {
    const posts = await Post.find({ recruiterId: req.params.recruiterId }).populate('recruiterId', 'username companyName');
    if (posts.length === 0) {
      return res.status(404).json({ message: 'No job posts found for this recruiter' });
    }
    res.status(200).json(posts); // Send posts by this recruiter
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle errors
  }
});

// Get job posts filtered by job type (Internship, Part-Time, Full-Time)
router.get('/posts/jobtype/:jobType', async (req, res) => {
  try {
    const posts = await Post.find({
      'jobPosts.jobType': req.params.jobType,
    }).populate('recruiterId', 'username companyName');
    if (posts.length === 0) {
      return res.status(404).json({ message: 'No job posts found for this job type' });
    }
    res.status(200).json(posts); // Send filtered posts
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle errors
  }
});

// Get a specific job post by ID
router.get('/posts/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('recruiterId', 'username companyName');
    if (!post) {
      return res.status(404).json({ message: 'Job post not found' });
    }
    res.status(200).json(post); // Send the specific job post
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle errors
  }
});

// Update a job post by ID
router.put('/posts/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!post) {
      return res.status(404).json({ message: 'Job post not found' });
    }
    res.status(200).json(post); // Send back the updated post
  } catch (error) {
    res.status(400).json({ error: error.message }); // Handle errors
  }
});

// Delete a job post by ID
router.delete('/posts/:id', async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Job post not found' });
    }
    res.status(200).json({ message: 'Job post deleted successfully' }); // Confirm deletion
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle errors
  }
});

// Get open job posts (posts where the lastDateToApply is still in the future)
router.get('/posts/open', async (req, res) => {
  try {
    const posts = await Post.find({
      'jobPosts.lastDateToApply': { $gte: new Date() }, // Find posts with lastDateToApply in the future
    }).populate('recruiterId', 'username companyName');
    if (posts.length === 0) {
      return res.status(404).json({ message: 'No open job posts found' });
    }
    res.status(200).json(posts); // Send back open job posts
  } catch (error) {
    res.status(500).json({ error: error.message }); // Handle errors
  }
});

module.exports = router;
