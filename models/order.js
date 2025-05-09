/**
 * @module Models/Order
 * @description Mongoose model for orders.
 */

const mongoose = require('mongoose');

/**
 * @typedef {Object} OrderItem
 * @property {mongoose.Schema.Types.ObjectId} foodId - The ID of the food item (required).
 * @property {Number} quantity - The quantity of the food item in the order (required).
 * @property {Number} price - The price of the food item (required).
 */

/**
 * @typedef {Object} Order
 * @property {mongoose.Schema.Types.ObjectId} userId - The ID of the user who placed the order (required).
 * @property {OrderItem[]} items - An array of items in the order (required).
 * @property {Number} totalPrice - The total price of the order (required).
 * @property {Number} orderScore - The score or rating of the order (required).
 * @property {String} status - The status of the order (default: 'Pending').
 * @property {Date} createdAt - The timestamp when the order was created.
 * @property {Date} updatedAt - The timestamp when the order was last updated.
 */
const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    items: [
        {
            foodId: { type: mongoose.Schema.ObjectId, required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
            _id: false
        }
    ],
    totalPrice: {
        type: Number,
        required: true
    },
    orderScore: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: 'Pending'
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('orders', orderSchema);