const {createFood, foodById, AllFoods} = require('../modules/FoodModule');
const foods = require("../models/food");

const getFoodById = async (req, res) => {
    try {
        const foodId = await foodById(req.params.id);

        // Check if document is empty
        if (foodId.length === 0) {
            return res.status(404).json({message: 'Food not found'})
        }

        res.json(foodId);
    } catch (error) {
        console.error('Error fetching food by ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const getAllFoods = async (req, res) => {
    try {
        const foods = await AllFoods();
        res.json(foods)
    } catch (error) {
        console.error('Error fetching all foods:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const addFood = async (req, res) => {
    try {
        const food = await createFood(req.body);

        res.json(food);
    } catch (error) {
        console.error('Error adding food:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    getFoodById,
    getAllFoods,
    addFood
}