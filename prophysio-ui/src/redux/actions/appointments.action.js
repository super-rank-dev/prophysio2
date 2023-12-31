import axios from 'axios';
import { SERVER_ADDRESS } from '../../config/key';
import {
    GET_ERRORS,
    GET_APPOINTMENTS,
    GET_APPOINTMENT,
    ADD_APPOINTMENT,
    UPDATE_APPOINTMENT,
    REMOVE_APPOINTMENT,
    SET_SNACKBAR
} from '../types';

// Get All Appointments
export const getAllAppointments = () => dispatch => {
    axios
        .get(`${SERVER_ADDRESS}/api/appointments`)
        .then(res =>
            dispatch({
                type: GET_APPOINTMENTS,
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

// Get Appointment
export const getAppointment = (appointment) => dispatch => {
    dispatch({
        type: GET_APPOINTMENT,
        payload: appointment
    })
};

// Add Appointment
export const addAppointment = (appointment, handleClose) => dispatch => {
    axios
        .post(`${SERVER_ADDRESS}/api/appointments`, appointment)
        .then((res) => {
            dispatch({
                type: ADD_APPOINTMENT,
                payload: res.data
            });
            handleClose();
            dispatch({
                type: SET_SNACKBAR,
                payload: {
                    content: 'New Appointment Created!',
                    options: { variant: 'success' }
                }
            });
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// Edit Appointment
export const editAppointment = (appointment, handleClose) => dispatch => {
    axios
        .put(`${SERVER_ADDRESS}/api/appointments`, appointment)
        .then(() => {
            dispatch({
                type: UPDATE_APPOINTMENT,
                payload: appointment
            });
            handleClose();
            dispatch({
                type: SET_SNACKBAR,
                payload: {
                    content: 'Appointment Updated!',
                    options: { variant: 'success' }
                }
            });
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}

// Remove Appointment
export const removeAppointment = (appointmentId, handleClose) => dispatch => {
    axios
        .delete(`${SERVER_ADDRESS}/api/appointments/${appointmentId}`)
        .then(() => {
            dispatch({
                type: REMOVE_APPOINTMENT,
                payload: appointmentId
            });
            handleClose();
            dispatch({
                type: SET_SNACKBAR,
                payload: {
                    content: 'Appointment Removed!',
                    options: { variant: 'success' }
                }
            });
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
}