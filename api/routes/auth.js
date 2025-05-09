/**
 * @module Routes/Auth
 * @description Routes for authentication-related operations.
 */

const express = require('express');
const router = express.Router();
const { postLogin, logout, getMe } = require('../controllers/AuthController');
const { authenticateToken } = require('../../middlewares');

/**
 * POST /login
 * @summary Logs in a user and generates a JWT token.
 * @param {Object} req - The request object containing `username` and `password` in `req.body`.
 * @param {Object} res - The response object containing the JWT token or an error message.
 */
router.route('/login').post(postLogin);

/**
 * POST /logout
 * @summary Logs out a user by invalidating the token (handled client-side).
 * @param {Object} req - The request object.
 * @param {Object} res - The response object containing a success message.
 * @middleware authenticateToken - Ensures the user is authenticated.
 */
router.route('/logout').post(authenticateToken, logout);

/**
 * GET /getMe
 * @summary Fetches the currently authenticated user's details.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object containing the user's details or an error message.
 * @middleware authenticateToken - Ensures the user is authenticated.
 */
router.route('/getMe').get(authenticateToken, getMe);

module.exports = router;