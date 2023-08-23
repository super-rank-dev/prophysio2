import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ButtonGroup, Button, Grid, Stack, Box } from '@mui/material';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CalendarViewWeekIcon from '@mui/icons-material/CalendarViewWeek';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import "react-big-calendar-like-google/lib/css/react-big-calendar.css";
import * as Actions from '../../redux/actions';
import AppointmentModel from '../../models/appointment.model';
import Calendar from './Calendar';
import AddAppointment from './AddAppointment';
import EditAppointment from './EditAppointment';
import { CalendarViewMode } from '../../config/enum';
import AddPatientModal from '../patients/AddPatientModal';
import { adjustAppointments } from '../../utils/compatibility';
import WaitingListModal from './WaitingListModal';

const Appointments = () => {

    const dispatch = useDispatch();
    const [openAddAppointment, setOpenAddAppointment] = useState(false);
    const [openEditAppointment, setOpenEditAppointment] = useState(false);
    const [openAddPatient, setOpenAddPatient] = useState(false);
    const [openWaitingList, setOpenWaitingList] = useState(false);
    const [events, setEvents] = useState([]);
    const [viewMode, setViewMode] = useState(CalendarViewMode.WEEK);

    useEffect(() => {
        dispatch(Actions.getAllAppointments());
        dispatch(Actions.getAllUsers());
        dispatch(Actions.getAllPatients());
        dispatch(Actions.getAllServices());
        dispatch(Actions.getAllBranches());
        dispatch(Actions.getAllRooms());
    }, [dispatch]);

    const { users } = useSelector(({ users }) => (users));
    const { appointments } = useSelector(({ appointments }) => (appointments));
    const { patients } = useSelector(({ patients }) => (patients));
    const { services } = useSelector(({ services }) => (services));

    useEffect(() => {
        if (appointments && users && patients && services) {
            setEvents(adjustAppointments({
                appointments,
                users,
                patients,
                services
            }));
        }
    }, [appointments, users, patients, services]);

    const handleAddAppointmentOpen = (data) => {
        const appointment = new AppointmentModel(data);
        dispatch(Actions.getAppointment(appointment));
        dispatch(Actions.clearErrors());
        setOpenAddAppointment(true);
    }
    const handleEditAppointmentOpen = (data) => {
        const appointment = new AppointmentModel(data);
        dispatch(Actions.getAppointment(appointment));
        dispatch(Actions.clearErrors());
        setOpenEditAppointment(true);
    }

    const handleAddAppointmentClose = () => setOpenAddAppointment(false);
    const handleEditAppointmentClose = () => setOpenEditAppointment(false);

    const handleAddPatientOpen = () => {
        dispatch(Actions.clearErrors());
        setOpenAddPatient(true);
    };
    const handleAddPatientClose = () => setOpenAddPatient(false);

    const handleWaitingListOpen = () => {
        setOpenWaitingList(true);
    };
    const handleWaitingListClose = () => setOpenWaitingList(false);

    return (
        <Stack spacing={2}>
            <Grid container>
                <Grid item xs={12} md={6} lg={4} xl={3}>
                    <ButtonGroup variant="outlined" fullWidth>
                        <Button
                            startIcon={<AddCircleIcon />}
                            color='success'
                            onClick={handleAddPatientOpen}
                        >Add Patient</Button>
                        <Button
                            startIcon={<HourglassEmptyIcon />}
                            color='secondary'
                            onClick={handleWaitingListOpen}
                        >Waiting List</Button>
                    </ButtonGroup>
                </Grid>
                <Box flexGrow={1} p={1} display={{ xs: 'block', md: 'none', lg: 'block' }}></Box>
                <Grid item xs={12} md={6} lg={4} xl={3}>
                    <ButtonGroup variant="outlined" fullWidth>
                        <Button
                            startIcon={<CalendarMonthIcon />}
                            onClick={() => setViewMode(CalendarViewMode.MONTH)}
                        >Month</Button>
                        <Button
                            startIcon={<CalendarViewWeekIcon />}
                            onClick={() => setViewMode(CalendarViewMode.WEEK)}
                        >Week</Button>
                        <Button
                            startIcon={<CalendarTodayIcon />}
                            onClick={() => setViewMode(CalendarViewMode.DAY)}
                        >Day</Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
            <AddAppointment open={openAddAppointment} handleClose={handleAddAppointmentClose} />
            <EditAppointment open={openEditAppointment} handleClose={handleEditAppointmentClose} />
            <AddPatientModal open={openAddPatient} handleClose={handleAddPatientClose} />
            <WaitingListModal open={openWaitingList} handleClose={handleWaitingListClose} />
            <Calendar
                events={events}
                handleAddAppointmentOpen={handleAddAppointmentOpen}
                handleEditAppointmentOpen={handleEditAppointmentOpen}
                viewMode={viewMode}
            />
        </Stack>
    );
}

export default Appointments;