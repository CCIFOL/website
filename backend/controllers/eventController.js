const Event = require('../models/Event');

// Get all events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new event
exports.createEvent = async (req, res) => {
  const event = new Event({
    date: req.body.date,
    title: req.body.title
  });

  try {
    const newEvent = await event.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete an event
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findOne({ title: req.params.id }); 
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    await event.remove();
    res.status(204).json({ message: 'Event deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
