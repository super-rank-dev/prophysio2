const mongoose = require('mongoose');

// Define the room schema
const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

// Create and export the room model
module.exports = mongoose.model('rooms', roomSchema);