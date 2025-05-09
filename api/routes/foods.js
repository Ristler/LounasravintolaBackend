/**
 * @module Routes/Foods
 * @description Routes for food-related operations.
 */

const express = require('express');
const router = express.Router();
const { getAllFoods, addFood, getFoodById } = require('../controllers/FoodController');

/**
 * GET /:id
 * @summary Fetches a food item by its ID.
 * @param {Object} req - The request object containing the food ID in `req.params.id`.
 * @param {Object} res - The response object containing the food item or an error message.
 */
router.route('/:id').get(getFoodById);

/**
 * GET /
 * @summary Fetches all food items.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object containing an array of all food items or an error message.
 */
router.route('/').get(getAllFoods);

/**
 * POST /food
 * @summary Creates a new food item.
 * @param {Object} req - The request object containing the food data in `req.body`.
 * @param {Object} res - The response object containing the created food item or an error message.
 */
router.route('/food').post(addFood);

module.exports = router;