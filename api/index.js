// Vercel Serverless API Entry Point
// Re-exports the existing Express application from server/server.js
const app = require('../server/server');

module.exports = app;
