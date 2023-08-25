const mongoose = require('mongoose');

const { Schema: { Types: { ObjectId } } } = mongoose;

// Define the patient schema
const waitingPatients = new mongoose.Schema({
    patient: {
        type: ObjectId,
        required: true
    }
});

// Create and export the patient model
module.exports = mongoose.model('waiting_patients', waitingPatients);