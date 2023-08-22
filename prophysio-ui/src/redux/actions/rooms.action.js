import axios from 'axios';
import { SERVER_ADDRESS } from '../../config/key';
import { GET_ERRORS, GET_ROOMS } from '../types';

// Get All Rooms
export const getAllRooms = () => dispatch => {
    axios
        .get(`${SERVER_ADDRESS}/api/rooms`)
        .then(res =>
            dispatch({
                type: GET_ROOMS,
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