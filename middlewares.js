/**
 * @module Middlewares
 * @description Custom middleware functions for validation, error handling, and authentication.
 */

const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
require('dotenv/config');

/**
 * Middleware to handle validation errors from `express-validator`.
 * @function validationErrors
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const validationErrors = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages = errors
        .array()
        .map((error) => `${error.path}: ${error.msg}`)
        .join(', ');
    const error = new Error(messages);
    error.status = 400;
    next(error);
    return;
  }
  next();
};

/**
 * Middleware to handle 404 Not Found errors.
 * @function notFoundHandler
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const notFoundHandler = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.status = 404;
  next(error);
};

/**
 * Middleware to handle errors globally.
 * @function errorHandler
 * @param {Object} err - Error object.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
      status: err.status || 500,
    },
  });
};

/**
 * Middleware to authenticate JWT tokens.
 * @function authenticateToken
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
const authenticateToken = (req, res, next) => {
  console.log('authenticateToken', req.headers);
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  console.log('token', token);
  if (token == null) {
    return res.sendStatus(401);
  }

  try {
    res.locals.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    console.error('Error with verifying authentication token:', err);
    res.status(403).send({ message: 'invalid token' });
  }
};

module.exports = {
  authenticateToken,
  errorHandler,
  notFoundHandler,
  validationErrors,
};