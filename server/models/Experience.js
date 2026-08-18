const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, 'Please provide the company name'],
      trim: true,
    },
    role: {
      type: String,
      required: [true, 'Please provide your role/job title'],
      trim: true,
    },
    startDate: {
      type: String,
      required: [true, 'Please provide the start date (e.g. Jan 2022)'],
    },
    endDate: {
      type: String,
      default: 'Present',
    },
    description: {
      type: String,
      required: [true, 'Please provide a job description / key contributions'],
    },
    technologies: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Experience', experienceSchema);
