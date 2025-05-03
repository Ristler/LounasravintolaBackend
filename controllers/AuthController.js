const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {getUserByUsername} = require('../modules/UserModule');
require('dotenv/config');

const logout = async (req, res) => {
    try {
        if (!res.locals.user) {
            return res.status(401).json({ message: 'Not authenticated' });
        }

        res.locals.user = null;

        res.status(200).json({
            message: 'Logged out successfully',
            user: null,
            token: null
        });
    } catch (error) {
        console.error('Error during logout:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const postLogin = async (req, res) => {
    console.log('postLogin', req.body);

    const user = await getUserByUsername(req.body.nimi);

    console.log("Found User", user);

    if (!user) {
        res.sendStatus(401);
        console.log('User not found', req.body);
        return;
    }

    if (!(await bcrypt.compare(req.body.salasana, user.salasana))) {
        res.sendStatus(401);
        console.log('Wrong password', req.body);
        return;
    }

    const userWithNoPassword = {
        _id: user._id,
        nimi: user.nimi,
        email: user.email,
        rooli: user.rooli,
    };

    const token = jwt.sign(userWithNoPassword, process.env.JWT_SECRET, {
        expiresIn: '24h',
    });

    res.json({user: userWithNoPassword, token});
};

const getMe = async (req, res) => {
    console.log('getMe', res.locals.user);

    if (res.locals.user) {
        res.json({message: 'token ok', user:  res.locals.user});
    } else {
        res.sendStatus(401);
    }
};

module.exports = {
    postLogin,
    getMe,
    logout
};