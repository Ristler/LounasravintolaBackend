const express = require('express');
const router = express.Router();
const {newUser, allUsers} = require('../controllers/UserController');
const {authenticateToken} = require('../middlewares');

router.route('/user').post(newUser)
router.route('/').get(allUsers)
router.route('/login').post(authenticateToken)

module.exports = router;
