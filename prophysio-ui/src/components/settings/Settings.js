import React from 'react';
import { Grid, Stack } from '@mui/material';
import BranchesCard from './cards/BranchesCard';
import DevicesCard from './cards/DevicesCard';
import HowHeardsCard from './cards/HowHeardsCard';
import IDTypesCard from './cards/IDTypesCard';
import PractitionerTargetsCard from './cards/PractitionerTargetsCard';
import RoomsCard from './cards/RoomsCard';
import ServicesCard from './cards/ServicesCard';

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