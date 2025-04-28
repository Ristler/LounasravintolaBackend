const foods = require("../models/food");

const foodById = async (id) => {
    const food = foods.find({_id: id});
    return food;
}

const AllFoods = async () => {
    const food = await foods.find();
    return food;
}

const createFood = async (body) => {
    const {name, desc, price, allergen, photo} = body;

    const food = new foods({name, desc, price, allergen, photo});
    await food.save();

    return food;
}

module.exports = {
    foodById,
    AllFoods,
    createFood
}