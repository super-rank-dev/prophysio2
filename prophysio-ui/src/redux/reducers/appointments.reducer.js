import {
    GET_APPOINTMENTS,
    GET_APPOINTMENT,
    ADD_APPOINTMENT,
    UPDATE_APPOINTMENT,
    REMOVE_APPOINTMENT
} from '../types';

const initialState = {
    appointments: [],
    appointment: {},
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_APPOINTMENTS:
            return {
                ...state,
                appointments: action.payload
            };
        case GET_APPOINTMENT:
            return {
                ...state,
                appointment: action.payload
            };
        case ADD_APPOINTMENT:
            return {
                ...state,
                appointments: [
                    ...state.appointments,
                    action.payload
                ]
            };
        case UPDATE_APPOINTMENT:
            return {
                ...state,
                appointments: state.appointments.map(appointment => {
                    if (appointment._id === action.payload.id) {
                        return {
                            ...action.payload,
                            _id: action.payload.id
                        }
                    }
                    return appointment;
                })
            };
        case REMOVE_APPOINTMENT:
            return {
                ...state,
                appointments: state.appointments.filter(appointment =>
                    appointment._id !== action.payload)
            };
        default:
            return state;
    }
}