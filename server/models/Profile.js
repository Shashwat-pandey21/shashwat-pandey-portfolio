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
      default: '/profile.jpg',
    },
    email: {
      type: String,
      required: [true, 'Please provide a contact email'],
      trim: true,
      lowercase: true,
      default: 'pandeyshashwat510@gmail.com',
    },
    phone: {
      type: String,
      default: '',
    },
    location: {
      type: String,
      default: 'Greater Noida, Uttar Pradesh, India',
    },
    github: {
      type: String,
      default: 'https://github.com/Shashwat-pandey21',
    },
    linkedin: {
      type: String,
      default: 'https://www.linkedin.com/in/shashwat-pandey-b596a732a/',
    },
    leetcode: {
      type: String,
      default: 'https://leetcode.com/u/shashwatpandey_21/',
    },
    twitter: {
      type: String,
      default: '',
    },
    resumeUrl: {
      type: String,
      default: '/resume.pdf',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Profile', profileSchema);
