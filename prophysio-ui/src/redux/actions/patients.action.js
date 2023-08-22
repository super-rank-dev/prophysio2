import axios from 'axios';
import { SERVER_ADDRESS } from '../../config/key';
import { GET_ERRORS, GET_PATIENTS, ADD_PATIENT, CONFIRM_REGISTRATION, GET_WAITING_PATIENTS } from '../types';

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

// Confirm Registration
export const confirmRegistration = (patientId, application) => dispatch => {
    axios
        .post(`${SERVER_ADDRESS}/api/patients/confirm`, { patientId, application })
        .then(res => {
            dispatch({
                type: CONFIRM_REGISTRATION,
                payload: res.data
            })
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

// Confirm Registration
export const saveWaitingPatients = (waitingPatients, navigate) => dispatch => {
    axios
        .post(`${SERVER_ADDRESS}/api/patients/waiting-patients`, { waitingPatients })
        .then(() => {
            navigate('/home/appointments');
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};