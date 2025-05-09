const {createFood, foodById, AllFoods} = require('../modules/FoodModule');
const foods = require("../../models/food");

/**
 * @module Controllers/FoodController
 */

/**
 * Fetches a food item by its ID.
 * @param {Object} req - The request object containing the food ID in `req.params.id`.
 * @param {Object} res - The response object.
 * @returns {Promise<Object>} - The food item or an error response.
 */
const getFoodById = async (req, res) => {
    try {
        const foodId = await foodById(req.params.id);

        // Check if document is empty
        if (foodId.length === 0) {
            return res.status(404).json({message: 'Food not found'});
        }

        res.json(foodId);
    } catch (error) {
        console.error('Error fetching food by ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * Fetches all food items.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<Array>} - An array of all food items or an error response.
 */
const getAllFoods = async (req, res) => {
    try {
        const foods = await AllFoods();
        res.json(foods);
    } catch (error) {
        console.error('Error fetching all foods:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * Adds a new food item.
 * @param {Object} req - The request object containing the food data in `req.body`.
 * @param {Object} res - The response object.
 * @returns {Promise<Object>} - The created food item or an error response.
 */
const addFood = async (req, res) => {
    try {
        const food = await createFood(req.body);

        res.json(food);
    } catch (error) {
        console.error('Error adding food:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

/**
 * @type {{getFoodById: ((function(*, *): Promise<*>)|*), getAllFoods: ((function(*, *): Promise<void>)|*), addFood: ((function(*, *): Promise<void>)|*)}}
 */
module.exports = {
    getFoodById,
    getAllFoods,
    addFood
};