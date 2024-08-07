const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

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
router.delete('/:id', async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted Event' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;
