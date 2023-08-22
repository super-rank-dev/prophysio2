import React from 'react';
import { Grid, Stack } from '@mui/material';
import AppointmentsCard from './sections/AppointmentsCard';
import UpcomingBirthdaysCard from './sections/UpcomingBirthdaysCard';
import MissingNotesCard from './sections/MissingNotesCard';
import ARStatusCard from './sections/ARStatusCard';
import AbsenteeSummaryCard from './sections/AbsenteeSummaryCard';
import PractitionerTargetsCard from './sections/PractitionerTargetsCard';
import AllocationsCard from './sections/AllocationsCard';

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