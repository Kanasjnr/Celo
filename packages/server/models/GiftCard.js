const mongoose = require('mongoose');

const giftCardSchema = new mongoose.Schema({
  code: String,
  amount: Number,
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  senderEmail: String,
  recipientEmail: String,
  message: String,
  redeemed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('GiftCard', giftCardSchema);
