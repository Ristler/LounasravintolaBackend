const express = require('express');
const router = express.Router();
const foods = require('../models/food');

// GET /foods
// Fetch all foods
router.get('/', async (req, res) => {
    const food = await foods.find();
    res.json(food)
})

// GET /foods
// Fetch food by ObjectId
router.get('/:id', async (req,res) => {
    try {
        const foodId = await foods.find({_id: req.params.id});
        
        // Check if dokument is epmty
        if (foodId.lenght === 0) {
            return res.status(404).json({message: 'Food not found'})
        }

        res.json(foodId);

    } catch (error) {
        res.status(400).json({message: 'Invalid ObjektId', error: error.message})
    }
});

// POST /foods

router.post('/food', async (req, res) => {
    const {name, desc, price, allergen, photo} = req.body;
    const food = new foods({name, desc, price, allergen, photo}); 
    await food.save();
    res.json(food); 
})

module.exports = router;