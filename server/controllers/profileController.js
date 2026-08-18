const Profile = require('../models/Profile');

// @desc    Get portfolio profile
// @route   GET /api/profile
// @access  Public
const getProfile = async (req, res, next) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      // Return default placeholder if none exists yet
      profile = await Profile.create({
        name: 'Shashwat Pandey',
        title: 'MERN Stack Developer',
        bio: 'I’m an AI & Data Science student passionate about full-stack development and problem solving. I enjoy building practical web applications and working with technologies like React, Node.js, Express.js, and MongoDB. I’m constantly learning, building projects, and improving my skills to become a strong software engineer.',
        profileImage: '/profile.jpg',
        email: 'pandeyshashwat@gmail.com',
        phone: '+91 98765 43210',
        location: 'India',
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
        resumeUrl: 'https://example.com/resume.pdf',
      });
    }

    res.json({
      success: true,
      data: profile,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update portfolio profile
// @route   PUT /api/profile
// @access  Private/Admin
const updateProfile = async (req, res, next) => {
  try {
    let profile = await Profile.findOne();

    if (!profile) {
      profile = await Profile.create(req.body);
    } else {
      profile = await Profile.findByIdAndUpdate(
        profile._id,
        { $set: req.body },
        { new: true, runValidators: true }
      );
    }

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: profile,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProfile,
  updateProfile,
};
