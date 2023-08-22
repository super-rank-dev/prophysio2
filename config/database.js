const mongoose = require('mongoose');

const { mongoURI } = require('./key');

// Connect to the database
const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('Connected to the database');
    } catch (error) {
        console.error('Failed to connect to the database:', error);
        process.exit(1); // Exit the application if failed to connect to the database
    }
};

module.exports = connectDB;