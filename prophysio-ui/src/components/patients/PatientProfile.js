import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    Button,
    ButtonGroup,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Divider,
    Grid,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import SaveIcon from '@mui/icons-material/Save';
import { enqueueSnackbar } from "notistack";
import * as Actions from '../../redux/actions';
import Patient from '../../models/patient.model';

const PatientProfile = () => {

    const { patientId } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(Actions.getPatient(patientId));
    }, [dispatch]);

    const { patient, isLoading } = useSelector(({ patients }) => (patients));
    const error = useSelector(({ error }) => error);

    const onSavePatient = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const patient = new Patient({
            _id: patientId,
            firstName: data.get('firstName'),
            lastName: data.get('lastName'),
            email: data.get('email'),
            dateOfBirth: data.get('dateOfBirth'),
            gender: data.get('gender'),
            phoneNumber: data.get('phoneNumber'),
            address: data.get('address'),
            emergencyContact: data.get('emergencyContact')
        });
        dispatch(Actions.updatePatient(patient, enqueueSnackbar));
    }

    return (
        <Stack spacing={2}>
            <Typography variant="h6">Patient Profile</Typography>
            <Divider />
            <Typography>Fill in the form below to update a patient profile. * Indicates a required field.</Typography>
            <Card
                component={'form'}
                onSubmit={onSavePatient}
                sx={{ maxWidth: '540px' }}
                noValidate
            >
                <CardMedia
                    component="img"
                    alt="healthcare image"
                    height="140"
                    image="https://source.unsplash.com/random?healthcare"
                />
                <CardContent>
                    {!isLoading && (
                        <Grid container>
                            <Grid item xs={12} md={6} px={2}>
                                <TextField
                                    variant="standard"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="firstName"
                                    label="First Name"
                                    id="firstName"
                                    defaultValue={patient.firstName}
                                    error={error.firstName}
                                    helperText={error.firstName}
                                />
                            </Grid>
                            <Grid item xs={12} md={6} px={2}>
                                <TextField
                                    variant="standard"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="lastName"
                                    label="Last Name"
                                    id="lastName"
                                    defaultValue={patient.lastName}
                                    error={error.lastName}
                                    helperText={error.lastName}
                                />
                            </Grid>
                            <Grid item xs={12} md={6} px={2}>
                                <TextField
                                    variant="standard"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="email"
                                    label="Email Address"
                                    id="email"
                                    defaultValue={patient.email}
                                    error={error.email}
                                    helperText={error.email}
                                />
                            </Grid>
                            <Grid item xs={12} md={6} px={2}>
                                <TextField
                                    variant="standard"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="dateOfBirth"
                                    label="Date Of Birth"
                                    id="dateOfBirth"
                                    defaultValue={patient.dateOfBirth}
                                    error={error.dateOfBirth}
                                    helperText={error.dateOfBirth}
                                />
                            </Grid>
                            <Grid item xs={12} md={6} px={2}>
                                <TextField
                                    variant="standard"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="gender"
                                    label="Gender"
                                    id="gender"
                                    defaultValue={patient.gender}
                                    error={error.gender}
                                    helperText={error.gender}
                                />
                            </Grid>
                            <Grid item xs={12} md={6} px={2}>
                                <TextField
                                    variant="standard"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="phoneNumber"
                                    label="Phone Number"
                                    id="phoneNumber"
                                    defaultValue={patient.phoneNumber}
                                    error={error.phoneNumber}
                                    helperText={error.phoneNumber}
                                />
                            </Grid>
                            <Grid item xs={12} md={6} px={2}>
                                <TextField
                                    variant="standard"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="address"
                                    label="Address"
                                    id="address"
                                    defaultValue={patient.address}
                                    error={error.address}
                                    helperText={error.address}
                                />
                            </Grid>
                            <Grid item xs={12} md={6} px={2}>
                                <TextField
                                    variant="standard"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="emergencyContact"
                                    label="Emergency Contact"
                                    id="emergencyContact"
                                    defaultValue={patient.emergencyContact}
                                    error={error.emergencyContact}
                                    helperText={error.emergencyContact}
                                />
                            </Grid>
                        </Grid>
                    )}
                </CardContent>
                <CardActions style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <ButtonGroup>
                        <Button
                            variant="outlined"
                            size="small"
                            startIcon={<SaveIcon />}
                            type="submit"
                        >
                            Save
                        </Button>
                    </ButtonGroup>
                </CardActions>
            </Card>
        </Stack>
    );
}

export default PatientProfile;