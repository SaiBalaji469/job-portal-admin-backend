const express = require('express');
const router = express.Router();
const Job = require('../models/Job');

// Get all jobs
router.get('/', async (req, res) => {
  console.log('GET /api/jobs - Fetching all jobs');
  try {
    const jobs = await Job.find();
    console.log(`Found ${jobs.length} jobs`);
    res.json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ message: error.message });
  }
});

// Create a new job
router.post('/', async (req, res) => {
  console.log('POST /api/jobs - Creating new job');
  try {
    const job = new Job({
      title: req.body.title,
      company: req.body.company,
      companyLogo: req.body.companyLogo,
      location: req.body.location,
      jobType: req.body.jobType,
      salary: req.body.salary,
      experience: req.body.experience,
      postedAt: req.body.postedAt || new Date(),
      isOnsite: req.body.isOnsite,
      description: req.body.description
    });

    const newJob = await job.save();
    console.log('New job created:', newJob._id);
    res.status(201).json(newJob);
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(400).json({ message: error.message });
  }
});

// Update a job
router.patch('/:id', async (req, res) => {
  console.log(`PATCH /api/jobs/${req.params.id} - Updating job`);
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!job) {
      console.log('Job not found:', req.params.id);
      return res.status(404).json({ message: 'Job not found' });
    }

    console.log('Job updated successfully:', job._id);
    res.json(job);
  } catch (error) {
    console.error('Error updating job:', error);
    res.status(400).json({ message: error.message });
  }
});

// Delete a job
router.delete('/:id', async (req, res) => {
  console.log(`DELETE /api/jobs/${req.params.id} - Deleting job`);
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    
    if (!job) {
      console.log('Job not found:', req.params.id);
      return res.status(404).json({ message: 'Job not found' });
    }

    console.log('Job deleted successfully:', req.params.id);
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error('Error deleting job:', error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 

