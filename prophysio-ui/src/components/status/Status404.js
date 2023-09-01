import React from 'react';
import { Box, Button, Typography } from '@mui/material';

const Status404 = () => {
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
                404
            </Typography>
            <Typography variant="h6">
                Page Not Found.
            </Typography>
            <Button variant="contained" href='/'>Back Home</Button>
        </Box>
    );
}

export default Status404;