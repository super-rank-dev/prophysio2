import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { Button, ButtonGroup, Divider, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimeField } from '@mui/x-date-pickers/DateTimeField';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { makeStyles } from '@mui/styles';
import * as Actions from '../../redux/actions';
import AppointmentModel from '../../models/appointment.model';
import { AppointmentStatus } from '../../config/enum';

const useStyles = makeStyles({
    appointmentModal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#FFF',
        boxShadow: '24px',
        padding: '2rem',
        outline: 'none'
    },
    '@media screen and (max-width: 600px)': {
        appointmentModal: {
            position: 'absolute',
            top: 0,
            left: 0,
            transform: 'translate(0, 0)',
            backgroundColor: '#FFF',
            outline: 'none',
            height: '100vh',
            overflow: 'auto'
        }
    }
});

const AddAppointment = ({ open, handleClose }) => {

    const classes = useStyles();

    const [isVertical, setIsVertical] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        const handleResize = () => {
            setIsVertical(window.innerWidth <= 600); // Determine your desired screen width breakpoint
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [dispatch]);

    const { users } = useSelector(({ users }) => (users));
    const { patients } = useSelector(({ patients }) => (patients));
    const { appointment } = useSelector(({ appointments }) => (appointments));
    const { services } = useSelector(({ services }) => (services));
    const { branches } = useSelector(({ branches }) => (branches));
    const { rooms } = useSelector(({ rooms }) => (rooms));

    const error = useSelector(({ error }) => error);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const appointment = new AppointmentModel({
            branchId: data.get('branch'),
            serviceId: data.get('service'),
            practitionerId: data.get('practitioner'),
            roomId: data.get('room'),
            chargedAmount: data.get('chargedAmount'),
            paidAmount: 0,
            startTime: new Date(data.get('startTime')).toISOString(),
            endTime: new Date(data.get('endTime')).toISOString(),
            patientId: data.get('patient'),
            status: AppointmentStatus.BOOKED
        });
        dispatch(Actions.addAppointment(appointment, handleClose));
    };

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
                backdrop: {
                    timeout: 500,
                },
            }}
        >
            <Fade in={open}>
                <Box className={classes.appointmentModal}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <Stack spacing={2}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Typography>
                                    ENTER APPOINTMENT DETAILS
                                </Typography>
                                <Divider />
                                <Box component="form" noValidate onSubmit={handleSubmit}>
                                    <Grid container>
                                        <Grid item xs={12} md={6} p={2}>
                                            <FormControl required fullWidth size='small' error={error.branchId}>
                                                <InputLabel>Branch</InputLabel>
                                                <Select
                                                    margin="normal"
                                                    required
                                                    name="branch"
                                                    label="Branch"
                                                    type="branch"
                                                    id="branch"
                                                >
                                                    {branches.map(branch => (
                                                        <MenuItem key={branch._id} value={branch._id}>{branch.name}</MenuItem>
                                                    ))}
                                                </Select>
                                                <FormHelperText>{error.branchId}</FormHelperText>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} md={6} p={2}>
                                            <FormControl required fullWidth size='small' error={error.serviceId}>
                                                <InputLabel>Service</InputLabel>
                                                <Select
                                                    margin="normal"
                                                    required
                                                    name="service"
                                                    label="Service"
                                                    type="service"
                                                    id="service"
                                                >
                                                    {services.map(service => (
                                                        <MenuItem key={service._id} value={service._id}>{service.name}</MenuItem>
                                                    ))}
                                                </Select>
                                                <FormHelperText>{error.serviceId}</FormHelperText>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} md={6} p={2}>
                                            <FormControl required fullWidth size='small' error={error.practitionerId}>
                                                <InputLabel>Practitioner</InputLabel>
                                                <Select
                                                    margin="normal"
                                                    required
                                                    name="practitioner"
                                                    label="Practitioner"
                                                    type="practitioner"
                                                    id="practitioner"
                                                >
                                                    {users.map(user => (
                                                        <MenuItem key={user._id} value={user._id}>{`${user.firstName} ${user.lastName}`}</MenuItem>
                                                    ))}
                                                </Select>
                                                <FormHelperText>{error.practitionerId}</FormHelperText>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} md={6} p={2}>
                                            <FormControl required fullWidth size='small' error={error.roomId}>
                                                <InputLabel>Room</InputLabel>
                                                <Select
                                                    margin="normal"
                                                    required
                                                    name="room"
                                                    label="Room"
                                                    type="room"
                                                    id="room"
                                                >
                                                    {rooms.map(room => (
                                                        <MenuItem key={room._id} value={room._id}>{room.name}</MenuItem>
                                                    ))}
                                                </Select>
                                                <FormHelperText>{error.roomId}</FormHelperText>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} px={2}>
                                            <TextField
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="chargedAmount"
                                                label="Charged Amount"
                                                name="chargedAmount"
                                                type='number'
                                                size='small'
                                                error={error.chargedAmount}
                                                helperText={error.chargedAmount}
                                            />
                                        </Grid>
                                        <Grid item xs={12} px={2}>
                                            <DateTimeField
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="startTime"
                                                label="Start Time"
                                                name="startTime"
                                                size='small'
                                                value={dayjs(appointment.startTime)}
                                            />
                                        </Grid>
                                        <Grid item xs={12} px={2}>
                                            <DateTimeField
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="endTime"
                                                label="End Time"
                                                name="endTime"
                                                size='small'
                                                value={dayjs(appointment.endTime)}
                                            />
                                        </Grid>
                                        <Grid item xs={12} p={2}>
                                            <FormControl required fullWidth size='small' error={error.patientId}>
                                                <InputLabel>Patient</InputLabel>
                                                <Select
                                                    margin="normal"
                                                    required
                                                    name="patient"
                                                    label="Patient"
                                                    type="patient"
                                                    id="patient"
                                                >
                                                    {patients.map(patient => (
                                                        <MenuItem key={patient._id} value={patient._id}>{`${patient.firstName} ${patient.lastName}`}</MenuItem>
                                                    ))}
                                                </Select>
                                                <FormHelperText>{error.patientId}</FormHelperText>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} p={2}>
                                            <ButtonGroup
                                                variant="outlined"
                                                orientation={isVertical ? 'vertical' : 'horizontal'}
                                                color="primary"
                                                fullWidth
                                            >
                                                <Button startIcon={<SaveIcon />} type='submit'>Save</Button>
                                                <Button startIcon={<CancelIcon />} color='secondary' onClick={handleClose}>Cancel</Button>
                                            </ButtonGroup>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </LocalizationProvider>
                        </Stack>
                    </LocalizationProvider>
                </Box>
            </Fade>
        </Modal>
    );
}

export default AddAppointment;