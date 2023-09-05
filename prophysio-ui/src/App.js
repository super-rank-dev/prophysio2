import { useEffect, useMemo, useState } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Box } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import store from './redux';
import NavigationManager from './components/manager/NavigationManager';
import SnackbarManager from './components/manager/SnackbarManager';
import Layout from './components/layout/Layout';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import Patients from './components/patients/Patients';
import AddPatient from './components/patients/AddPatient';
import AddPatientRequests from './components/patients/AddPatientRequests';
import PatientProfile from './components/patients/PatientProfile';
import PatientIntakeForm from './components/patients/PatientIntakeForm';
import PatientRegistrationForm from './components/patients/PatientRegistrationForm';
import PatientPortal from './components/patients/PatientPortal';
import Guarantors from './components/guarantors/Guarantors';
import Appointments from './components/appointments/Appointments';
import Billing from './components/billing/Billing';
import Invoices from './components/invoices/Invoices';
import Statement from './components/statement/Statement';
import Settings from './components/settings/Settings';
import Users from './components/users/Users';
import ProtectedRoute from './components/layout/ProtectedRoute';
import Status404 from './components/status/Status404';
import { PatientPortalType } from './config/enum';

import './App.css';

const App = () => {
    return (
        <Provider store={store}>
            <NavigationManager>
                <Box>
                    <SnackbarManager />
                    <SnackbarProvider>
                        <Router>
                            <Routes>
                                {/* <Route index element={<Landing />} /> */}
                                <Route path='' element={<Layout />}>
                                    <Route index element={<Dashboard />} />
                                    <Route path='*' element={<ProtectedRoute />}>
                                        <Route path='patients' element={<Patients />} />
                                        <Route path='add-patient' element={<AddPatient />} />
                                        <Route path='add-patient-requests' element={<AddPatientRequests />} />
                                        <Route path='edit-patient-profile/:patientId' element={<PatientProfile />} />
                                        <Route path='edit-patient-registration/:patientId' element={<PatientRegistrationForm />} />
                                        <Route path='edit-patient-intake/:patientId' element={<PatientIntakeForm />} />
                                        <Route path='guarantors' element={<Guarantors />} />
                                        <Route path='appointments' element={<Appointments />} />
                                        <Route path='billing' element={<Billing />} />
                                        <Route path='invoices' element={<Invoices />} />
                                        <Route path='statement' element={<Statement />} />
                                        <Route path='settings' element={<Settings />} />
                                        <Route path='users' element={<Users />} />
                                        <Route path='*' element={<Status404 />} />
                                    </Route>
                                </Route>
                                <Route path='login' element={<Login />} />
                                <Route path='register' element={<Register />} />
                                <Route path='patient-registration/:patientId' element={<PatientPortal type={PatientPortalType.REGISTRATION} />} />
                                <Route path='patient-intake/:patientId' element={<PatientPortal type={PatientPortalType.INTAKE} />} />
                            </Routes>
                        </Router>
                    </SnackbarProvider>
                </Box>
            </NavigationManager>
        </Provider >
    );
}

export default App;