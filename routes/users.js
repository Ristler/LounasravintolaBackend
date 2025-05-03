const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const {newUser, allUsers, deleteUser, deleteAccount, putUser} = require('../controllers/UserController');
const {authenticateToken} = require('../middlewares');

router.route('/user').post(
    body('email').trim().isEmail().escape(),
    body('nimi').trim().isLength({min: 3, max: 20}).isAlphanumeric().escape(),
    body('salasana').trim().isLength({min: 8}).escape(),
    newUser
)
router.route('/').get(allUsers)
router.route('/:id').delete(authenticateToken, deleteUser).put(
    authenticateToken,
    body('email').trim().isEmail().escape(),
    body('nimi').trim().isLength({min: 3, max: 20}).isAlphanumeric().escape(),
    body('salasana').trim().isLength({min: 8}).escape(),
    putUser
)
router.route('/purge/:id').delete(authenticateToken, deleteAccount)

module.exports = router;
