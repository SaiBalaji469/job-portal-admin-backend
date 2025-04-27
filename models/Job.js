const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  company: {
    type: String,
    required: true,
    trim: true
  },
  companyLogo: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  jobType: {
    type: String,
    required: true,
    enum: ['Full Time', 'Part Time', 'Contract', 'Internship']
  },
  salary: {
    type: String,
    required: true
  },
  experience: {
    type: String,
    required: true
  },
  postedAt: {
    type: Date,
    default: Date.now
  },
  isOnsite: {
    type: Boolean,
    default: true
  },
  description: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Job', jobSchema);
