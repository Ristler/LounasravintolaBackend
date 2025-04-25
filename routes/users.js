const express = require('express');
const router = express.Router();
const User = require('../models/User');
const {createUser, getAllUsers} = require('../controllers/UserController');

// POST /users
router.post('/user', async (req, res) => {
  try {
    const user = await createUser(req.body);

    res.json(user);
  } catch (error) {
    res.status(400).json({ message: 'Error creating a new user!', error: error.message });
  }
});

// GET /users
router.get('/', async (req, res) => {
  try {
    const users = await getAllUsers();

    res.json(users);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching all users!', error: error.message });
  }

});

module.exports = router;
