const express = require('express');
const router = express.Router();
const {postLogin, logout, getMe} = require('../controllers/AuthController');
const {authenticateToken} = require('../middlewares');

router.route('/login').post(postLogin)
router.route('/logout').post(authenticateToken, logout)
router.route('/getMe').get(authenticateToken, getMe)

module.exports = router;