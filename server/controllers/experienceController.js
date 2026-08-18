const Experience = require('../models/Experience');

// @desc    Get all experiences
// @route   GET /api/experience
// @access  Public
const getExperiences = async (req, res, next) => {
  try {
    const experiences = await Experience.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: experiences.length,
      data: experiences,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new experience
// @route   POST /api/experience
// @access  Private/Admin
const createExperience = async (req, res, next) => {
  try {
    let { company, role, startDate, endDate, description, technologies } = req.body;

    if (typeof technologies === 'string') {
      technologies = technologies.split(',').map((t) => t.trim()).filter(Boolean);
    }

    const experience = await Experience.create({
      company,
      role,
      startDate,
      endDate: endDate || 'Present',
      description,
      technologies: Array.isArray(technologies) ? technologies : [],
    });

    res.status(201).json({
      success: true,
      message: 'Experience created successfully',
      data: experience,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update experience
// @route   PUT /api/experience/:id
// @access  Private/Admin
const updateExperience = async (req, res, next) => {
  try {
    let updateData = { ...req.body };

    if (typeof updateData.technologies === 'string') {
      updateData.technologies = updateData.technologies
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);
    }

    const experience = await Experience.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: 'Experience entry not found',
      });
    }

    res.json({
      success: true,
      message: 'Experience updated successfully',
      data: experience,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete experience
// @route   DELETE /api/experience/:id
// @access  Private/Admin
const deleteExperience = async (req, res, next) => {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id);

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: 'Experience entry not found',
      });
    }

    res.json({
      success: true,
      message: 'Experience deleted successfully',
      id: req.params.id,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
};
