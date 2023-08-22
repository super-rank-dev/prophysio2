const mongoose = require('mongoose');
const { PatientStatus } = require('../../config/enum');

const { Schema: { Types: { ObjectId } } } = mongoose;

// Define the patient schema
const patientSchema = new mongoose.Schema({
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
    applicationId: {
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
module.exports = mongoose.model('patients', patientSchema);