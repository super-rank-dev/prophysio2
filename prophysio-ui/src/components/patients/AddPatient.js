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
import CancelIcon from '@mui/icons-material/Cancel';
import * as Actions from '../../redux/actions';
import Patient from '../../models/patient.model';

const AddPatient = ({ handleClose }) => {

    const dispatch = useDispatch();

    const error = useSelector(({ error }) => error);

    const onAddPatient = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const patient = new Patient({
            firstName: data.get('firstName'),
            lastName: data.get('lastName'),
            email: data.get('email'),
            dateOfBirth: data.get('dateOfBirth'),
            gender: data.get('gender'),
            phoneNumber: data.get('phoneNumber'),
            address: data.get('address'),
            emergencyContact: data.get('emergencyContact')
        });
        dispatch(Actions.addPatient(patient, handleClose));
    }

    return (
        <Stack spacing={2}>
            <Typography variant="h6">New Patient Registration Request</Typography>
            <Divider />
            <Typography>Fill in the form below to create a new Patient Registration Request. * Indicates a required field.</Typography>
            <Card
                component={'form'}
                onSubmit={onAddPatient}
                noValidate
            >
                <CardMedia
                    component="img"
                    alt="healthcare image"
                    height="140"
                    image="https://source.unsplash.com/random?healthcare"
                />
                <CardContent>
                    <Grid container>
                        <Grid item xs={12} md={6} px={2}>
                            <TextField
                                variant="standard"
                                margin="normal"
                                required
                                fullWidth
                                name="email"
                                label="Email Address"
                                id="email"
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
                                name="firstName"
                                label="First Name"
                                id="firstName"
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
                                name="dateOfBirth"
                                label="Date Of Birth"
                                id="dateOfBirth"
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
                                error={error.emergencyContact}
                                helperText={error.emergencyContact}
                            />
                        </Grid>
                    </Grid>
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
                        <Button
                            variant="outlined"
                            size="small"
                            color="secondary"
                            startIcon={<CancelIcon />}
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
                    </ButtonGroup>
                </CardActions>
            </Card>
        </Stack>
    );
}

export default AddPatient;