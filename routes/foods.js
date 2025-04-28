const express = require('express');
const router = express.Router();
const {getAllFoods, addFood, getFoodById} = require('../controllers/FoodController');

router.route('/:id').get(getFoodById)
router.route('/').get(getAllFoods)
router.route('/food').post(addFood)

module.exports = router;