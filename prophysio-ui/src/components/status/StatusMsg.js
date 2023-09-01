import React from 'react';
import { Box, Button, Typography } from '@mui/material';

const StatusMsg = ({ msg }) => {
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
            <Typography variant="h2">
                Something is wrong.
            </Typography>
            <Typography variant="h6">
                {msg}
            </Typography>
            <Button variant="contained" href='/'>Back Home</Button>
        </Box>
    );
}

export default StatusMsg;