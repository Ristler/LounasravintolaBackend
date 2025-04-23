const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  nimi: {
    type: String,
    required: true,
    trim: true
  },
  salasana: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
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
    required: true,
    trim: true
  },
}, {
  timestamps: true  // Adds createdAt and updatedAt fields automatically
});

module.exports = mongoose.model('User', UserSchema);