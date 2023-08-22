import { useDispatch, useSelector } from "react-redux";
import {
    Button,
    ButtonGroup,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Divider,
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
            email: data.get('email')
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
                sx={{ maxWidth: 345 }}
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