import { Box, LinearProgress } from "@mui/material";
import { ReactComponent as LogoSvg } from '../../assets/svg/logo.svg';

const Loading = () => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '7rem 0'
        }}>
            <LogoSvg />
            <LinearProgress sx={{
                width: '30vw',
                display: { xs: 'none', md: 'block' }
            }} />
            <LinearProgress sx={{
                width: '100vw',
                display: { xs: 'block', md: 'none' }
            }} />
        </Box>
    );
}

export default Loading;