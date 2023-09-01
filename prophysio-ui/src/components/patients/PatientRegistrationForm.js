import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Box, Button, Chip, Divider, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { countries } from "countries-list";
import { EmploymentStatus, IdType } from "../../config/enum";
import RegistrationForm from '../../models/registration_form.model';
import * as Actions from '../../redux/actions';
import { enqueueSnackbar } from "notistack";
import StatusMsg from '../status/StatusMsg';

const countryCodes = Object.keys(countries);

const PatientRegistrationForm = () => {

    const { patientId } = useParams();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(Actions.getRegistrationForm(patientId));
    }, [dispatch]);

    const { registrationForm, isLoading } = useSelector(({ patients }) => (patients));
    const error = useSelector(({ error }) => (error));

    const onSubmitRegistrationForm = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const registrationForm = new RegistrationForm(data);
        dispatch(Actions.confirmRegistrationForm(
            patientId,
            registrationForm,
            enqueueSnackbar
        ));
    }

    return (
        <>
            {error.msg ? (
                <StatusMsg msg={error.msg} />
            ) : (
                <Box component={'form'} onSubmit={onSubmitRegistrationForm} noValidate>
                    <Stack spacing={2}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center'
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <HowToRegIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Patient Registration
                            </Typography>
                        </Box>
                        <Divider />
                        <Typography>Fill in the form below to register a new patient. * Indicates a required field.</Typography>
                        <Divider />
                        {!isLoading && (
                            <div className="registration-form-container">
                                <div className="demographics">
                                    <Grid container>
                                        <Grid item xs={12} md={6}>
                                            <Chip label="Demographics" variant="outlined" color="primary" />
                                        </Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={12} md={6} px={2}>
                                            <TextField
                                                variant="standard"
                                                margin="normal"
                                                required
                                                fullWidth
                                                name="title"
                                                label="Title"
                                                id="title"
                                                defaultValue={registrationForm.title}
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
                                                defaultValue={registrationForm.firstName}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6} px={2}>
                                            <TextField
                                                variant="standard"
                                                margin="normal"
                                                fullWidth
                                                name="middleName"
                                                label="Middle Name"
                                                id="middlename"
                                                defaultValue={registrationForm.middleName}
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
                                                defaultValue={registrationForm.lastName}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6} px={2}>
                                            <TextField
                                                variant="standard"
                                                margin="normal"
                                                required
                                                fullWidth
                                                name="dateOfBirth"
                                                label="Date of Birth"
                                                id="dateOfBirth"
                                                defaultValue={registrationForm.dateOfBirth}
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
                                                defaultValue={registrationForm.gender}
                                            />
                                        </Grid>
                                    </Grid>
                                </div>
                                <div className="contact-information">
                                    <Grid container>
                                        <Grid item xs={12} md={3}>
                                            <Chip label="Contact Information" variant="outlined" color="primary" />
                                        </Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={12} md={6} px={2}>
                                            <TextField
                                                variant="standard"
                                                margin="normal"
                                                required
                                                fullWidth
                                                name="mobilePhone"
                                                label="Mobile Phone"
                                                id="mobilePhone"
                                                defaultValue={registrationForm.mobilePhone}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6} px={2}>
                                            <TextField
                                                variant="standard"
                                                margin="normal"
                                                fullWidth
                                                name="email"
                                                label="Email Address"
                                                id="email"
                                                defaultValue={registrationForm.email}
                                            />
                                        </Grid>
                                    </Grid>
                                </div>
                                <div className="identification-document">
                                    <Grid container>
                                        <Grid item xs={12} md={4}>
                                            <Chip label="Identification Document" variant="outlined" color="primary" />
                                        </Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={12} md={6} p={2}>
                                            <FormControl variant="standard" fullWidth>
                                                <InputLabel id="idTypeLabel">ID Type</InputLabel>
                                                <Select
                                                    variant="standard"
                                                    labelId="idTypeLabel"
                                                    margin="normal"
                                                    fullWidth
                                                    name="idType"
                                                    label="ID Type"
                                                    id="idType"
                                                    defaultValue={registrationForm.idType}
                                                >
                                                    <MenuItem value={IdType.ID_CARD}>ID Card</MenuItem>
                                                    <MenuItem value={IdType.PASSPORT}>Passport</MenuItem>
                                                    <MenuItem value={IdType.DRIVER_LICENSE}>Driver License</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} md={6} px={2}>
                                            <TextField
                                                variant="standard"
                                                margin="normal"
                                                fullWidth
                                                name="idNumber"
                                                label="ID Number"
                                                id="idNumber"
                                                defaultValue={registrationForm.idNumber}
                                            />
                                        </Grid>
                                    </Grid>
                                </div>
                                <div className="home-address">
                                    <Grid container>
                                        <Grid item xs={12} md={3}>
                                            <Chip label="Home Address" variant="outlined" color="primary" />
                                        </Grid>
                                    </Grid>
                                    <Grid container xs={12} md={12}>
                                        <Grid item xs={12} md={12} px={2}>
                                            <TextField
                                                variant="standard"
                                                margin="normal"
                                                fullWidth
                                                name="homeAddress"
                                                label="Home Address Line 1"
                                                id="homeAddress"
                                                defaultValue={registrationForm.homeAddress}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={12} px={2}>
                                            <TextField
                                                variant="standard"
                                                margin="normal"
                                                fullWidth
                                                name="homeAddress2"
                                                label="Home Address Line 2"
                                                id="homeAddress2"
                                                defaultValue={registrationForm.homeAddress2}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={4} px={2}>
                                            <TextField
                                                variant="standard"
                                                margin="normal"
                                                fullWidth
                                                name="homeCity"
                                                label="Home City"
                                                id="homeCity"
                                                defaultValue={registrationForm.homeCity}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={4} px={2}>
                                            <TextField
                                                variant="standard"
                                                margin="normal"
                                                fullWidth
                                                name="homeState"
                                                label="Home Parish / State / Province"
                                                id="homeState"
                                                defaultValue={registrationForm.homeState}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={4} px={2}>
                                            <TextField
                                                variant="standard"
                                                margin="normal"
                                                fullWidth
                                                name="homePostalCode"
                                                label="Home Postal Code"
                                                id="homePostalCode"
                                                defaultValue={registrationForm.homePostalCode}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={4} p={2}>
                                            <FormControl variant="standard" fullWidth>
                                                <InputLabel id="homeCountryLabel">Home Country</InputLabel>
                                                <Select
                                                    labelId="homeCountryLabel"
                                                    variant="standard"
                                                    margin="normal"
                                                    fullWidth
                                                    name="homeCountry"
                                                    label="Home Country"
                                                    id="homeCountry"
                                                    defaultValue={registrationForm.homeCountry}
                                                >
                                                    {countryCodes.map(code => (
                                                        <MenuItem value={code}>{countries[code].name}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} md={4} px={2}>
                                            <TextField
                                                variant="standard"
                                                margin="normal"
                                                fullWidth
                                                name="homePhone"
                                                label="Home Phone"
                                                id="homePhone"
                                                defaultValue={registrationForm.homePhone}
                                            />
                                        </Grid>
                                    </Grid>
                                </div>
                                <div className="next-of-kin">
                                    <Grid container>
                                        <Grid item xs={12} md={3}>
                                            <Chip label="Next of Kin" variant="outlined" color="primary" />
                                        </Grid>
                                    </Grid>
                                    <Grid container xs={12} md={12}>
                                        <Grid item xs={12} md={4} px={2}>
                                            <TextField
                                                variant="standard"
                                                margin="normal"
                                                fullWidth
                                                name="nokFirstName"
                                                label="Next of Kin First Name"
                                                id="nokFirstName"
                                                defaultValue={registrationForm.nokFirstName}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={4} px={2}>
                                            <TextField
                                                variant="standard"
                                                margin="normal"
                                                fullWidth
                                                name="nokLastName"
                                                label="Next of Kin Last Name"
                                                id="nokLastName"
                                                defaultValue={registrationForm.nokLastName}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={4} px={2}>
                                            <TextField
                                                variant="standard"
                                                margin="normal"
                                                fullWidth
                                                name="nokPhoneNumber"
                                                label="Next of Kin Phone Number"
                                                id="nokPhoneNumber"
                                                defaultValue={registrationForm.nokPhoneNumber}
                                            />
                                        </Grid>
                                    </Grid>
                                </div>
                                <div className="employment-information">
                                    <Grid container>
                                        <Grid item xs={12} md={4}>
                                            <Chip label="Employment Information" variant="outlined" color="primary" />
                                        </Grid>
                                    </Grid>
                                    <Grid container xs={12} md={12}>
                                        <Grid item xs={12} md={4} p={2}>
                                            <FormControl variant="standard" fullWidth>
                                                <InputLabel id="employmentStatusLabel">Employment Status</InputLabel>
                                                <Select
                                                    labelId="employmentStatusLabel"
                                                    id="employmentStatus"
                                                    label="Employment Status"
                                                    defaultValue={registrationForm.employmentStatus}
                                                >
                                                    <MenuItem value={EmploymentStatus.UNKNOWN}>Unknown</MenuItem>
                                                    <MenuItem value={EmploymentStatus.EMPLOYED}>Employed</MenuItem>
                                                    <MenuItem value={EmploymentStatus.SELF_EMPLOYED}>Self-Employed</MenuItem>
                                                    <MenuItem value={EmploymentStatus.UNEMPLOYED}>Unemployed</MenuItem>
                                                    <MenuItem value={EmploymentStatus.RETIRED}>Retired</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} md={4} px={2}>
                                            <TextField
                                                variant="standard"
                                                margin="normal"
                                                fullWidth
                                                name="jobTitle"
                                                label="Job Title"
                                                id="jobTitle"
                                                defaultValue={registrationForm.jobTitle}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={4} px={2}>
                                            <TextField
                                                variant="standard"
                                                margin="normal"
                                                fullWidth
                                                name="employer"
                                                label="Employer"
                                                id="employer"
                                                defaultValue={registrationForm.employer}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={12} px={2}>
                                            <TextField
                                                variant="standard"
                                                margin="normal"
                                                fullWidth
                                                name="workAddress"
                                                label="Work Address Line 1"
                                                id="workAddress"
                                                defaultValue={registrationForm.workAddress}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={12} px={2}>
                                            <TextField
                                                variant="standard"
                                                margin="normal"
                                                fullWidth
                                                name="workAddress2"
                                                label="Work Address Line 2"
                                                id="workAddress2"
                                                defaultValue={registrationForm.workAddress2}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={4} px={2}>
                                            <TextField
                                                variant="standard"
                                                margin="normal"
                                                fullWidth
                                                name="workCity"
                                                label="Work City"
                                                id="workCity"
                                                defaultValue={registrationForm.workCity}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={4} px={2}>
                                            <TextField
                                                variant="standard"
                                                margin="normal"
                                                fullWidth
                                                name="workState"
                                                label="Work Parish / State / Province"
                                                id="workState"
                                                defaultValue={registrationForm.workState}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={4} px={2}>
                                            <TextField
                                                variant="standard"
                                                margin="normal"
                                                fullWidth
                                                name="workPostalCode"
                                                label="Work Postal Code"
                                                id="workPostalCode"
                                                defaultValue={registrationForm.workPostalCode}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={4} p={2}>
                                            <FormControl variant="standard" fullWidth>
                                                <InputLabel id="workCountryLabel">Practice Country</InputLabel>
                                                <Select
                                                    labelId="workCountryLabel" variant="standard"
                                                    margin="normal"
                                                    fullWidth
                                                    name="workCountry"
                                                    label="Work Country"
                                                    id="workCountry"
                                                    defaultValue={registrationForm.workCountry}
                                                >
                                                    {countryCodes.map(code => (
                                                        <MenuItem value={code}>{countries[code].name}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} md={4} px={2}>
                                            <TextField
                                                variant="standard"
                                                margin="normal"
                                                fullWidth
                                                name="workPhone"
                                                label="Work Phone"
                                                id="workPhone"
                                                defaultValue={registrationForm.workPhone}
                                            />
                                        </Grid>
                                    </Grid>
                                </div>
                                <div className="medical-doctor-information">
                                    <Grid container>
                                        <Grid item xs={12} md={4}>
                                            <Chip label="Medical Doctor Information" variant="outlined" color="primary" />
                                        </Grid>
                                    </Grid>
                                    <Grid container xs={12} md={12}>
                                        <Grid item xs={12} md={4} px={2}>
                                            <TextField
                                                variant="standard"
                                                margin="normal"
                                                fullWidth
                                                name="doctorFirstName"
                                                label="Doctor First Name"
                                                id="doctorFirstName"
                                                defaultValue={registrationForm.doctorFirstName}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={4} px={2}>
                                            <TextField
                                                variant="standard"
                                                margin="normal"
                                                fullWidth
                                                name="doctorLastName"
                                                label="Doctor Last Name"
                                                id="doctorLastName"
                                                defaultValue={registrationForm.doctorLastName}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={4} px={2}>
                                            <TextField
                                                variant="standard"
                                                margin="normal"
                                                fullWidth
                                                name="practiceName"
                                                label="Practice Name"
                                                id="practiceName"
                                                defaultValue={registrationForm.practiceName}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={12} px={2}>
                                            <TextField
                                                variant="standard"
                                                margin="normal"
                                                fullWidth
                                                name="practiceAddress"
                                                label="Practice Address Line 1"
                                                id="practiceAddress"
                                                defaultValue={registrationForm.practiceAddress}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={12} px={2}>
                                            <TextField
                                                variant="standard"
                                                margin="normal"
                                                fullWidth
                                                name="practiceAddress2"
                                                label="Practice Address Line 2"
                                                id="practiceAddress2"
                                                defaultValue={registrationForm.practiceAddress2}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={4} px={2}>
                                            <TextField
                                                variant="standard"
                                                margin="normal"
                                                fullWidth
                                                name="practiceCity"
                                                label="Practice City"
                                                id="practiceCity"
                                                defaultValue={registrationForm.practiceCity}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={4} px={2}>
                                            <TextField
                                                variant="standard"
                                                margin="normal"
                                                fullWidth
                                                name="practiceState"
                                                label="Practice Parish / State / Province"
                                                id="practiceState"
                                                defaultValue={registrationForm.practiceState}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={4} px={2}>
                                            <TextField
                                                variant="standard"
                                                margin="normal"
                                                fullWidth
                                                name="practicePostalCode"
                                                label="Practice Postal Code"
                                                id="practicePostalCode"
                                                defaultValue={registrationForm.practicePostalCode}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={4} p={2}>
                                            <FormControl variant="standard" fullWidth>
                                                <InputLabel id="practiceCountryLabel">Practice Country</InputLabel>
                                                <Select
                                                    labelId="practiceCountryLabel" variant="standard"
                                                    margin="normal"
                                                    fullWidth
                                                    name="practiceCountry"
                                                    label="Practice Country"
                                                    id="practiceCountry"
                                                    defaultValue={registrationForm.practiceCountry}
                                                >
                                                    {countryCodes.map(code => (
                                                        <MenuItem value={code}>{countries[code].name}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} md={4} px={2}>
                                            <TextField
                                                variant="standard"
                                                margin="normal"
                                                fullWidth
                                                name="practicePhone"
                                                label="Practice Phone"
                                                id="practicePhone"
                                                defaultValue={registrationForm.practicePhone}
                                            />
                                        </Grid>
                                    </Grid>
                                </div>
                            </div>
                        )}
                    </Stack >
                    <Box p={2}>
                        <Button
                            type="submit"
                            variant="outlined"
                            m={2}
                            fullWidth
                        >Submit Registration Form</Button>
                    </Box>
                </Box>
            )}
        </>
    )
}

export default PatientRegistrationForm;