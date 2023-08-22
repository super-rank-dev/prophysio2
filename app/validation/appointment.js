const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateAppointmentInput(data) {

    let errors = {};

    data.branchId = !isEmpty(data.branchId) ? data.branchId : '';
    data.serviceId = !isEmpty(data.serviceId) ? data.serviceId : '';
    data.practitionerId = !isEmpty(data.practitionerId) ? data.practitionerId : '';
    data.roomId = !isEmpty(data.roomId) ? data.roomId : '';
    data.startTime = !isEmpty(data.startTime) ? data.startTime : '';
    data.endTime = !isEmpty(data.endTime) ? data.endTime : '';
    data.patientId = !isEmpty(data.patientId) ? data.patientId : '';
    data.chargedAmount = !isEmpty(data.chargedAmount) ? data.chargedAmount : '';
    data.paidAmount = !isEmpty(data.paidAmount) ? data.paidAmount : '';
    data.status = !isEmpty(data.status) ? data.status : '';

    if (Validator.isEmpty(data.branchId)) errors.branchId = 'Branch field is required';
    if (Validator.isEmpty(data.serviceId)) errors.serviceId = 'Service field is required';
    if (Validator.isEmpty(data.practitionerId)) errors.practitionerId = 'Practitioner field is required';
    if (Validator.isEmpty(data.roomId)) errors.roomId = 'Room field is required';
    if (Validator.isEmpty(data.startTime)) errors.startTime = 'Start Time field is required';
    if (Validator.isEmpty(data.endTime)) errors.endTime = 'End Time field is required';
    if (Validator.isEmpty(data.patientId)) errors.patientId = 'Patient field is required';
    if (Validator.isEmpty(String(data.chargedAmount))) errors.chargedAmount = 'Charged Amount field is required';
    if (Validator.isEmpty(String(data.paidAmount))) errors.paidAmount = 'Paid Amount field is required';
    if (Validator.isEmpty(data.status)) errors.status = 'Status field is required';

    return {
        errors,
        isValid: isEmpty(errors)
    };
};