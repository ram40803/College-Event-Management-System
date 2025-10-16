// controllers/event.controller.js - Business logic for Event CRUD
const pool = require('../db/mysql_pool');

// --- Helper function for cleaner MySQL query execution ---
const executeQuery = async (sql, params = []) => {
    const [rows] = await pool.execute(sql, params);
    return rows;
};

// POST /api/events (CREATE Event) - Requires Admin
const createEvent = async (req, res) => {
    // req.user is set by auth.middleware and confirms the user is an admin
    const { title, description, date, location, capacity } = req.body;
    
    if (!title || !description || !date || !location || !capacity) {
        return res.status(400).json({ message: 'Missing required fields for event creation.' });
    }

    const sql = `
        INSERT INTO events (title, description, date, location, capacity, current_attendees, created_by)
        VALUES (?, ?, ?, ?, ?, 0, ?)
    `;
    const params = [title, description, date, location, capacity, req.user.username];

    try {
        const result = await executeQuery(sql, params);
        res.status(201).json({ 
            message: 'Event successfully created and registered!', 
            eventId: result.insertId,
            event: { title, date, location, capacity }
        });
    } catch (error) {
        console.error('Database Error in createEvent:', error.message);
        res.status(500).json({ message: 'Failed to create event due to a server error.' });
    }
};

// GET /api/events (READ All Events) - Public Access
const getAllEvents = async (req, res) => {
    const sql = 'SELECT id, title, description, date, location, capacity, current_attendees FROM events ORDER BY date DESC';
    
    try {
        const events = await executeQuery(sql);
        res.status(200).json(events);
    } catch (error) {
        console.error('Database Error in getAllEvents:', error.message);
        res.status(500).json({ message: 'Failed to fetch events.' });
    }
};

// GET /api/events/:id (READ Single Event) - Public Access
const getEventById = async (req, res) => {
    const eventId = req.params.id;
    const sql = 'SELECT id, title, description, date, location, capacity, current_attendees FROM events WHERE id = ?';
    
    try {
        const events = await executeQuery(sql, [eventId]);

        if (events.length === 0) {
            return res.status(404).json({ message: 'Event not found.' });
        }
        res.status(200).json(events[0]);
    } catch (error) {
        console.error('Database Error in getEventById:', error.message);
        res.status(500).json({ message: 'Failed to fetch event details.' });
    }
};

// PUT /api/events/:id (UPDATE Event) - Requires Admin
const updateEvent = async (req, res) => {
    const eventId = req.params.id;
    const { title, description, date, location, capacity } = req.body;
    
    let updates = [];
    let params = [];
    
    if (title) { updates.push('title = ?'); params.push(title); }
    if (description) { updates.push('description = ?'); params.push(description); }
    if (date) { updates.push('date = ?'); params.push(date); }
    if (location) { updates.push('location = ?'); params.push(location); }
    if (capacity) { updates.push('capacity = ?'); params.push(capacity); }
    
    if (updates.length === 0) {
        return res.status(400).json({ message: 'No valid fields provided for update.' });
    }

    const sql = `UPDATE events SET ${updates.join(', ')} WHERE id = ?`;
    params.push(eventId);
    
    try {
        const result = await executeQuery(sql, params);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Event not found or no changes made.' });
        }
        res.status(200).json({ message: 'Event successfully updated.' });
    } catch (error) {
        console.error('Database Error in updateEvent:', error.message);
        res.status(500).json({ message: 'Failed to update event.' });
    }
};

// DELETE /api/events/:id (DELETE Event) - Requires Admin
const deleteEvent = async (req, res) => {
    const eventId = req.params.id;
    const sql = 'DELETE FROM events WHERE id = ?';

    try {
        const result = await executeQuery(sql, [eventId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Event not found.' });
        }
        res.status(200).json({ message: `Event with ID ${eventId} successfully deleted.` });
    } catch (error) {
        console.error('Database Error in deleteEvent:', error.message);
        res.status(500).json({ message: 'Failed to delete event.' });
    }
};

module.exports = {
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent,
    deleteEvent
};
