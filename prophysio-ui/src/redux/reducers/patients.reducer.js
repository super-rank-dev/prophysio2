import { IntakeFormStatus, RegistrationFormStatus } from '../../config/enum';
import {
    GET_PATIENTS,
    ADD_PATIENT,
    GET_WAITING_PATIENTS,
    REMOVE_PATIENT,
    CONFIRM_REGISTRATION_FORM,
    CONFIRM_INTAKE_FORM
} from '../types';

const initialState = {
    patients: [],
    patient: {},
    requests: [],
    request: {},
    waitingPatients: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_PATIENTS:
            return {
                ...state,
                patients: action.payload
            };
        case ADD_PATIENT:
            return {
                ...state,
                patients: [
                    ...state.patients,
                    action.payload
                ]
            };
        case REMOVE_PATIENT:
            return {
                ...state,
                patients: state.patients.filter(patient =>
                    patient._id !== action.payload._id)
            };
        case GET_WAITING_PATIENTS:
            return {
                ...state,
                waitingPatients: action.payload
            };
        case CONFIRM_REGISTRATION_FORM:
            return {
                ...state,
                patients: state.patients.map(patient => {
                    if (patient._id === action.payload) {
                        patient.registrationForm.status = RegistrationFormStatus.PENDING;
                    }
                    return patient;
                })
            };
        case CONFIRM_INTAKE_FORM:
            return {
                ...state,
                patients: state.patients.map(patient => {
                    if (patient._id === action.payload) {
                        patient.intakeForm.status = IntakeFormStatus.PENDING;
                    }
                    return patient;
                })
            };
        default:
            return state;
    }
}