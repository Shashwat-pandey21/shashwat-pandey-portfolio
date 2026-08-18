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
        title: 'Full-Stack Developer | AI & Data Science Student',
        bio: 'I’m a B.Tech student specializing in Artificial Intelligence and Data Science with a strong interest in full-stack web development and problem solving. I enjoy building practical web applications and developing backend systems using technologies such as Node.js, Express.js, MongoDB, and REST APIs. I’m also consistently improving my Data Structures and Algorithms skills through problem solving and LeetCode.',
        profileImage: '/profile.jpg',
        email: 'pandeyshashwat510@gmail.com',
        phone: '',
        location: 'Greater Noida, Uttar Pradesh, India',
        github: 'https://github.com/Shashwat-pandey21',
        linkedin: 'https://www.linkedin.com/in/shashwat-pandey-b596a732a/',
        leetcode: 'https://leetcode.com/u/shashwatpandey_21/',
        twitter: '',
        resumeUrl: '/resume.pdf',
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
