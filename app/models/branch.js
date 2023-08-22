const mongoose = require('mongoose');

const { Schema: { Types: { ObjectId } } } = mongoose;

// Define the branch schema
const branchSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    address2: {
        type: String
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    postalCode: {
        type: Number,
        required: true
    },
    countryCode: {
        type: Number,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    rooms: [ObjectId]
});

// Create and export the branch model
module.exports = mongoose.model('branches', branchSchema);