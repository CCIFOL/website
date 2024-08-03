const express = require('express');
const router = express.Router();
const Media = require('../models/Media');

// Get media items
router.get('/', async (req, res) => {
  try {
    const media = await Media.find();
    res.json(media);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new media item
router.post('/', async (req, res) => {
  const media = new Media({
    type: req.body.type,
    url: req.body.url,
    description: req.body.description
  });
  try {
    const newMedia = await media.save();
    res.status(201).json(newMedia);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a media item
router.delete('/:id', async (req, res) => {
  try {
    await Media.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted Media' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
