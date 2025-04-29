const express = require('express');
const router = express.Router();
const {postLogin, logout} = require('../controllers/AuthController');
const {authenticateToken} = require('../middlewares');

router.route('/login').post(postLogin)
router.route('/logout').post(authenticateToken, logout)

module.exports = router;