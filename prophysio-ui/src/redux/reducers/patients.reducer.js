import { IntakeFormStatus, RegistrationFormStatus } from '../../config/enum';
import {
    PATIENTS_LOADING,
    PATIENTS_LOADED,
    GET_PATIENTS,
    ADD_PATIENT,
    GET_WAITING_PATIENTS,
    REMOVE_PATIENT,
    CONFIRM_REGISTRATION_FORM,
    CONFIRM_INTAKE_FORM,
    GET_REGISTRATION_FORM,
    GET_INTAKE_FORM,
    GET_PATIENT
} from '../types';

const initialState = {
    isLoading: false,
    patients: [],
    patient: {},
    requests: [],
    request: {},
    waitingPatients: [],
    registrationForm: {},
    intakeForm: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case PATIENTS_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case PATIENTS_LOADED:
            return {
                ...state,
                isLoading: false
            }
        case GET_PATIENTS:
            return {
                ...state,
                patients: action.payload
            };
        case GET_PATIENT:
            return {
                ...state,
                patient: action.payload
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
        case GET_REGISTRATION_FORM:
            return {
                ...state,
                registrationForm: action.payload
            };
        case GET_INTAKE_FORM:
            return {
                ...state,
                intakeForm: action.payload
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