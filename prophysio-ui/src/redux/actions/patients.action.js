import axios from 'axios';
import { SERVER_ADDRESS } from '../../config/key';
import {
    GET_ERRORS,
    GET_PATIENTS,
    ADD_PATIENT,
    CONFIRM_REGISTRATION_FORM,
    GET_WAITING_PATIENTS,
    CONFIRM_INTAKE_FORM,
    REMOVE_PATIENT
} from '../types';

// Get All Patients
export const getAllPatients = () => dispatch => {
    axios
        .get(`${SERVER_ADDRESS}/api/patients`)
        .then(res =>
            dispatch({
                type: GET_PATIENTS,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Add Patient Request
export const addPatient = (patient, handleClose) => dispatch => {
    axios
        .post(`${SERVER_ADDRESS}/api/patients`, patient)
        .then(res => {
            dispatch({
                type: ADD_PATIENT,
                payload: res.data
            })
            handleClose();
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Remove Patient
export const removePatient = (patient) => dispatch => {
    axios
        .delete(`${SERVER_ADDRESS}/api/patients/${patient._id}`)
        .then(res => {
            dispatch({
                type: REMOVE_PATIENT,
                payload: patient
            })
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Confirm Registration Form
export const confirmRegistrationForm = (patientId, registrationForm) => dispatch => {
    axios
        .post(`${SERVER_ADDRESS}/api/patients/confirm-registration-form`, { patientId, registrationForm })
        .then(res => {
            dispatch({
                type: CONFIRM_REGISTRATION_FORM,
                payload: patientId
            });
            alert('Registration Form Submitted!');
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Confirm Intake Form
export const confirmIntakeForm = (patientId, intakeForm) => dispatch => {
    axios
        .post(`${SERVER_ADDRESS}/api/patients/confirm-intake-form`, { patientId, intakeForm })
        .then(res => {
            dispatch({
                type: CONFIRM_INTAKE_FORM,
                payload: patientId
            });
            alert('Intake Form Submitted!');
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Get All Patients
export const getWaitingPatients = () => dispatch => {
    axios
        .get(`${SERVER_ADDRESS}/api/patients/waiting-patients`)
        .then(res =>
            dispatch({
                type: GET_WAITING_PATIENTS,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Save Waiting Patients
export const saveWaitingPatients = (waitingPatients, handleClose) => dispatch => {
    axios
        .post(`${SERVER_ADDRESS}/api/patients/waiting-patients`, { waitingPatients })
        .then(() => {
            handleClose();
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Send Registration Form
export const sendRegistrationForm = (patientId) => dispatch => {
    axios
        .post(`${SERVER_ADDRESS}/api/patients/send-registration-form`, { patientId })
        .then(() => {
            alert('Registration Form Sent!');
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}

// Send Intake Form
export const sendIntakeForm = (patientId) => dispatch => {
    axios
        .post(`${SERVER_ADDRESS}/api/patients/send-intake-form`, { patientId })
        .then(() => {
            alert('Intake Form Sent!');
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}