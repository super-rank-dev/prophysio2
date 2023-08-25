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
import { AppointmentStatus } from '../../config/enum';
import { Delete } from '@mui/icons-material';
import { useSnackbar } from 'notistack';

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

const EditAppointment = ({ open, handleClose }) => {

    const classes = useStyles();

    const { enqueueSnackbar } = useSnackbar();
    
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

    const successHandler = (msg) => {
        enqueueSnackbar(msg, { variant: 'success' });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(Actions.editAppointment({
            ...appointment,
            startTime: new Date(appointment.startTime).toISOString(),
            endTime: new Date(appointment.endTime).toISOString()
        }, handleClose, successHandler));
    };

    const handleRemove = () => {
        dispatch(Actions.removeAppointment(appointment.id, handleClose, successHandler));
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
                                                    value={appointment.branchId}
                                                    onChange={e => dispatch(
                                                        Actions.getAppointment({
                                                            ...appointment,
                                                            branchId: e.target.value
                                                        })
                                                    )}
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
                                                    value={appointment.serviceId}
                                                    onChange={e => dispatch(
                                                        Actions.getAppointment({
                                                            ...appointment,
                                                            serviceId: e.target.value
                                                        })
                                                    )}
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
                                                    value={appointment.practitionerId}
                                                    onChange={e => dispatch(
                                                        Actions.getAppointment({
                                                            ...appointment,
                                                            practitionerId: e.target.value
                                                        })
                                                    )}
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
                                                    value={appointment.roomId}
                                                    onChange={e => dispatch(
                                                        Actions.getAppointment({
                                                            ...appointment,
                                                            roomId: e.target.value
                                                        })
                                                    )}
                                                >
                                                    {rooms.map(room => (
                                                        <MenuItem key={room._id} value={room._id}>{room.name}</MenuItem>
                                                    ))}
                                                    <FormHelperText>{error.roomId}</FormHelperText>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} md={6} px={2}>
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
                                                value={appointment.chargedAmount}
                                                onChange={e => dispatch(
                                                    Actions.getAppointment({
                                                        ...appointment,
                                                        chargedAmount: e.target.value
                                                    })
                                                )}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6} px={2}>
                                            <TextField
                                                margin="normal"
                                                required
                                                fullWidth
                                                id="paidAmount"
                                                label="Paid Amount"
                                                name="paidAmount"
                                                type='number'
                                                size='small'
                                                value={appointment.paidAmount}
                                                onChange={e => dispatch(
                                                    Actions.getAppointment({
                                                        ...appointment,
                                                        paidAmount: e.target.value
                                                    })
                                                )}
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
                                                onChange={v => dispatch(
                                                    Actions.getAppointment({
                                                        ...appointment,
                                                        startTime: v
                                                    })
                                                )}
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
                                                onChange={v => dispatch(
                                                    Actions.getAppointment({
                                                        ...appointment,
                                                        endTime: v
                                                    })
                                                )}
                                            />
                                        </Grid>
                                        <Grid item xs={12} p={2}>
                                            <FormControl required fullWidth size='small' error={error.patient}>
                                                <InputLabel>Patient</InputLabel>
                                                <Select
                                                    margin="normal"
                                                    required
                                                    name="patient"
                                                    label="Patient"
                                                    type="patient"
                                                    id="patient"
                                                    value={appointment.patientId}
                                                    onChange={e => dispatch(
                                                        Actions.getAppointment({
                                                            ...appointment,
                                                            patientId: e.target.value
                                                        })
                                                    )}
                                                >
                                                    {patients.map(patient => (
                                                        <MenuItem key={patient._id} value={patient._id}>{`${patient.firstName} ${patient.lastName}`}</MenuItem>
                                                    ))}
                                                    <FormHelperText>{error.patient}</FormHelperText>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} px={2}>
                                            <FormControl required fullWidth size='small'>
                                                <InputLabel>Status</InputLabel>
                                                <Select
                                                    margin="normal"
                                                    required
                                                    name="status"
                                                    label="status"
                                                    type="status"
                                                    id="status"
                                                    fullWidth
                                                    value={appointment.status}
                                                    onChange={e => dispatch(
                                                        Actions.getAppointment({
                                                            ...appointment,
                                                            status: e.target.value
                                                        })
                                                    )}
                                                >
                                                    <MenuItem key={AppointmentStatus.BOOKED} value={AppointmentStatus.BOOKED}>Booked</MenuItem>
                                                    <MenuItem key={AppointmentStatus.SHOWED_UP} value={AppointmentStatus.SHOWED_UP}>Showed Up</MenuItem>
                                                    <MenuItem key={AppointmentStatus.NO_SHOW} value={AppointmentStatus.NO_SHOW}>No Show</MenuItem>
                                                    <MenuItem key={AppointmentStatus.CANCELLED} value={AppointmentStatus.CANCELLED}>Cancelled</MenuItem>
                                                </Select>
                                                <FormHelperText>{error.status}</FormHelperText>
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
                                                <Button startIcon={<Delete />} color='error' onClick={handleRemove}>Remove</Button>
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

export default EditAppointment;