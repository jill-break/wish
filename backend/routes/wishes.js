const express = require('express');
const router = express.Router();
const Wish = require('../models/Wish');

// Get all wishes
router.get('/', async (req, res) => {
  try {
    const wishes = await Wish.find().populate('user', 'name');
    res.json(wishes);
  } catch (err) {
    console.error('Fetch all wishes error:', err.message);
    res.status(500).json({ message: 'Error fetching wishes' });
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
    console.error('Create wish error:', err.message);
    res.status(400).json({ message: 'Error creating wish' });
  }
});

// Get context-user's wishes
router.get('/me', auth, async (req, res) => {
  try {
    const wishes = await Wish.find({ user: req.user.id });
    res.json(wishes);
  } catch (err) {
    console.error('Fetch my wishes error:', err.message);
    res.status(500).json({ message: 'Error fetching your wishes' });
  }
});

// Grant a wish
router.patch('/:id/grant', auth, async (req, res) => {
  try {
    const wishId = req.params.id;
    const userId = req.user.id;
    
    console.log(`Attempting to grant wish: ${wishId} by user: ${userId}`);

    // Atomic update: only update if not granted and not owned by the user
    const wish = await Wish.findOneAndUpdate(
      { 
        _id: wishId, 
        granted: false, 
        user: { $ne: userId } 
      },
      { 
        $set: { granted: true, grantor: userId } 
      },
      { new: true }
    );

    if (!wish) {
      // Check why it failed for better logging (but return generic error)
      const existing = await Wish.findById(wishId);
      if (!existing) return res.status(404).json({ message: 'Wish not found' });
      if (existing.user.toString() === userId) return res.status(400).json({ message: 'You cannot grant your own wish!' });
      if (existing.granted) return res.status(400).json({ message: 'Wish already granted' });
      
      return res.status(400).json({ message: 'Unable to grant wish' });
    }

    console.log('Wish granted successfully');
    res.json(wish);
  } catch (err) {
    console.error('Grant wish error:', err.message);
    res.status(500).json({ message: 'An internal server error occurred' });
  }
});

module.exports = router;
