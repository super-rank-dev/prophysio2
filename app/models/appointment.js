const mongoose = require('mongoose');

const { Schema: { Types: { ObjectId } } } = mongoose;

// Define the appointment schema
const appointmentSchema = new mongoose.Schema({
    branchId: {
        type: ObjectId,
        required: true
    },
    serviceId: {
        type: ObjectId,
        required: true
    },
    practitionerId: {
        type: ObjectId,
        required: true
    },
    roomId: {
        type: ObjectId,
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    patientId: {
        type: ObjectId,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    chargedAmount: {
        type: Number,
        required: true,
    },
    paidAmount: {
        type: Number,
        required: true
    }
});

// Create and export the appointment model
module.exports = mongoose.model('appointments', appointmentSchema);