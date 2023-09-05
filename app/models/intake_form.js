const mongoose = require('mongoose');
const { IntakeFormStatus } = require('../../config/enum');

// Define the registrationForm schema
const intakeFormSchema = new mongoose.Schema({
    status: {
        type: String,
        required: true,
        default: IntakeFormStatus.UNKNOWN
    },
    upperExtremity: [{
        bodyPart: {
            type: String
        },
        questionnaire: [String],
        objective: [String],
        specialTest: [String]
    }],
    lowerExtremity: [{
        bodyPart: {
            type: String
        },
        questionnaire: [String],
        objective: [String],
        specialTest: [String]
    }],
    spine: [{
        bodyPart: {
            type: String
        },
        questionnaire: [String],
        objective: [String],
        specialTest: [String]
    }]
});

// Create and export the registrationForm model
module.exports = mongoose.model('intake_forms', intakeFormSchema);