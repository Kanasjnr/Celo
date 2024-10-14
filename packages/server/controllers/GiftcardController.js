// controllers/GiftcardController.js
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const crypto = require('crypto');
const Mailgen = require('mailgen');
const GiftCard = require('../models/GiftCard'); 
const User = require('../models/UserModel'); 

dotenv.config();

// Configuration for nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

// Configuration for Mailgen
const mailGenerator = new Mailgen({
  theme: 'default',
  product: {
    name: 'PayGifty',
    link: 'https://google.com',
  },
});

// Function to generate a random code
const generateCode = () => {
  return crypto.randomBytes(8).toString('hex');
};

// Create gift card
const createGiftCard = async (req, res) => {
  const { amount, senderEmail, recipientEmail, message } = req.body;
  const code = generateCode();

  try {
    // Verify sender is a registered user
    const sender = await User.findOne({ email: senderEmail });
    if (!sender) {
      return res.status(400).json({ message: 'Sender must be a registered user' });
    }

    const newGiftCard = new GiftCard({
      code,
      amount,
      sender: sender._id,
      recipientEmail,
      message,
    });

    await newGiftCard.save();

    // Prepare the email content
    const email = {
      body: {
        name: recipientEmail,
        intro: `You have received a gift card of $${amount} with the code: ${code}, Kindly wait until it is activated.`,
        action: {
          instructions: message,
          button: {
            color: '#22BC66', // Optional action button color
            text: 'Redeem your gift card',
            link: 'http://localhost:5173/redeem',
          },
        },
        outro: 'Thank you for using PayGifty!',
      },
    };

    const emailBody = mailGenerator.generate(email);

    const mailOptions = {
      from: process.env.EMAIL,
      to: recipientEmail,
      subject: 'You received a gift card!',
      html: emailBody,
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ message: 'Failed to send email' });
      }
      console.log('Email sent:', info.response);
    });

    res.status(201).json(newGiftCard);
  } catch (error) {
    console.error('Error creating gift card:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Redeem gift card
const redeemGiftCard = async (req, res) => {
  const { code } = req.body;

  console.log('Request body:', req.body);  // Log the request body

  if (!code) {
    return res.status(400).json({ message: 'Code is required' });
  }

  try {
    const giftCard = await GiftCard.findOne({ code, redeemed: false });
    if (!giftCard) {
      return res.status(404).json({ message: 'Invalid or already redeemed gift card' });
    }

    giftCard.redeemed = true;
    await giftCard.save();

    res.status(200).json(giftCard);
  } catch (error) {
    console.error('Error redeeming gift card:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createGiftCard,
  redeemGiftCard,
};
