/**
 * @module Models/User
 * @description Mongoose model for users.
 */

const mongoose = require('mongoose');

/**
 * @typedef {Object} User
 * @property {String} nimi - The username of the user (required, unique, trimmed).
 * @property {String} salasana - The password of the user (required, trimmed).
 * @property {String} email - The email address of the user (required, unique, trimmed, lowercase).
 * @property {Number} pisteet - The points or score of the user (default: 0, minimum: 0).
 * @property {String} rooli - The role of the user (default: "user", trimmed).
 * @property {Date} createdAt - The timestamp when the user was created.
 * @property {Date} updatedAt - The timestamp when the user was last updated.
 */
const UserSchema = new mongoose.Schema({
  nimi: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  salasana: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  pisteet: {
    type: Number,
    default: 0,
    min: 0
  },
  rooli: {
    type: String,
    required: false,
    default: "user",
    trim: true
  },
}, {
  timestamps: true  // Adds createdAt and updatedAt fields automatically
});

module.exports = mongoose.model('User', UserSchema);