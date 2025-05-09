/**
 * @module Models/Food
 * @description Mongoose model for food items.
 */

const mongoose = require('mongoose');

/**
 * @typedef {Object} Food
 * @property {String} name - The name of the food item (required, unique).
 * @property {String} desc - A description of the food item (optional).
 * @property {Number} price - The price of the food item (optional).
 * @property {Array} allergen - A list of allergens associated with the food item (optional).
 * @property {String} photo - A URL or path to the food item's photo (optional).
 */
const FoodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    desc: {
        type: String,
        required: false,
    },
    price: {
        type: Number,
        required: false,
        unique: false,
    },
    allergen: {
        type: Array,
        required: false
    },
    photo: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Food', FoodSchema);