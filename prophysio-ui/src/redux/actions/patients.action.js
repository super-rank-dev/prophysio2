import axios from 'axios';
import { SERVER_ADDRESS } from '../../config/key';
import {
    PATIENTS_LOADING,
    PATIENTS_LOADED,
    GET_ERRORS,
    GET_PATIENTS,
    GET_PATIENT,
    ADD_PATIENT,
    CONFIRM_REGISTRATION_FORM,
    GET_WAITING_PATIENTS,
    CONFIRM_INTAKE_FORM,
    REMOVE_PATIENT,
    GET_REGISTRATION_FORM,
    GET_INTAKE_FORM,
    CLEAR_ERRORS
} from '../types';

export const setPatientsLoading = () => dispatch => {
    dispatch({
        type: PATIENTS_LOADING
    });
};

export const setPatientsLoaded = () => dispatch => {
    dispatch({
        type: PATIENTS_LOADED
    });
};

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

// Get All Patients
export const getPatient = (patientId) => dispatch => {
    dispatch(setPatientsLoading());
    axios
        .get(`${SERVER_ADDRESS}/api/patients/patient/${patientId}`)
        .then(res => {
            dispatch({
                type: GET_PATIENT,
                payload: res.data
            });
            dispatch({
                type: CLEAR_ERRORS
            });
            dispatch(setPatientsLoaded());
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Add Patient Request
export const addPatient = (patient, handleClose, enqueueSnackbar) => dispatch => {
    axios
        .post(`${SERVER_ADDRESS}/api/patients/patient`, patient)
        .then(res => {
            dispatch({
                type: ADD_PATIENT,
                payload: res.data
            })
            handleClose();
            enqueueSnackbar('New Patient Added!', { variant: 'success' });
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

export const updatePatient = (patient, enqueueSnackbar) => dispatch => {
    console.log(patient);
    axios
        .put(`${SERVER_ADDRESS}/api/patients/patient`, patient)
        .then(res => {
            enqueueSnackbar('Patient Updated!', { variant: 'success' });
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Remove Patient
export const removePatient = (patient, enqueueSnackbar) => dispatch => {
    axios
        .delete(`${SERVER_ADDRESS}/api/patients/patient/${patient._id}`)
        .then(res => {
            dispatch({
                type: REMOVE_PATIENT,
                payload: patient
            })
            enqueueSnackbar('Patient Removed!', { variant: 'success' });
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Confirm Registration Form
export const confirmRegistrationForm = (patientId, registrationForm, enqueueSnackbar) => dispatch => {
    axios
        .post(`${SERVER_ADDRESS}/api/patients/confirm-registration-form`, { patientId, registrationForm })
        .then(res => {
            dispatch({
                type: CONFIRM_REGISTRATION_FORM,
                payload: patientId
            });
            enqueueSnackbar('Registration Form Submitted!', { variant: 'success' });
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Confirm Intake Form
export const confirmIntakeForm = (patientId, intakeForm, enqueueSnackbar) => dispatch => {
    axios
        .post(`${SERVER_ADDRESS}/api/patients/confirm-intake-form`, { patientId, intakeForm })
        .then(res => {
            dispatch({
                type: CONFIRM_INTAKE_FORM,
                payload: patientId
            });
            enqueueSnackbar('Intake Form Submitted!', { variant: 'success' });
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
export const saveWaitingPatients = (waitingPatients, handleClose, enqueueSnackbar) => dispatch => {
    axios
        .post(`${SERVER_ADDRESS}/api/patients/waiting-patients`, { waitingPatients })
        .then(() => {
            handleClose();
            enqueueSnackbar('Waiting Patients Saved!', { variant: 'success' });
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Send Registration Form
export const sendRegistrationForm = (patientId, enqueueSnackbar) => dispatch => {
    axios
        .post(`${SERVER_ADDRESS}/api/patients/send-registration-form`, { patientId })
        .then(() => {
            enqueueSnackbar('Registration Form Sent!', { variant: 'success' });
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}

// Get Registration Form
export const getRegistrationForm = (patientId) => dispatch => {
    dispatch(setPatientsLoading());
    axios
        .get(`${SERVER_ADDRESS}/api/patients/get-registration-form/${patientId}`)
        .then(res => {
            dispatch({
                type: GET_REGISTRATION_FORM,
                payload: res.data
            });
            dispatch({
                type: CLEAR_ERRORS
            });
            dispatch(setPatientsLoaded());
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}

// Send Intake Form
export const sendIntakeForm = (patientId, enqueueSnackbar) => dispatch => {
    axios
        .post(`${SERVER_ADDRESS}/api/patients/send-intake-form`, { patientId })
        .then(() => {
            enqueueSnackbar('Intake Form Sent!', { variant: 'success' });
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}

// Get Intake Form
export const getIntakeForm = (patientId) => dispatch => {
    axios
        .get(`${SERVER_ADDRESS}/api/patients/get-intake-form/${patientId}`)
        .then(res => {
            dispatch({
                type: GET_INTAKE_FORM,
                payload: res.data
            });
            dispatch({
                type: CLEAR_ERRORS
            });
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}