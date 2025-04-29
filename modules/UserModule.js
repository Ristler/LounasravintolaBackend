const User = require('../models/User');

const getUserByUsername = async (username) => {
    const user = await User.findOne({ nimi: username });
    return user;
}

const createUser = async (body) => {
    const { nimi, salasana, email, rooli } = body;

    const user = new User({ nimi, salasana, email, rooli });
    await user.save();

    return user;
}

const getAllUsers = async () => {
    const users = await User.find();
    return users;
}

module.exports = {
    createUser,
    getAllUsers,
    getUserByUsername,
};