import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import AddPatientModal from './AddPatientModal';
import { Button, ButtonGroup, Card, CardActions, CardContent, Divider, IconButton, Stack, Typography } from '@mui/material';
import * as Actions from '../../redux/actions';

const Patients = () => {

    const dispatch = useDispatch();
    const [openAddPatient, setOpenAddPatient] = useState(false);

    useEffect(() => {
        dispatch(Actions.getAllPatients());
    }, [dispatch]);

    const { patients } = useSelector(({ patients }) => (patients));

    const handleAddPatientOpen = () => {
        dispatch(Actions.clearErrors());
        setOpenAddPatient(true);
    };
    const handleAddPatientClose = () => setOpenAddPatient(false);

    return (
        <Stack spacing={2}>
            <Typography variant='h6'>Patients</Typography>
            <Divider />
            <Card
                component={'form'}
                noValidate
            >
                <CardContent>
                    <List sx={{ bgcolor: 'background.paper' }}>
                        {patients.map((patient) => {
                            return (
                                <ListItem
                                    key={patient._id}
                                    disablePadding
                                    secondaryAction={
                                        <IconButton
                                            edge="end"
                                            aria-label="delete"
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
                </CardContent>
                <CardActions style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <ButtonGroup>
                        <Button
                            variant='outlined'
                            startIcon={<AddCircleIcon />}
                            onClick={handleAddPatientOpen}
                        >Add</Button>
                    </ButtonGroup>
                </CardActions>
            </Card>
            <AddPatientModal
                open={openAddPatient}
                handleClose={handleAddPatientClose}
            />
        </Stack>
    );
}

export default Patients;