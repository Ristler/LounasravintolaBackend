const User = require('../../models/User');

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

const getUserById = async (id) => {
    const user = await User.findById(id);
    return user;
}

const modifyUser = async (body, id, rooli) => {
    const { nimi, salasana, email } = body;

    let user = await User.findById(id);

    if (user) {
        user.nimi = nimi;
        user.salasana = salasana;
        user.email = email;

        await user.save();
    }

    return user;
}

const removeUser = async (id, role) => {
    let user = await User.findById(id);

    if (user) {
        let deleteUser = await User.findByIdAndDelete(id);
        return deleteUser;
    } else {
        return deleteUser;
    }

};

module.exports = {
    createUser,
    getAllUsers,
    getUserByUsername,
    modifyUser,
    removeUser,
};