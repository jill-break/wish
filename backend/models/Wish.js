const mongoose = require('mongoose');

const wishSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  priceRange: { type: String, required: true },
  imageUrl: { type: String, default: '' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  granted: { type: Boolean, default: false },
  grantor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  expectedDate: { type: Date },
  contactInfo: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Wish', wishSchema);
