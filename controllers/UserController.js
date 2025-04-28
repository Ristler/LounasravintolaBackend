const {createUser, getAllUsers} = require('../Modules/UserModule');
const bcrypt = require('bcrypt');

const newUser = async (req, res) => {
  try {
    req.body.salasana = bcrypt.hashSync(req.body.salasana, 10);

    const user = await createUser(req.body);

    res.json(user);
  } catch (error) {
    res.status(400).json({ message: 'Error creating a new user!', error: error.message });
  }
};

const allUsers = async (req, res) => {
  try {
    const users = await getAllUsers();

    res.json(users);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching all users!', error: error.message });
  }
};

module.exports = {
  newUser,
  allUsers,
};

