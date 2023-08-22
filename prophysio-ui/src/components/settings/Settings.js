import React from 'react';
import { Grid, Stack } from '@mui/material';
import BranchesCard from './sections/BranchesCard';
import DevicesCard from './sections/DevicesCard';
import HowHeardsCard from './sections/HowHeardsCard';
import IDTypesCard from './sections/IDTypesCard';
import PractitionerTargetsCard from './sections/PractitionerTargetsCard';
import RoomsCard from './sections/RoomsCard';
import ServicesCard from './sections/ServicesCard';

const Dashboard = () => {
    return (
        <Stack spacing={2}>
            <Grid container>
                <Grid item xs={12} md={4} p={2}>
                    <BranchesCard />
                </Grid>
                <Grid item xs={12} md={4} p={2}>
                    <DevicesCard />
                </Grid>
                <Grid item xs={12} md={4} p={2}>
                    <HowHeardsCard />
                </Grid>
                <Grid item xs={12} md={4} p={2}>
                    <IDTypesCard />
                </Grid>
                <Grid item xs={12} md={4} p={2}>
                    <PractitionerTargetsCard />
                </Grid>
                <Grid item xs={12} md={4} p={2}>
                    <RoomsCard />
                </Grid>
                <Grid item xs={12} md={4} p={2}>
                    <ServicesCard />
                </Grid>
            </Grid>
        </Stack>
    );
}

export default Dashboard;