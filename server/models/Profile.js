const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide your full name'],
      trim: true,
    },
    title: {
      type: String,
      required: [true, 'Please provide your professional title/role'],
      trim: true,
    },
    bio: {
      type: String,
      required: [true, 'Please provide a personal biography/summary'],
    },
    profileImage: {
      type: String,
      default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    },
    email: {
      type: String,
      required: [true, 'Please provide a contact email'],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      default: '+1 (555) 234-5678',
    },
    location: {
      type: String,
      default: 'San Francisco, CA',
    },
    github: {
      type: String,
      default: 'https://github.com',
    },
    linkedin: {
      type: String,
      default: 'https://linkedin.com',
    },
    twitter: {
      type: String,
      default: 'https://twitter.com',
    },
    resumeUrl: {
      type: String,
      default: 'https://example.com/resume.pdf',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Profile', profileSchema);
