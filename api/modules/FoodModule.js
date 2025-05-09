/**
 * @module Modules/FoodModule
 */

const foods = require("../../models/food");

/**
 * Fetches a food item by its ID.
 * @param {string} id - The ID of the food item.
 * @returns {Promise<Object>} - The food item or an empty result if not found.
 */
const foodById = async (id) => {
    const food = foods.find({_id: id});
    return food;
};

/**
 * Fetches all food items.
 * @returns {Promise<Array>} - An array of all food items.
 */
const AllFoods = async () => {
    const food = await foods.find();
    return food;
};

/**
 * Creates a new food item.
 * @param {Object} body - The food data.
 * @param {string} body.name - The name of the food item.
 * @param {string} body.desc - The description of the food item.
 * @param {number} body.price - The price of the food item.
 * @param {Array<string>} body.allergen - The allergens in the food item.
 * @param {string} body.photo - The photo URL of the food item.
 * @returns {Promise<Object>} - The created food item.
 */
const createFood = async (body) => {
    const {name, desc, price, allergen, photo} = body;

    const food = new foods({name, desc, price, allergen, photo});
    await food.save();

    return food;
};

module.exports = {
    foodById,
    AllFoods,
    createFood
};