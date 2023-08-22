import { CLEAR_ERRORS } from "../types";

// Clear Errors
export const clearErrors = () => dispatch => {
    dispatch({
        type: CLEAR_ERRORS
    })
};