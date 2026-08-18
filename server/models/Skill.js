const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a skill name'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Please provide a category'],
      enum: [
        'Programming Languages',
        'Core CS',
        'Frontend',
        'Backend',
        'Database',
        'Tools & Technologies',
      ],
    },
    proficiency: {
      type: Number,
      min: [1, 'Proficiency cannot be less than 1'],
      max: [100, 'Proficiency cannot exceed 100'],
      default: 85,
    },
    label: {
      type: String,
      default: '',
    },
    icon: {
      type: String,
      default: 'Code',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Skill', skillSchema);
