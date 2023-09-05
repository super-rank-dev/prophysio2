import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Grid, Stack } from '@mui/material';
import AppointmentsCard from './cards/AppointmentsCard';
import UpcomingBirthdaysCard from './cards/UpcomingBirthdaysCard';
import MissingNotesCard from './cards/MissingNotesCard';
import ARStatusCard from './cards/ARStatusCard';
import AbsenteeSummaryCard from './cards/AbsenteeSummaryCard';
import PractitionerTargetsCard from './cards/PractitionerTargetsCard';
import AllocationsCard from './cards/AllocationsCard';
import * as Actions from '../../redux/actions';

const Dashboard = () => {

    const dispatch = useDispatch();
    const [imageLoaded, setImageLoaded] = useState({
        appointment: false,
        upcomingBirthdays: false,
        missingNotes: false,
        arStatus: false,
        absenteeSummary: false,
        practitionerTargets: false,
        allocations: false
    });

    // dispatch(Actions.setPageLoading());

    useEffect(() => {
        if (Object.values(imageLoaded).every(v => v === true)) {
            dispatch(Actions.setPageLoaded());
        }
    }, [imageLoaded]);

    return (
        <Stack spacing={2}>
            <Grid container>
                <Grid item xs={12} md={4} p={2}>
                    <AppointmentsCard
                        imageLoaded={imageLoaded}
                        setImageLoaded={setImageLoaded}
                    />
                </Grid>
                <Grid item xs={12} md={4} p={2}>
                    <UpcomingBirthdaysCard
                        imageLoaded={imageLoaded}
                        setImageLoaded={setImageLoaded}
                    />
                </Grid>
                <Grid item xs={12} md={4} p={2}>
                    <MissingNotesCard
                        imageLoaded={imageLoaded}
                        setImageLoaded={setImageLoaded}
                    />
                </Grid>
                <Grid item xs={12} md={4} p={2}>
                    <ARStatusCard
                        imageLoaded={imageLoaded}
                        setImageLoaded={setImageLoaded}
                    />
                </Grid>
                <Grid item xs={12} md={4} p={2}>
                    <AbsenteeSummaryCard
                        imageLoaded={imageLoaded}
                        setImageLoaded={setImageLoaded}
                    />
                </Grid>
                <Grid item xs={12} md={4} p={2}>
                    <PractitionerTargetsCard
                        imageLoaded={imageLoaded}
                        setImageLoaded={setImageLoaded}
                    />
                </Grid>
                <Grid item xs={12} md={4} p={2}>
                    <AllocationsCard
                        imageLoaded={imageLoaded}
                        setImageLoaded={setImageLoaded}
                    />
                </Grid>
            </Grid>
        </Stack>
    );
}

export default Dashboard;