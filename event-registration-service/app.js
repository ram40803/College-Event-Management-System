// app.js - Main entry point for the Express API server
const express = require('express');
// Ensure database connection starts when the server starts
require('./db/mysql_pool'); 
const eventRoutes = require('./routes/event.routes');
require('./utils/eurekaClient');

const app = express();
const port = 8083;

// --- Middleware Setup ---
app.use(express.json()); // Body Parser for JSON requests

// Simple request logger
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// --- API Routes ---
app.use('/api/events', eventRoutes);

// Basic health check route
app.get('/', (req, res) => {
    res.send('College Event Management API is running.');
});

// Global error handler (handles errors passed via next(err))
app.use((err, req, res, next) => {
    console.error('GLOBAL ERROR:', err.stack);
    res.status(500).json({ message: 'Something broke on the server.', error: err.message });
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
