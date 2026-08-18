const express = require('express');
const router = express.Router();
const {
  getEducation,
  createEducation,
  updateEducation,
  deleteEducation,
} = require('../controllers/educationController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.route('/')
  .get(getEducation)
  .post(protect, adminOnly, createEducation);

router.route('/:id')
  .put(protect, adminOnly, updateEducation)
  .delete(protect, adminOnly, deleteEducation);

module.exports = router;
