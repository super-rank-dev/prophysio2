import { Typography } from "@mui/material";

const SessionExpired = () => {
    return (
        <Typography
            align='center'
            color='error'
            sx={{
                mt: '30vh',
                flexGrow: 1,
                fontFamily: 'Calibri',
                fontStyle: 'italic',
                fontSize: '52px',
                fontWeight: 'bold',
                letterSpacing: '.3rem',
                textDecoration: 'none',
                textShadow: '2px 2px 2px #000',
                display: {
                    xs: 'none',
                    md: 'block'
                }
            }}
        >Please login to visit website.</Typography>
    );
}

export default SessionExpired;