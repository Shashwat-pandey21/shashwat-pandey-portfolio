const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema(
  {
    institution: {
      type: String,
      required: [true, 'Please provide the educational institution'],
      trim: true,
    },
    degree: {
      type: String,
      required: [true, 'Please provide the degree obtained'],
      trim: true,
    },
    field: {
      type: String,
      required: [true, 'Please provide the field of study (e.g. Computer Science)'],
      trim: true,
    },
    startYear: {
      type: String,
      required: [true, 'Please provide the start year (e.g. 2019)'],
    },
    endYear: {
      type: String,
      default: 'Present',
    },
    grade: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Education', educationSchema);
