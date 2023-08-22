import {
    GET_SERVICES
} from '../types';

const initialState = {
    services: [],
    service: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_SERVICES:
            return {
                ...state,
                services: action.payload
            };
        default:
            return state;
    }
}