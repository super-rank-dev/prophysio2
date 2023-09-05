import {
    SET_SNACKBAR
} from '../types';

const initialState = {
    isEmpty: true,
    content: '',
    options: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_SNACKBAR:
            return {
                ...state,
                isEmpty: false,
                content: action.payload.content,
                options: action.payload.options
            };
        default:
            return state;
    }
}