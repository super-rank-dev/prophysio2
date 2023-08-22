import {
    GET_ROOMS
} from '../types';

const initialState = {
    rooms: [],
    room: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ROOMS:
            return {
                ...state,
                rooms: action.payload
            };
        default:
            return state;
    }
}