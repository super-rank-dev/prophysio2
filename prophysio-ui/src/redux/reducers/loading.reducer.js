import {
    PAGE_LOADING,
    PAGE_LOADED
} from '../types';

const initialState = {
    isLoading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case PAGE_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case PAGE_LOADED:
            return {
                ...state,
                isLoading: false
            };
        default:
            return state;
    }
}