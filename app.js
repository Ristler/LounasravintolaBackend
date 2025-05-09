/**
 * @file app.js
 * @description Entry point for the application. Sets up middleware, routes, and database connection.
 */

process.on('uncaughtException', (err) => {
    console.error('❌ Uncaught Exception: ', err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Promise error: ', reason);
});

require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const userRoutes = require('./api/routes/users');
const foodRoutes = require('./api/routes/foods');
const authRoutes = require('./api/routes/auth');
const orderRoutes = require('./api/routes/orders');
const app = express();

/**
 * Middleware to parse JSON requests.
 */
app.use(express.json());

/**
 * CORS configuration options.
 * @type {Object}
 */
const corsOptions = {
    origin: function (origin, callback) {
        callback(null, true);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    preflightContinue: false,
    optionSuccessStatus: 204,
};

/**
 * Middleware to enable CORS.
 */
app.use(cors(corsOptions));

/**
 * Route for user-related operations.
 * @module Routes/Users
 */
app.use('/users', userRoutes);

/**
 * Route for food-related operations.
 * @module Routes/Foods
 */
app.use('/foods', foodRoutes);

/**
 * Route for authentication-related operations.
 * @module Routes/Auth
 */
app.use('/auth', authRoutes);

/**
 * Route for order-related operations.
 * @module Routes/Orders
 */
app.use('/orders', orderRoutes);

/**
 * Connects to MongoDB and starts the server.
 */
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('✅ Connected to MongoDB');

        const PORT = process.env.PORT || 3000;
        const IP = process.env.IP || 'localhost';
        app.listen(PORT, () => {
            console.log(`🚀 Server running at http://${IP}:${PORT}`);
        });
    })
    .catch((err) => {
        console.error('❌ Failed to connect to MongoDB:', err.message);
        process.exit(1);
    });

module.exports = app;