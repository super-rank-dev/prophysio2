import {
    GET_PATIENTS,
    ADD_PATIENT,
    GET_WAITING_PATIENTS
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
            }
        case ADD_PATIENT:
            return {
                ...state,
                patients: [
                    ...state.patients,
                    action.payload
                ]
            };
        case GET_WAITING_PATIENTS:
            return {
                ...state,
                waitingPatients: action.payload
            };
        default:
            return state;
    }
}