const {createUser, getAllUsers, modifyUser, removeUser} = require('../modules/UserModule');
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

const putUser = async (req, res, next) => {
  try {
    const {_id, rooli} = res.locals.user;

    // Check if the user is authorized to update
    if (rooli !== 'admin' && _id !== parseInt(req.params.id)) {
      return res.status(403).json({message: 'Forbidden'});
    }

    const result = await modifyUser(req.body, req.params.id, rooli);

    if (result) {
      res.status(200).json({result});
    } else {
      res.status(400).json({message: 'Update failed'});
    }
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({message: 'Internal server error'});
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const {_id, rooli} = res.locals.user;

    // Check if the user is authorized to delete
    if (rooli !== 'admin' && _id !== req.params.id) {
      return res.status(403).json({message: 'Forbidden'});
    }

    const result = await removeUser(req.params.id, rooli);

    if (result) {
      res.status(200).json({result});
    } else {
      res.status(400).json({message: 'Delete failed'});
    }

  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({message: 'Internal server error'});
  }
}

const deleteAccount = async (req, res) => {
  try {
    const {_id, rooli} = res.locals.user;
    console.log('_id', _id);
    console.log('rooli', rooli);
    console.log('req.params.id', req.params.id);

    // Check if the user is authorized to delete own account
    if (rooli === 'user' && _id !== req.params.id) {
      return res.status(403).json({message: 'Forbidden'});
    }

    const result = await removeUser(req.params.id, rooli);
    
    if (result) {
      res.status(200).json({result});
    } else {
      res.status(400).json({message: 'Delete failed'});
    }

  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({message: 'Internal server error'});
  }
}

module.exports = {
  newUser,
  allUsers,
  deleteUser,
  deleteAccount,
  putUser,
};

