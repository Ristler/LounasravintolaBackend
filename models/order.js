const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    items: [
        {   
            foodId: { type: mongoose.Schema.ObjectId, required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true},
            _id: false
        }   // This allow the frontend to save multiple item in a single order
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
        // Order status
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('orders', orderSchema);