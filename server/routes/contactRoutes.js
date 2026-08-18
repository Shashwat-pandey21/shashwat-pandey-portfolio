const express = require('express');
const router = express.Router();
const {
  sendMessage,
  getMessages,
  toggleReadStatus,
  deleteMessage,
  getDashboardStats,
} = require('../controllers/contactController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.post('/', sendMessage);
router.get('/', protect, adminOnly, getMessages);
router.get('/stats', protect, adminOnly, getDashboardStats);
router.put('/:id/read', protect, adminOnly, toggleReadStatus);
router.delete('/:id', protect, adminOnly, deleteMessage);

module.exports = router;
