const ContactMessage = require('../models/ContactMessage');
const Project = require('../models/Project');
const Skill = require('../models/Skill');
const Experience = require('../models/Experience');
const Education = require('../models/Education');

// @desc    Submit a contact message
// @route   POST /api/contact
// @access  Public
const sendMessage = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: name, email, subject, and message',
      });
    }

    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address',
      });
    }

    const contact = await ContactMessage.create({
      name,
      email: email.toLowerCase().trim(),
      subject,
      message,
      isRead: false,
    });

    res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been sent successfully.',
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all contact messages & unread count
// @route   GET /api/contact
// @access  Private/Admin
const getMessages = async (req, res, next) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    const unreadCount = await ContactMessage.countDocuments({ isRead: false });

    res.json({
      success: true,
      count: messages.length,
      unreadCount,
      data: messages,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle message read status
// @route   PUT /api/contact/:id/read
// @access  Private/Admin
const toggleReadStatus = async (req, res, next) => {
  try {
    const message = await ContactMessage.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found',
      });
    }

    // Toggle or explicitly set from body
    if (req.body.isRead !== undefined) {
      message.isRead = Boolean(req.body.isRead);
    } else {
      message.isRead = !message.isRead;
    }

    await message.save();

    res.json({
      success: true,
      message: `Message marked as ${message.isRead ? 'read' : 'unread'}`,
      data: message,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete contact message
// @route   DELETE /api/contact/:id
// @access  Private/Admin
const deleteMessage = async (req, res, next) => {
  try {
    const message = await ContactMessage.findByIdAndDelete(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found',
      });
    }

    res.json({
      success: true,
      message: 'Message deleted successfully',
      id: req.params.id,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get Admin Dashboard Stats Overview
// @route   GET /api/contact/stats
// @access  Private/Admin
const getDashboardStats = async (req, res, next) => {
  try {
    const [
      totalProjects,
      featuredProjects,
      totalSkills,
      totalExperiences,
      totalEducation,
      totalMessages,
      unreadMessages,
    ] = await Promise.all([
      Project.countDocuments(),
      Project.countDocuments({ featured: true }),
      Skill.countDocuments(),
      Experience.countDocuments(),
      Education.countDocuments(),
      ContactMessage.countDocuments(),
      ContactMessage.countDocuments({ isRead: false }),
    ]);

    res.json({
      success: true,
      data: {
        totalProjects,
        featuredProjects,
        totalSkills,
        totalExperiences,
        totalEducation,
        totalMessages,
        unreadMessages,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  sendMessage,
  getMessages,
  toggleReadStatus,
  deleteMessage,
  getDashboardStats,
};
