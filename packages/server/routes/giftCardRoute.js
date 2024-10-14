// routes/giftCardRoute.js
const express = require('express');
const { createGiftCard, redeemGiftCard } = require('../controllers/GiftcardController');
const router = express.Router();
const GiftCard = require('../models/GiftCard');
const User = require('../models/UserModel');

// Create a gift card
router.post('/create', createGiftCard);

// Get all gift cards
router.get('/', async (req, res) => {
  try {
    const giftCards = await GiftCard.find();
    res.status(200).json(giftCards);
  } catch (error) {
    console.error('Error fetching gift cards:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Get user gift cards by email
router.get('/:email/giftcards', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email }).populate('giftCards');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user.giftCards);
  } catch (error) {
    console.error('Error fetching user gift cards:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Redeem a gift card
router.post('/redeem', redeemGiftCard);

module.exports = router;
