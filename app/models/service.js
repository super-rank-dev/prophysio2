const mongoose = require('mongoose');

const { Schema: { Types: { ObjectId } } } = mongoose;

// Define the service schema
const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    category: {
        type: String,
        required: true
    },
    noteRequired: {
        type: Boolean,
        required: true
    },
    branches: [ObjectId],
    rooms: [ObjectId]
});

// Create and export the service model
module.exports = mongoose.model('services', serviceSchema);