const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST /users
router.post('/user', async (req, res) => {
  const { nimi, salasana, email, rooli } = req.body;
  const user = new User({ nimi, salasana, email, rooli });
  await user.save();
  res.json(user);
});

// GET /users
router.get('/', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

module.exports = router;