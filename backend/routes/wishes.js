const express = require('express');
const router = express.Router();
const Wish = require('../models/Wish');

// Get all wishes
router.get('/', async (req, res) => {
  try {
    const wishes = await Wish.find().populate('user', 'name');
    res.json(wishes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a wish
router.post('/', async (req, res) => {
  const { title, description, priceRange, imageUrl, user, expectedDate, contactInfo } = req.body;
  try {
    const wish = new Wish({ title, description, priceRange, imageUrl, user, expectedDate, contactInfo });
    await wish.save();
    res.status(201).json(wish);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
