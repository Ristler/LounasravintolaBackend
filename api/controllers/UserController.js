/**
 * @module Controllers/UserController
 */

const {createUser, getAllUsers, modifyUser, removeUser} = require('../modules/UserModule');
const bcrypt = require('bcrypt');

/**
 * Creates a new user.
 * @param {Object} req - The request object containing user data in `req.body`.
 * @param {Object} res - The response object.
 * @returns {Promise<Object>} - The created user or an error response.
 */
const newUser = async (req, res) => {
  try {
    req.body.salasana = bcrypt.hashSync(req.body.salasana, 10);
    const user = await createUser(req.body);

    res.json(user);
  } catch (error) {
    res.status(400).json({ message: 'Error creating a new user!', error: error.message });
  }
};

/**
 * Fetches all users.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<Array>} - An array of all users or an error response.
 */
const allUsers = async (req, res) => {
  try {
    const users = await getAllUsers();

    res.json(users);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching all users!', error: error.message });
  }
};

/**
 * Updates a user by ID.
 * @param {Object} req - The request object containing user data in `req.body` and user ID in `req.params.id`.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<Object>} - The updated user or an error response.
 */
const putUser = async (req, res, next) => {
  try {
    const {_id, rooli} = res.locals.user;

    if (rooli !== 'admin' && _id !== req.params.id) {
      return res.status(403).json({message: 'Forbidden'});
    }

    const result = await modifyUser(req.body, req.params.id, rooli);

    if (result) {
      res.status(200).json({result});
    } else {
      res.status(400).json({message: 'Update failed'});
    }
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({message: 'Internal server error'});
  }
};

/**
 * Deletes a user by ID.
 * @param {Object} req - The request object containing user ID in `req.params.id`.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function.
 * @returns {Promise<Object>} - A success message or an error response.
 */
const deleteUser = async (req, res, next) => {
  try {
    const {_id, rooli} = res.locals.user;

    if (rooli !== 'admin' && _id !== req.params.id) {
      return res.status(403).json({message: 'Forbidden'});
    }

    const result = await removeUser(req.params.id, rooli);

    if (result) {
      res.status(200).json({result});
    } else {
      res.status(400).json({message: 'Delete failed'});
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({message: 'Internal server error'});
  }
};

/**
 * Deletes the currently authenticated user's account.
 * @param {Object} req - The request object containing user ID in `req.params.id`.
 * @param {Object} res - The response object.
 * @returns {Promise<Object>} - A success message or an error response.
 */
const deleteAccount = async (req, res) => {
  try {
    const {_id, rooli} = res.locals.user;

    if (rooli === 'user' && _id !== req.params.id) {
      return res.status(403).json({message: 'Forbidden'});
    }

    const result = await removeUser(req.params.id, rooli);

    if (result) {
      res.status(200).json({result});
    } else {
      res.status(400).json({message: 'Delete failed'});
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({message: 'Internal server error'});
  }
};

/**
 * @type {{newUser: ((function(*, *): Promise<void>)|*), allUsers: ((function(*, *): Promise<void>)|*), putUser: ((function(*, *, *): Promise<void>)|*), deleteUser: ((function(*, *, *): Promise<void>)|*), deleteAccount: ((function(*, *): Promise<void>)|*)}}
 */
module.exports = {
  newUser,
  allUsers,
  deleteUser,
  deleteAccount,
  putUser,
};