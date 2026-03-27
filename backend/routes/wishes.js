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
const auth = require('../middleware/auth');
router.post('/', auth, async (req, res) => {
  const { title, description, priceRange, imageUrl, expectedDate, contactInfo } = req.body;
  try {
    const wish = new Wish({ 
      title, 
      description, 
      priceRange, 
      imageUrl, 
      user: req.user.id, 
      expectedDate, 
      contactInfo 
    });
    await wish.save();
    res.status(201).json(wish);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get context-user's wishes
router.get('/me', auth, async (req, res) => {
  try {
    const wishes = await Wish.find({ user: req.user.id });
    res.json(wishes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Grant a wish
router.patch('/:id/grant', auth, async (req, res) => {
  try {
    console.log('Granting wish:', req.params.id, 'by user:', req.user.id);
    const wish = await Wish.findById(req.params.id);
    if (!wish) {
      console.log('Wish not found');
      return res.status(404).json({ message: 'Wish not found' });
    }
    
    // Check if it's the user's own wish
    if (wish.user.toString() === req.user.id) {
      console.log('User tried to grant own wish');
      return res.status(400).json({ message: 'You cannot grant your own wish!' });
    }

    if (wish.granted) {
      console.log('Wish already granted');
      return res.status(400).json({ message: 'Wish already granted' });
    }

    wish.granted = true;
    wish.grantor = req.user.id;
    await wish.save();
    console.log('Wish granted successfully');

    res.json(wish);
  } catch (err) {
    console.error('Grant wish error:', err.message);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
