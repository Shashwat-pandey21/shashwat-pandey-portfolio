const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load env vars
dotenv.config({ path: path.join(__dirname, '../.env') });

const User = require('../models/User');
const Profile = require('../models/Profile');
const Skill = require('../models/Skill');
const Project = require('../models/Project');
const Experience = require('../models/Experience');
const Education = require('../models/Education');
const ContactMessage = require('../models/ContactMessage');

const {
  adminUser,
  profileData,
  skillsData,
  projectsData,
  experienceData,
  educationData,
  contactMessagesData,
} = require('./seedData');

const seedDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio_db';
    console.log(`Connecting to MongoDB at ${mongoUri}...`);
    await mongoose.connect(mongoUri);
    console.log('MongoDB Connected for Seeding.');

    console.log('Clearing existing collections...');
    await User.deleteMany();
    await Profile.deleteMany();
    await Skill.deleteMany();
    await Project.deleteMany();
    await Experience.deleteMany();
    await Education.deleteMany();
    await ContactMessage.deleteMany();

    console.log('Inserting Admin User...');
    await User.create(adminUser);

    console.log('Inserting Profile Data...');
    await Profile.create(profileData);

    console.log(`Inserting ${skillsData.length} Skills...`);
    await Skill.insertMany(skillsData);

    console.log(`Inserting ${projectsData.length} Projects...`);
    await Project.insertMany(projectsData);

    console.log(`Inserting ${experienceData.length} Experiences...`);
    await Experience.insertMany(experienceData);

    console.log(`Inserting ${educationData.length} Education Records...`);
    await Education.insertMany(educationData);

    console.log(`Inserting ${contactMessagesData.length} Sample Messages...`);
    await ContactMessage.insertMany(contactMessagesData);

    console.log('====================================');
    console.log('DATABASE SEEDED SUCCESSFULLY!');
    console.log(`Admin Email:    ${adminUser.email}`);
    console.log(`Admin Password: ${adminUser.password}`);
    console.log('====================================');

    process.exit(0);
  } catch (error) {
    console.error('Error with database seeding:', error);
    process.exit(1);
  }
};

seedDB();
