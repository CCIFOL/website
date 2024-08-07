const express = require('express');
const router = express.Router();
const {
  getAllEvents,
  createEvent,
  deleteEvent
} = require('../controllers/eventController');

// Get all events
router.get('/', getAllEvents);

// Create a new event
router.post('/', createEvent);

// Delete an event
router.delete('/', deleteEvent);

module.exports = router;
