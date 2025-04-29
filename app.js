// Error handling

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
const userRoutes = require('./routes/users'); // Add this line
const foodRoutes = require('./routes/foods')
const app = express();

app.use(express.json());

const corsOptions = {

    origin: function (origin, callback) {
        // Allow any origin
        callback(null, true);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
    preflightContinue: false,
    optionSuccessStatus: 204,
}

app.use(cors(corsOptions));
app.use('/users', userRoutes);  // Add this line to register routes
app.use('/foods', foodRoutes);

// Connect to MongoDB with error handling
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('✅ Connected to MongoDB');

        // Start server only after DB connects
        const PORT = process.env.PORT || 3000;
        const IP = process.env.IP || 'localhost'
        app.listen(PORT, () => {
            console.log(`🚀 Server running at http://${IP}':'${PORT}`);
        });
    })
    .catch((err) => {
        console.error('❌ Failed to connect to MongoDB:', err.message);
        process.exit(1); // Exit the app if DB fails to connect
    });