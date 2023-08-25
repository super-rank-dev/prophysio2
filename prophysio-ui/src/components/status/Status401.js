import React from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';

const Status401 = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                minHeight: '80vh',
            }}
        >
            <Typography variant="h1">
                401
            </Typography>
            <Typography variant="h6">
                Please log in to visit the website.
            </Typography>
            <Button variant="contained" href='/'>Back Home</Button>
        </Box>
    );
}

export default Status401;