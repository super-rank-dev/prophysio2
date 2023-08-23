import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Chip, Divider, Stack, TableHead, Typography } from '@mui/material';
import TablePaginationActions from '../global/TablePaginationActions';
import { RegistrationFormStatus } from '../../config/enum';

const createData = (firstName, lastName, status, time) => {
    return { firstName, lastName, status, time };
}

const rows = [
    createData('Anthony', 'Bartolotte', RegistrationFormStatus.PENDING, new Date()),
    createData('Anthony', 'Bartolotte', RegistrationFormStatus.PENDING, new Date()),
    createData('Anthony', 'Bartolotte', RegistrationFormStatus.PENDING, new Date()),
    createData('Anthony', 'Bartolotte', RegistrationFormStatus.PENDING, new Date()),
    createData('Anthony', 'Bartolotte', RegistrationFormStatus.PENDING, new Date()),
    createData('Anthony', 'Bartolotte', RegistrationFormStatus.PENDING, new Date()),
    createData('Anthony', 'Bartolotte', RegistrationFormStatus.PENDING, new Date()),
    createData('Anthony', 'Bartolotte', RegistrationFormStatus.PENDING, new Date()),
].sort((a, b) => (a.calories < b.calories ? -1 : 1));

const AddPatientRequests = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div>
            <Stack spacing={2}>
                <Typography variant="h6">Patient Registration Requests</Typography>
                <Divider />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                        <TableHead>
                            <TableRow>
                                <TableCell>No</TableCell>
                                <TableCell>First Name</TableCell>
                                <TableCell>Last Name</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Status Time</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(rowsPerPage > 0
                                ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : rows
                            ).map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell component="th" scope="row">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {row.firstName}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {row.lastName}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {row.status === RegistrationFormStatus.PENDING ? (
                                            <Chip label="Pending" color="primary" variant="outlined" size='small' />
                                        ) : (
                                            <Chip label="Accepted" color="success" variant="outlined" size='small' />
                                        )}
                                    </TableCell>
                                    <TableCell component="th" scope="row">
                                        {row.time.toString()}
                                    </TableCell>
                                </TableRow>
                            ))}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                    colSpan={5}
                                    count={rows.length}
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
            </Stack>
        </div>
    );
}

export default AddPatientRequests;