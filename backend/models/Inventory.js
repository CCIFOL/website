const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  dateGot: { type: Date, required: true },
  quantity: { type: Number, required: true, min: 1 },
  category: { type: String, required: true },
});

module.exports = mongoose.model('Inventory', inventorySchema);
