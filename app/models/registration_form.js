const mongoose = require('mongoose');
const { RegistrationFormStatus } = require('../../config/enum');

const { Schema: { Types: { ObjectId } } } = mongoose;

// Define the registrationForm schema
const registrationFormSchema = new mongoose.Schema({
    status: {
        type: String,
        required: true,
        default: RegistrationFormStatus.PENDING
    },
    title: {
        type: String,
        require: true
    },
    firstName: {
        type: String,
        require: true
    },
    middleName: {
        type: String
    },
    lastName: {
        type: String,
        require: true
    },
    dateOfBirth: {
        type: Date,
        require: true
    },
    gender: {
        type: String,
        require: true
    },
    mobilePhone: {
        type: String,
        require: true
    },
    email: {
        type: String
    },
    idType: {
        type: String,
    },
    idNumber: {
        type: String
    },
    homeAddress: {
        type: String
    },
    homeAddress2: {
        type: String
    },
    homeCity: {
        type: String
    },
    homeState: {
        type: String
    },
    homePostalCode: {
        type: Number
    },
    homeCountry: {
        type: String
    },
    homePhone: {
        type: String
    },
    nokFirstName: {
        type: String
    },
    nokLastName: {
        type: String
    },
    nokPhoneNumber: {
        type: String
    },
    employmentStatus: {
        type: String
    },
    jobTitle: {
        type: String
    },
    employer: {
        type: String
    },
    workAddress: {
        type: String
    },
    workAddress2: {
        type: String
    },
    workCity: {
        type: String
    },
    workState: {
        type: String
    },
    workPostalCode: {
        type: Number
    },
    workCountry: {
        type: String
    },
    workPhone: {
        type: String
    },
    doctorFirstName: {
        type: String
    },
    doctorLastName: {
        type: String
    },
    practiceName: {
        type: String
    },
    practiceAddress: {
        type: String
    },
    practiceAddress2: {
        type: String
    },
    practiceCity: {
        type: String
    },
    practiceState: {
        type: String
    },
    practicePostalCode: {
        type: String
    },
    practiceCountry: {
        type: String
    },
    practicePhone: {
        type: String
    },
    practicePhone: {
        type: String
    },
    physiotherapistId: {
        type: ObjectId
    },
    howHeardId: {
        type: ObjectId
    }
});

// Create and export the registrationForm model
module.exports = mongoose.model('registration_forms', registrationFormSchema);