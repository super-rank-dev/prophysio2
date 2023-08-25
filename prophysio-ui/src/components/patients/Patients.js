import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, ButtonGroup, Card, CardActions, CardContent, Chip, Divider, IconButton, Stack, TableHead, Typography } from '@mui/material';
import TablePaginationActions from '../global/TablePaginationActions';
import { IntakeFormStatus, RegistrationFormStatus } from '../../config/enum';
import * as Actions from '../../redux/actions';
import AddPatientModal from './AddPatientModal';
import EditPatientModal from './EditPatientModal';

const Patients = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [currentPatient, setCurrentPatient] = useState();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(Actions.getAllPatients());
    }, [dispatch]);

    const { patients } = useSelector(({ patients }) => (patients));

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - patients.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const [openAddPatient, setOpenAddPatient] = useState(false);
    const [openEditPatient, setOpenEditPatient] = useState(false);

    const handleAddPatientOpen = () => {
        dispatch(Actions.clearErrors());
        setOpenAddPatient(true);
    };
    const handleAddPatientClose = () => setOpenAddPatient(false);

    const handleEditPatientOpen = (patient) => {
        setCurrentPatient(patient);
        setOpenEditPatient(true);
    };
    const handleEditPatientClose = () => setOpenEditPatient(false);

    const sendRegistrationForm = (patientId) => {
        dispatch(Actions.sendRegistrationForm(patientId));
    }

    const sendIntakeForm = (patientId) => {
        dispatch(Actions.sendIntakeForm(patientId));
        dispatch(Actions.confirmIntakeForm(patientId, { status: IntakeFormStatus.PENDING }));
    }

    const removePatient = (patientId) => {

    }

    return (
        <Stack spacing={2}>
            <Typography variant="h6">Patients</Typography>
            <Divider />
            <Card
                component={'form'}
                noValidate
            >
                <CardContent>
                    <TableContainer>
                        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>No</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Date of Birth</TableCell>
                                    <TableCell>Gender</TableCell>
                                    <TableCell>Phone Number</TableCell>
                                    <TableCell>Address</TableCell>
                                    <TableCell>Emergency Contact</TableCell>
                                    <TableCell>Registration</TableCell>
                                    <TableCell>Questionnaire</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(rowsPerPage > 0
                                    ? patients.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    : patients
                                ).map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell component="th" scope="row">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.firstName} {row.lastName}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.email}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.dateOfBirth}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.gender}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.phoneNumber}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.address}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.emergencyContact}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            <Stack spacing={1}>
                                                {row.registrationForm.status === RegistrationFormStatus.PENDING && (
                                                    <Chip label="Pending" color="primary" variant="outlined" size='small' />)}
                                                {row.registrationForm.status === RegistrationFormStatus.ACCEPTED && (
                                                    <Chip label="Confirmed" color="success" variant="outlined" size='small' />)}
                                                <Chip label="Send" size='small' color='primary' onClick={() => sendRegistrationForm(row._id)} />
                                            </Stack>
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            <Stack spacing={1}>
                                                {row.intakeForm.status === IntakeFormStatus.UNKNOWN && (
                                                    <Chip label="Unknown" color="secondary" variant="outlined" size='small' />)}
                                                {row.intakeForm.status === IntakeFormStatus.PENDING && (
                                                    <Chip label="Pending" color="primary" variant="outlined" size='small' />)}
                                                {row.intakeForm.status === IntakeFormStatus.ACCEPTED && (
                                                    <Chip label="Confirmed" color="success" variant="outlined" size='small' />)}
                                                <Chip label="Send" size='small' color='primary' onClick={() => sendIntakeForm(row._id)} />
                                            </Stack>
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            <Stack sx={{ display: 'block' }}>
                                                <IconButton onClick={() => handleEditPatientOpen(row)}><EditIcon /></IconButton>
                                                <IconButton onClick={() => removePatient(row._id)}><DeleteIcon /></IconButton>
                                            </Stack>
                                        </TableCell>
                                    </TableRow>
                                ))}
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 50 * emptyRows }}>
                                        <TableCell colSpan={11} />
                                    </TableRow>
                                )}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                        colSpan={11}
                                        count={patients.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        SelectProps={{
                                            inputProps: {
                                                'aria-label': 'rows per page',
                                            },
                                            native: true,
                                        }}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                        ActionsComponent={TablePaginationActions}
                                    />
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </TableContainer>
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
            <EditPatientModal
                open={openEditPatient}
                handleClose={handleEditPatientClose}
                patient={currentPatient}
            />
        </Stack>
    );
}

export default Patients;