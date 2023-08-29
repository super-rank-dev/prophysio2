import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Autocomplete,
    Avatar,
    Button,
    ButtonGroup,
    Card,
    CardActions,
    CardContent,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemText,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import * as Actions from '../../redux/actions';
import { enqueueSnackbar } from "notistack";

const WaitingList = ({ handleClose }) => {

    const [waitingList, setWaitingList] = useState([]);
    const [current, setCurrent] = useState();

    const dispatch = useDispatch();
    const { patients, waitingPatients } = useSelector(({ patients }) => (patients));

    const addWaitingPatient = () => {
        if (current) {
            if (!waitingList.find(patient =>
                patient._id === current._id)) {
                setWaitingList([...waitingList, current]);
            }
        }
    }
    const removeWaitingPatient = (patientId) => {
        setWaitingList(
            waitingList.filter(patient =>
                patient._id !== patientId)
        );
    }
    const saveWaitingPatients = () => {
        dispatch(Actions.saveWaitingPatients(waitingList, handleClose, enqueueSnackbar));
    }

    useEffect(() => {
        dispatch(Actions.getAllPatients());
        dispatch(Actions.getWaitingPatients());
    }, [dispatch]);

    useEffect(() => {
        setWaitingList(waitingPatients);
    }, [waitingPatients]);

    return (
        <Stack spacing={2}>
            <Typography variant='h6'>Waiting List</Typography>
            <Divider />
            <Card
                component={'form'}
                noValidate
            >
                <CardContent>
                    <List sx={{ bgcolor: 'background.paper' }}>
                        {waitingList
                            .map((patient) => {
                                return (
                                    <ListItem
                                        key={patient._id}
                                        disablePadding
                                        secondaryAction={
                                            <IconButton
                                                edge="end"
                                                aria-label="delete"
                                                onClick={() => removeWaitingPatient(patient._id)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        }
                                    >
                                        <ListItemButton>
                                            <ListItemAvatar>
                                                <Avatar
                                                    alt={patient.firstName}
                                                    src={`/static/images/avatar/${patient._id}.jpg`}
                                                />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={`${patient.firstName} ${patient.lastName}`}
                                                secondary={
                                                    <Typography
                                                        sx={{ display: 'inline' }}
                                                        component="span"
                                                        variant="body2"
                                                        color="text.primary"
                                                    >{patient.email}</Typography>
                                                }
                                            />
                                        </ListItemButton>
                                    </ListItem>
                                );
                            })}
                    </List>
                    <Autocomplete
                        options={patients}
                        getOptionLabel={option => `${option.firstName} ${option.lastName}`}
                        renderInput={params => (
                            <TextField
                                {...params}
                                label="Patient"
                                variant="standard"
                            />
                        )}
                        onChange={(event, patient) => {
                            setCurrent(patient);
                        }}
                    />
                </CardContent>
                <CardActions style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <ButtonGroup>
                        <Button
                            variant='outlined'
                            color='success'
                            startIcon={<AddCircleIcon />}
                            onClick={addWaitingPatient}
                        >Add</Button>
                        <Button
                            variant='outlined'
                            startIcon={<SaveIcon />}
                            onClick={saveWaitingPatients}
                        >Save</Button>
                        <Button
                            variant='outlined'
                            color='secondary'
                            startIcon={<CancelIcon />}
                            onClick={handleClose}
                        >Cancel</Button>
                    </ButtonGroup>
                </CardActions>
            </Card>
        </Stack>
    );
}

export default WaitingList;