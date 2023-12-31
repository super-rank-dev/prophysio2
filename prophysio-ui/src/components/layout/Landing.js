import { Button, Stack } from '@mui/material';
import { ReactComponent as LogoSvg } from '../../logo.svg';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const Landing = () => {

    const navigate = useNavigate();
    const { isAuthenticated } = useSelector(({ auth }) => (auth));

    useEffect(() => {
        if (isAuthenticated !== undefined) {
            if (isAuthenticated) {
                navigate('/');
            } else {
                navigate('/login');
            }
        }
    }, [isAuthenticated, navigate]);

    return (
        <div className="bgimg">
            {/* <div className="topleft">
                <LogoSvg />
            </div>
            <div className="middle">
                <Stack spacing={2}>
                    <h1>Pro Physio</h1>
                    <div className='getting-started'>
                        <Button
                            variant='contained'
                            color='secondary'
                            sx={{ margin: 'auto' }}
                            onClick={() => navigate('')}
                        >
                            Getting Started
                        </Button>
                    </div>
                    <hr />
                    <p>Nothing is more important to a person than their own health.</p>
                </Stack>
            </div>
            <div className="bottomleft">
                <p>v1.0</p>
            </div> */}
        </div>
    );
}

export default Landing;