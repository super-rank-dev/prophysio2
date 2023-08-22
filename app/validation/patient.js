const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePatientInput(data) {
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : '';
    data.firstName = !isEmpty(data.firstName) ? data.firstName : '';
    data.lastName = !isEmpty(data.lastName) ? data.lastName : '';

    if (!Validator.isEmail(data.email)) {
        errors.email = 'Email is invalid';
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }

    if (Validator.isEmpty(data.firstName)) {
        errors.firstName = 'First Name field is required';
    }

    if (Validator.isEmpty(data.lastName)) {
        errors.lastName = 'Last Name field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};