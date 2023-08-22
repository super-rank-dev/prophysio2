import axios from 'axios';
import { SERVER_ADDRESS } from '../../config/key';
import { GET_ERRORS, GET_USERS } from '../types';

// Get All Users
export const getAllUsers = () => dispatch => {
    axios
        .get(`${SERVER_ADDRESS}/api/users`)
        .then(res =>
            dispatch({
                type: GET_USERS,
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