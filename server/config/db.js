const dns = require('dns');
// Configure public DNS servers to resolve MongoDB Atlas SRV/TXT records reliably
try {
  dns.setServers(['8.8.8.8', '8.8.4.4', '1.1.1.1']);
} catch (e) {
  // Ignore if unsupported in environment
}

const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return mongoose.connection;
  }

  const mongoUri = process.env.MONGODB_URI;

  if (!mongoUri) {
    const errorMsg = 'MONGODB_URI environment variable is not defined.';
    console.error(`[Database Error] ${errorMsg}`);
    throw new Error(errorMsg);
  }

  try {
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 8000,
    });

    isConnected = conn.connections[0].readyState === 1;
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    isConnected = false;
    console.error(`[Database Error] ${error.message}`);
    if (!process.env.VERCEL && process.env.NODE_ENV !== 'production') {
      process.exit(1);
    }
    throw error;
  }
};

module.exports = connectDB;
