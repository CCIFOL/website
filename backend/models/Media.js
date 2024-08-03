const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
  type: { type: String, required: true }, // 'photo' or 'video'
  url: { type: String, required: true },
  description: { type: String }
});

module.exports = mongoose.model('Media', mediaSchema);
