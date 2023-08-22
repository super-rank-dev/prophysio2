import axios from 'axios';
import { SERVER_ADDRESS } from '../../config/key';
import { GET_ERRORS, GET_BRANCHES } from '../types';

// Get All Branches
export const getAllBranches = () => dispatch => {
    axios
        .get(`${SERVER_ADDRESS}/api/branches`)
        .then(res =>
            dispatch({
                type: GET_BRANCHES,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};