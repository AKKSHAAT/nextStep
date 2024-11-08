const express = require('express');
const router = express.Router();
const Recruiter = require('../models/Recruiter.js');    

// Create a new recruiter
router.post('/recruiters', async (req, res) => {
  try {
    const recruiter = new Recruiter(req.body);
    await recruiter.save();
    res.status(201).json(recruiter);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all recruiters
router.get('/recruiters', async (req, res) => {
  try {
    const recruiters = await Recruiter.find();
    res.status(200).json(recruiters);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a recruiter by ID
router.get('/recruiters/:id', async (req, res) => {
  try {
    const recruiter = await Recruiter.findById(req.params.id);
    if (!recruiter) {
      return res.status(404).json({ message: 'Recruiter not found' });
    }
    res.status(200).json(recruiter);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a recruiter by ID
router.put('/recruiters/:id', async (req, res) => {
  try {
    const recruiter = await Recruiter.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!recruiter) {
      return res.status(404).json({ message: 'Recruiter not found' });
    }
    res.status(200).json(recruiter);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a recruiter by ID
router.delete('/recruiters/:id', async (req, res) => {
  try {
    const recruiter = await Recruiter.findByIdAndDelete(req.params.id);
    if (!recruiter) {
      return res.status(404).json({ message: 'Recruiter not found' });
    }
    res.status(200).json({ message: 'Recruiter deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a job to the recruiter's job list
router.post('/recruiters/:id/job', async (req, res) => {
  try {
    const recruiter = await Recruiter.findById(req.params.id);
    if (!recruiter) {
      return res.status(404).json({ message: 'Recruiter not found' });
    }
    recruiter.jobList.push(req.body); // Add job to the jobList array
    await recruiter.save();
    res.status(201).json(recruiter);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all jobs posted by a recruiter
router.get('/recruiters/:id/jobs', async (req, res) => {
  try {
    const recruiter = await Recruiter.findById(req.params.id);
    if (!recruiter) {
      return res.status(404).json({ message: 'Recruiter not found' });
    }
    res.status(200).json(recruiter.jobList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific job posted by a recruiter
router.get('/recruiters/:recruiterId/job/:jobId', async (req, res) => {
  try {
    const recruiter = await Recruiter.findById(req.params.recruiterId);
    if (!recruiter) {
      return res.status(404).json({ message: 'Recruiter not found' });
    }
    const job = recruiter.jobList.id(req.params.jobId); // Use the jobId to find the specific job
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a job posted by a recruiter
router.put('/recruiters/:recruiterId/job/:jobId', async (req, res) => {
  try {
    const recruiter = await Recruiter.findById(req.params.recruiterId);
    if (!recruiter) {
      return res.status(404).json({ message: 'Recruiter not found' });
    }
    const job = recruiter.jobList.id(req.params.jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    // Update job details
    Object.assign(job, req.body);
    await recruiter.save();
    res.status(200).json(job);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a job posted by a recruiter
router.delete('/recruiters/:recruiterId/job/:jobId', async (req, res) => {
  try {
    const recruiter = await Recruiter.findById(req.params.recruiterId);
    if (!recruiter) {
      return res.status(404).json({ message: 'Recruiter not found' });
    }
    const job = recruiter.jobList.id(req.params.jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    job.remove(); // Remove the job from the jobList array
    await recruiter.save();
    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
