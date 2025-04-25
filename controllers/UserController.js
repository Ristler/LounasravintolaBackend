const User = require('../models/User');

async function createUser(body) {
  const { nimi, salasana, email, rooli } = body;

  const user = new User({ nimi, salasana, email, rooli });
  await user.save();

  return user;
}

async function getAllUsers(res) {
  const users = await User.find();

  return users;
}

module.exports = {
  createUser,
  getAllUsers,
};

