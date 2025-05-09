/**
 * @module Modules/UserModule
 */

const User = require('../../models/User');

/**
 * Fetches a user by their username.
 * @param {string} username - The username of the user.
 * @returns {Promise<Object>} - The user object or null if not found.
 */
const getUserByUsername = async (username) => {
    const user = await User.findOne({ nimi: username });
    return user;
};

/**
 * Creates a new user.
 * @param {Object} body - The user data.
 * @param {string} body.nimi - The username of the user.
 * @param {string} body.salasana - The password of the user.
 * @param {string} body.email - The email of the user.
 * @param {string} body.rooli - The role of the user.
 * @returns {Promise<Object>} - The created user object.
 */
const createUser = async (body) => {
    const { nimi, salasana, email, rooli } = body;

    const user = new User({ nimi, salasana, email, rooli });
    await user.save();

    return user;
};

/**
 * Fetches all users.
 * @returns {Promise<Array>} - An array of all user objects.
 */
const getAllUsers = async () => {
    const users = await User.find();
    return users;
};

/**
 * Fetches a user by their ID.
 * @param {string} id - The ID of the user.
 * @returns {Promise<Object>} - The user object or null if not found.
 */
const getUserById = async (id) => {
    const user = await User.findById(id);
    return user;
};

/**
 * Updates a user by their ID.
 * @param {Object} body - The updated user data.
 * @param {string} id - The ID of the user.
 * @param {string} rooli - The role of the user performing the update.
 * @returns {Promise<Object>} - The updated user object or null if not found.
 */
const modifyUser = async (body, id, rooli) => {
    const { nimi, salasana, email } = body;

    let user = await User.findById(id);

    if (user) {
        if (nimi !== undefined && nimi !== null) {
            user.nimi = nimi;
        }
        if (salasana !== undefined && salasana !== null) {
            user.salasana = salasana;
        }
        if (email !== undefined && email !== null) {
            user.email = email;
        }

        await user.save();
    }

    return user;
};

/**
 * Deletes a user by their ID.
 * @param {string} id - The ID of the user.
 * @param {string} role - The role of the user performing the deletion.
 * @returns {Promise<Object>} - The deleted user object or null if not found.
 */
const removeUser = async (id, role) => {
    let user = await User.findById(id);

    if (user) {
        let deleteUser = await User.findByIdAndDelete(id);
        return deleteUser;
    } else {
        return null;
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserByUsername,
    modifyUser,
    removeUser,
};