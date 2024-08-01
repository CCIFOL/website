const express = require('express');
const router = express.Router();
const Inventory = require('../models/Inventory');

// Add new inventory item
router.post('/', async (req, res) => {
  try {
    const { name, dateGot, quantity, category } = req.body;
    const newItem = new Inventory({ name, dateGot, quantity, category });
    await newItem.save();
    res.status(200).json({ item: newItem });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// Get all inventory items
router.get('/', async (req, res) => {
  try {
    const items = await Inventory.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

module.exports = router;
