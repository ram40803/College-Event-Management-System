// routes/event.routes.js - Defines API endpoints and applies middleware
const express = require('express');
const router = express.Router();
const eventController = require('../controllers/event.controller');
const { isAuthenticated, isAdmin } = require('../utils/auth.middleware');

// --- Public Access: READ Operations ---

// GET /api/events - Get all events
router.get('/', eventController.getAllEvents);

// GET /api/events/:id - Get a specific event by ID
router.get('/:id', eventController.getEventById);

// --- Admin-Only Access: CREATE, UPDATE, DELETE Operations ---
// These endpoints require a logged-in user who has the 'admin' role.

// POST /api/events - CREATE (Register) a new event
router.post('/', isAuthenticated, isAdmin, eventController.createEvent);

// PUT /api/events/:id - UPDATE an existing event
router.put('/:id', isAuthenticated, isAdmin, eventController.updateEvent);

// DELETE /api/events/:id - DELETE an event
router.delete('/:id', isAuthenticated, isAdmin, eventController.deleteEvent);

module.exports = router;
