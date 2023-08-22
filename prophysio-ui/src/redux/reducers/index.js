import { combineReducers } from 'redux';
import authReducer from './auth.reducer';
import usersReducer from './users.reducer';
import patientsReducer from './patients.reducer';
import appointmentsReducer from './appointments.reducer';
import servicesReducer from './services.reducer';
import branchsReducer from './branches.reducer';
import roomsReducer from './rooms.reducer';
import errorReducer from './error.reducer';

const rootReducer = combineReducers({
    auth: authReducer,
    users: usersReducer,
    patients: patientsReducer,
    appointments: appointmentsReducer,
    services: servicesReducer,
    branches: branchsReducer,
    rooms: roomsReducer,
    error: errorReducer
});

export default rootReducer;