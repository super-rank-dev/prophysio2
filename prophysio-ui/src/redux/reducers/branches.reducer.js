import {
    GET_BRANCHES
} from '../types';

const initialState = {
    branches: [],
    branch: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_BRANCHES:
            return {
                ...state,
                branches: action.payload
            };
        default:
            return state;
    }
}