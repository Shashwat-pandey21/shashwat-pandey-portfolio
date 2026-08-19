const dns = require('dns');
// Set public DNS servers to resolve MongoDB Atlas SRV/TXT records reliably across all network environments
try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch (e) {
  // Ignore if unable to set custom DNS
}

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load env vars from server/.env or root .env
dotenv.config({ path: path.join(__dirname, '../.env') });
if (!process.env.MONGODB_URI) {
  dotenv.config({ path: path.join(__dirname, '../../.env') });
}

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
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
      console.error('Error: MONGODB_URI is not defined in environment variables.');
      console.error('Please configure MONGODB_URI in server/.env before seeding.');
      process.exit(1);
    }

    console.log('Connecting to MongoDB database for seeding...');
    await mongoose.connect(mongoUri);
    console.log(`MongoDB Connected successfully to host: ${mongoose.connection.host}`);

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
    console.log(`Database Host:  ${mongoose.connection.host}`);
    console.log(`Database Name:  ${mongoose.connection.name}`);
    console.log(`Admin User:     ${adminUser.email}`);
    console.log(`Skills:         ${skillsData.length}`);
    console.log(`Projects:       ${projectsData.length}`);
    console.log(`Experiences:    ${experienceData.length}`);
    console.log(`Education:      ${educationData.length}`);
    console.log(`Messages:       ${contactMessagesData.length}`);
    console.log('====================================');

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Error with database seeding:', error.message);
    process.exit(1);
  }
};

seedDB();
