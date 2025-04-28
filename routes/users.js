const express = require('express');
const router = express.Router();
const User = require('../models/User');
const {newUser, allUsers} = require('../controllers/UserController');

router.route('/user').post(newUser)
router.route('/').get(allUsers)

module.exports = router;
