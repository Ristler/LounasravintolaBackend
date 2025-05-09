/**
 * @module Routes/Users
 * @description Routes for user-related operations.
 */

const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { newUser, allUsers, deleteUser, deleteAccount, putUser } = require('../controllers/UserController');
const { authenticateToken } = require('../../middlewares');

/**
 * POST /user
 * @summary Creates a new user.
 * @param {Object} req - The request object containing user data in `req.body`.
 * @param {Object} res - The response object containing the created user or an error message.
 * @validation email - Must be a valid email.
 * @validation nimi - Must be alphanumeric and between 3-20 characters.
 * @validation salasana - Must be at least 8 characters long.
 */
router.route('/user').post(
    body('email').trim().isEmail().escape(),
    body('nimi').trim().isLength({ min: 3, max: 20 }).isAlphanumeric().escape(),
    body('salasana').trim().isLength({ min: 8 }).escape(),
    newUser
);

/**
 * GET /
 * @summary Fetches all users.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object containing an array of all users or an error message.
 */
router.route('/').get(allUsers);

/**
 * DELETE /:id
 * @summary Deletes a user by their ID.
 * @param {Object} req - The request object containing the user ID in `req.params.id`.
 * @param {Object} res - The response object containing the deleted user or an error message.
 * @middleware authenticateToken - Ensures the user is authenticated.
 */
router.route('/:id').delete(authenticateToken, deleteUser);

/**
 * PUT /:id
 * @summary Updates a user by their ID.
 * @param {Object} req - The request object containing the user ID in `req.params.id` and updated data in `req.body`.
 * @param {Object} res - The response object containing the updated user or an error message.
 * @middleware authenticateToken - Ensures the user is authenticated.
 * @validation email - Must be a valid email (optional).
 * @validation nimi - Must be alphanumeric and between 3-20 characters (optional).
 * @validation salasana - Must be at least 8 characters long (optional).
 */
router.route('/:id').put(
    authenticateToken,
    body('email').trim().isEmail().escape().optional(),
    body('nimi').trim().isLength({ min: 3, max: 20 }).isAlphanumeric().escape().optional(),
    body('salasana').trim().isLength({ min: 8 }).escape().optional(),
    putUser
);

/**
 * DELETE /purge/:id
 * @summary Permanently deletes a user account by their ID.
 * @param {Object} req - The request object containing the user ID in `req.params.id`.
 * @param {Object} res - The response object containing the result of the deletion or an error message.
 * @middleware authenticateToken - Ensures the user is authenticated.
 */
router.route('/purge/:id').delete(authenticateToken, deleteAccount);

module.exports = router;