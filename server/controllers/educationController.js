const Education = require('../models/Education');

// @desc    Get all education records
// @route   GET /api/education
// @access  Public
const getEducation = async (req, res, next) => {
  try {
    const education = await Education.find().sort({ startYear: -1, createdAt: -1 });

    res.json({
      success: true,
      count: education.length,
      data: education,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new education record
// @route   POST /api/education
// @access  Private/Admin
const createEducation = async (req, res, next) => {
  try {
    const { institution, degree, field, startYear, endYear, grade, description } = req.body;

    const record = await Education.create({
      institution,
      degree,
      field,
      startYear,
      endYear: endYear || 'Present',
      grade: grade || '',
      description: description || '',
    });

    res.status(201).json({
      success: true,
      message: 'Education record created successfully',
      data: record,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update education record
// @route   PUT /api/education/:id
// @access  Private/Admin
const updateEducation = async (req, res, next) => {
  try {
    const record = await Education.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!record) {
      return res.status(404).json({
        success: false,
        message: 'Education record not found',
      });
    }

    res.json({
      success: true,
      message: 'Education record updated successfully',
      data: record,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete education record
// @route   DELETE /api/education/:id
// @access  Private/Admin
const deleteEducation = async (req, res, next) => {
  try {
    const record = await Education.findByIdAndDelete(req.params.id);

    if (!record) {
      return res.status(404).json({
        success: false,
        message: 'Education record not found',
      });
    }

    res.json({
      success: true,
      message: 'Education record deleted successfully',
      id: req.params.id,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getEducation,
  createEducation,
  updateEducation,
  deleteEducation,
};
