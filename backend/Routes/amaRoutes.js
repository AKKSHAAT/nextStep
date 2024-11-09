import express from 'express';
const router = express.Router();
import { Ama, Comment } from '../models/Ama.js';

// POST: Create a new AMA post
router.post('/create', async (req, res) => {
  try {
    const { title, content, creatorId } = req.body;

    // Validate input
    if (!title || !content || !creatorId) {
      return res.status(400).json({ message: 'Title, content, and creator ID are required' });
    }

    // Create new AMA post
    const newAma = new Ama({ title, content, creatorId });
    const savedAma = await newAma.save();

    res.status(201).json(savedAma);
  } catch (error) {
    console.error('Error creating AMA post:', error);
    res.status(500).json({ message: 'Error creating AMA post' });
  }
});


// GET: Retrieve all AMA posts
router.get('/', async (req, res) => {
  try {
    const amas = await Ama.find(); // Optionally populate creator details
    res.status(200).json(amas);
  } catch (error) {
    console.error('Error fetching AMA posts:', error);
    res.status(500).json({ message: 'Error fetching AMA posts' });
  }
});

// Example in Express.js
router.post('/api/comments/batch', async (req, res) => {
  try {
    const { ids } = req.body;
    
    // Convert stringified ObjectIds to actual ObjectIds
    const objectIds = ids.map(id => mongoose.Types.ObjectId(id.$oid));

    // Fetch comments by their IDs
    const comments = await Comment.find({ '_id': { $in: objectIds } });

    res.json({ comments });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch comments" });
  }
});

// GET: Retrieve all comments for a specific AMA post
// GET: Retrieve all comments for a specific AMA post
router.get('/:id/comments', async (req, res) => {
  try {
    const ama = await Ama.findById(req.params.id).populate('comments'); // Populate comments field
    if (!ama) {
      return res.status(404).json({ message: 'AMA post not found' });
    }
    res.status(200).json(ama.comments); // Return the populated comments
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ message: 'Error fetching comments' });
  }
});


// POST: Add a new comment to a specific AMA post
router.post('/:id/comments', async (req, res) => {
  try {
    const { content, creatorId } = req.body;
    if (!content || !creatorId) {
      return res.status(400).json({ message: 'Content and creator ID are required' });
    }

    // Create new comment
    const newComment = new Comment({ content, creatorId });
    const savedComment = await newComment.save();

    // Add comment to AMA post's comments array
    const ama = await Ama.findById(req.params.id);
    if (!ama) {
      return res.status(404).json({ message: 'AMA post not found' });
    }

    ama.comments.push(savedComment._id);
    await ama.save();

    res.status(201).json(savedComment);
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ message: 'Error adding comment' });
  }
});

export default router;
