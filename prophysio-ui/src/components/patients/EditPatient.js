import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Stack } from '@mui/material';
import PersonalInfoCard from './cards/PersonalInfoCard';
import RegistrationFormCard from './cards/RegistrationFormCard';
import IntakeFormCard from './cards/IntakeFormCard';

const EditPatient = ({ handleClose, patient }) => {

    const navigate = useNavigate();

    return (
        <Stack spacing={2}>
            <Grid container>
                <Grid item xs={12} md={4} p={2}>
                    <PersonalInfoCard onClickCard={() =>
                        navigate(`/patient-profile/${patient._id}`)} />
                </Grid>
                <Grid item xs={12} md={4} p={2}>
                    <RegistrationFormCard onClickCard={() =>
                        navigate(`/patient-registration/${patient._id}`)} />
                </Grid>
                <Grid item xs={12} md={4} p={2}>
                    <IntakeFormCard onClickCard={() =>
                        navigate(`/patient-intake/${patient._id}`)} />
                </Grid>
            </Grid>
        </Stack>
    );
}

export default EditPatient;