import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import * as Actions from './redux/actions';
import store from './redux';
import Landing from './components/layout/Landing';
import Layout from './components/layout/Layout';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import Patients from './components/patients/Patients';
import AddPatient from './components/patients/AddPatient';
import AddPatientRequests from './components/patients/AddPatientRequests';
import Guarantors from './components/guarantors/Guarantors';
import Appointments from './components/appointments/Appointments';
import WaitingList from './components/appointments/WaitingList';
import Billing from './components/billing/Billing';
import Invoices from './components/invoices/Invoices';
import Statement from './components/statement/Statement';
import Settings from './components/settings/Settings';
import Users from './components/users/Users';
import ProtectedRoute from './components/layout/ProtectedRoute';

import './App.css';
import PatientPortal from './components/patients/PatientPortal';
import { PatientPortalType } from './config/enum';
import PatientIntakeForm from './components/patients/PatientIntakeForm';
import PatientRegistrationForm from './components/patients/PatientRegistrationForm';

const App = () => {

    useEffect(() => {
        // Check for token
        if (localStorage.jwtToken) {
            // Set auth token header auth
            setAuthToken(localStorage.jwtToken);
            // Decode token and get user info and exp
            const decoded = jwt_decode(localStorage.jwtToken);
            // Set user and isAuthenticated
            store.dispatch(Actions.setCurrentUser(decoded));
            // Check for expired token
            const currentTime = Date.now() / 1000;
            if (decoded.exp < currentTime) {
                // Logout user
                store.dispatch(Actions.logoutUser());
                // Clear current Profile
                // store.dispatch(clearCurrentProfile());
                // Redirect to login
                window.location.href = '/login';
            }
        }
    }, [store.dispatch]);

    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route index element={<Landing />} />
                    <Route path='home' element={<Layout />}>
                        <Route index element={<Dashboard />} />
                        <Route path='*' element={<ProtectedRoute />}>
                            <Route path='patients' element={<Patients />} />
                            <Route path='add-patient' element={<AddPatient />} />
                            <Route path='add-patient-requests' element={<AddPatientRequests />} />
                            <Route path='patient-registration/:patientId' element={<PatientRegistrationForm />} />
                            <Route path='patient-intake/:patientId' element={<PatientIntakeForm />} />
                            <Route path='guarantors' element={<Guarantors />} />
                            <Route path='appointments' element={<Appointments />} />
                            <Route path='waiting-list' element={<WaitingList />} />
                            <Route path='billing' element={<Billing />} />
                            <Route path='invoices' element={<Invoices />} />
                            <Route path='statement' element={<Statement />} />
                            <Route path='settings' element={<Settings />} />
                            <Route path='users' element={<Users />} />
                        </Route>
                    </Route>
                    <Route path='login' element={<Login />} />
                    <Route path='register' element={<Register />} />
                    <Route path='patient-registration/:patientId' element={<PatientRegistrationForm />} />
                    <Route path='patient-intake/:patientId' element={<PatientIntakeForm />} />
                </Routes>
            </Router>
        </Provider >
    );
}

export default App;