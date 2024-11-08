const express = require('express');
const router = express.Router();
const Job = require('../models/Job'); // Path to your Job model

// Create a new job
router.post('/jobs', async (req, res) => {
  try {
    const { title, students, recruiterId, companyName, skills } = req.body;

    const newJob = new Job({
      title,
      students,
      recruiterId,
      companyName,
      skills,
    });

    const savedJob = await newJob.save();
    res.status(201).json(savedJob); // Return the created job as response
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(500).json({ message: 'Error creating job' });
  }
});

// Get all jobs
router.get('/jobs', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs); // Return all jobs
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ message: 'Error fetching jobs' });
  }
});

// Get a single job by its ID
router.get('/jobs/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('students recruiterId');
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json(job); // Return the job data
  } catch (error) {
    console.error('Error fetching job:', error);
    res.status(500).json({ message: 'Error fetching job' });
  }
});

// Update a job by its ID
router.put('/jobs/:id', async (req, res) => {
  try {
    const { title, students, recruiterId, companyName, skills } = req.body;

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      { title, students, recruiterId, companyName, skills },
      { new: true } // Return the updated job document
    );

    if (!updatedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json(updatedJob); // Return the updated job data
  } catch (error) {
    console.error('Error updating job:', error);
    res.status(500).json({ message: 'Error updating job' });
  }
});

// Delete a job by its ID
router.delete('/jobs/:id', async (req, res) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id);

    if (!deletedJob) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.status(200).json({ message: 'Job deleted successfully' }); // Confirmation message
  } catch (error) {
    console.error('Error deleting job:', error);
    res.status(500).json({ message: 'Error deleting job' });
  }
});

module.exports = router;
