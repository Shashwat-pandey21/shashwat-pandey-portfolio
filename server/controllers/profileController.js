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
        name: 'Alex Morgan',
        title: 'Full Stack Engineer & Cloud Architect',
        bio: 'Passionate full-stack developer dedicated to building high-performance web applications and scalable distributed systems with clean architectures.',
        profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
        email: 'alex.morgan@example.com',
        phone: '+1 (555) 234-5678',
        location: 'San Francisco, CA',
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
