const mongoose = require('mongoose');

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