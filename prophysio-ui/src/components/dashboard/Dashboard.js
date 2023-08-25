import React from 'react';
import { Grid, Stack } from '@mui/material';
import AppointmentsCard from './cards/AppointmentsCard';
import UpcomingBirthdaysCard from './cards/UpcomingBirthdaysCard';
import MissingNotesCard from './cards/MissingNotesCard';
import ARStatusCard from './cards/ARStatusCard';
import AbsenteeSummaryCard from './cards/AbsenteeSummaryCard';
import PractitionerTargetsCard from './cards/PractitionerTargetsCard';
import AllocationsCard from './cards/AllocationsCard';

const Dashboard = () => {
    return (
        <Stack spacing={2}>
            <Grid container>
                <Grid item xs={12} md={4} p={2}>
                    <AppointmentsCard />
                </Grid>
                <Grid item xs={12} md={4} p={2}>
                    <UpcomingBirthdaysCard />
                </Grid>
                <Grid item xs={12} md={4} p={2}>
                    <MissingNotesCard />
                </Grid>
                <Grid item xs={12} md={4} p={2}>
                    <ARStatusCard />
                </Grid>
                <Grid item xs={12} md={4} p={2}>
                    <AbsenteeSummaryCard />
                </Grid>
                <Grid item xs={12} md={4} p={2}>
                    <PractitionerTargetsCard />
                </Grid>
                <Grid item xs={12} md={4} p={2}>
                    <AllocationsCard />
                </Grid>
            </Grid>
        </Stack>
    );
}

export default Dashboard;