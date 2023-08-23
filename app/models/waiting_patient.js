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
    dateOfBirth: {
        type: Date
    },
    gender: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    address: {
        type: String
    },
    emergencyContact: {
        type: String
    },
    registrationForm: {
        type: ObjectId,
        required: true,
        ref: 'registration_forms'
    },
    intakeForm: {
        type: ObjectId,
        required: true,
        ref: 'intake_forms'
    },
    active: {
        type: Boolean,
        required: true,
        default: false
    }
});

// Create and export the patient model
module.exports = mongoose.model('waiting_patients', waitingPatients);