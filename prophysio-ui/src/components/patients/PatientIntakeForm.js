import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import { Autocomplete, Avatar, Box, Button, Card, CardContent, Chip, Divider, FormControl, Grid, InputLabel, MenuItem, Select, Stack, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TextField, Typography } from "@mui/material";
import QuizIcon from '@mui/icons-material/Quiz';
import TablePaginationActions from '../global/TablePaginationActions';
import * as Actions from '../../redux/actions';
import { BodyPart, Objective, Questionnaire, SpecialTest } from "../../config/enum";

const PatientIntakeForm = () => {

    const { patientId } = useParams();

    const dispatch = useDispatch();
    const [intakeFormData, setIntakeFormData] = useState([]);

    useEffect(() => {
        const data = BodyPart.map(bodyPart => ({ bodyPart }));
        setIntakeFormData(data);
    }, [BodyPart]);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - BodyPart.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const onSubmitIntakeForm = (event) => {
        event.preventDefault();
        dispatch(Actions.confirmQuestionnaire(patientId, intakeFormData));
    }

    return (
        <Box component={'form'} onSubmit={onSubmitIntakeForm}>
            <Stack spacing={2}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}><QuizIcon /></Avatar>
                    <Typography component="h1" variant="h5">Patient Questionnaire</Typography>
                </Box>
                <Divider />
                <Typography>Fill in the form below to answer the questionnaire. * Indicates a required field.</Typography>
                <Divider />
                <Card>
                    <CardContent>
                        <TableContainer>
                            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell width={'5%'}>No</TableCell>
                                        <TableCell width={'5%'}>Body Part</TableCell>
                                        <TableCell width={'30%'}>Questionnaire associated with intake form</TableCell>
                                        <TableCell width={'30%'}>Objective</TableCell>
                                        <TableCell width={'30%'}>Special Test</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {(rowsPerPage > 0
                                        ? BodyPart.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        : BodyPart
                                    ).map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell component="th" scope="row">
                                                {index + 1}
                                            </TableCell>
                                            <TableCell component="th" scope="row">
                                                {row}
                                            </TableCell>
                                            <TableCell component="th" scope="row" sx={{ verticalAlign: 'bottom' }}>
                                                <Autocomplete
                                                    multiple
                                                    filterSelectedOptions
                                                    options={Questionnaire}
                                                    renderInput={params => (
                                                        <TextField
                                                            {...params}
                                                            label="Questionnaire associated with intake form"
                                                            variant="standard"
                                                        />
                                                    )}
                                                    onChange={(event, questionnaire) => {
                                                        const data = [...intakeFormData];
                                                        data[index] = {
                                                            ...data[index],
                                                            questionnaire
                                                        }
                                                        setIntakeFormData(data);
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell component="th" scope="row" sx={{ verticalAlign: 'bottom' }}>
                                                <Autocomplete
                                                    multiple
                                                    filterSelectedOptions
                                                    options={Objective}
                                                    renderInput={params => (
                                                        <TextField
                                                            {...params}
                                                            label="Objective"
                                                            variant="standard"
                                                        />
                                                    )}
                                                    onChange={(event, objective) => {
                                                        const data = [...intakeFormData];
                                                        data[index] = {
                                                            ...data[index],
                                                            objective
                                                        }
                                                        setIntakeFormData(data);
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell component="th" scope="row" sx={{ verticalAlign: 'bottom' }}>
                                                <Autocomplete
                                                    multiple
                                                    filterSelectedOptions
                                                    options={SpecialTest}
                                                    renderInput={params => (
                                                        <TextField
                                                            {...params}
                                                            label="SpecialTest"
                                                            variant="standard"
                                                        />
                                                    )}
                                                    onChange={(event, specialTest) => {
                                                        const data = [...intakeFormData];
                                                        data[index] = {
                                                            ...data[index],
                                                            specialTest
                                                        }
                                                        setIntakeFormData(data);
                                                    }}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {emptyRows > 0 && (
                                        <TableRow style={{ height: 50 * emptyRows }}>
                                            <TableCell colSpan={5} />
                                        </TableRow>
                                    )}
                                </TableBody>
                                <TableFooter>
                                    <TableRow>
                                        <TablePagination
                                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                            colSpan={5}
                                            count={BodyPart.length}
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
                </Card>
                <Button
                    type="submit"
                    variant="outlined"
                    fullWidth
                >Submit Intake Form</Button>
            </Stack >
        </Box>
    )
}

export default PatientIntakeForm;