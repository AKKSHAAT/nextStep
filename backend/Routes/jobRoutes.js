import express from 'express';

import Job from '../models/Job.js'; // Path to your Job model
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { title, recruiterId, companyName, skills } = req.body;

    // Basic validation
    if (!title || !companyName ) {
      return res.status(400).json({ message: 'Missing required fields or invalid skills format' });
    }

    const newJob = new Job({
      title,
      recruiterId,
      companyName,
      skills, // Skills must be an array of strings
    });

    const savedJob = await newJob.save();
    res.status(201).json(savedJob); // Return the created job as a response
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(500).json({ message: 'Error creating job' });
  }
});

// Get all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs); // Return all jobs
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ message: 'Error fetching jobs' });
  }
});

// z a single job by its ID
router.get('/:recruiterId', async (req, res) => {
  try {
    const jobs = await Job.find({ recruiterId: req.params.recruiterId }).populate('recruiterId');
    if (jobs.length === 0) {
      return res.status(404).json({ message: 'No jobs found for this recruiter' });
    }
    res.status(200).json(jobs); // Return all jobs for the recruiter
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ message: 'Error fetching jobs' });
  }
});


// Update a job by its ID
router.put('/:id', async (req, res) => {
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

router.put('/apply/:id', async (req, res) => {
  try {
    const { student } = req.body; // Only the student ID is needed in the body

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { students: student } }, // Use $addToSet to add the student to the array if not already present
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
router.delete('/:id', async (req, res) => {
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

export default router;
