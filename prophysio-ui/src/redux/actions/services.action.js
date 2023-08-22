import axios from 'axios';
import { SERVER_ADDRESS } from '../../config/key';
import { GET_ERRORS, GET_SERVICES } from '../types';

// Get All Services
export const getAllServices = () => dispatch => {
    axios
        .get(`${SERVER_ADDRESS}/api/services`)
        .then(res =>
            dispatch({
                type: GET_SERVICES,
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