const mongoose = require('mongoose');

const { Schema: { Types: { ObjectId } } } = mongoose;

// Define the patient schema
const waitingPatients = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    registrationFormId: {
        type: ObjectId,
        required: true
    },
    active: {
        type: Boolean,
        required: true,
        default: false
    }
});

// Create and export the patient model
module.exports = mongoose.model('waiting_patients', waitingPatients);