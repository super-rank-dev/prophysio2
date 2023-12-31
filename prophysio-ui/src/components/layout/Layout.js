import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

import jwt_decode from 'jwt-decode';
import setAuthToken from '../../utils/setAuthToken';
import * as Actions from '../../redux/actions';

const drawerWidth = 300;

function Layout(props) {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        // Check for token
        if (localStorage.jwtToken) {
            // Set auth token header auth
            setAuthToken(localStorage.jwtToken);
            // Decode token and get user info and exp
            const decoded = jwt_decode(localStorage.jwtToken);
            // Set user and isAuthenticated
            dispatch(Actions.setCurrentUser(decoded));
            // Check for expired token
            const currentTime = Date.now() / 1000;
            if (decoded.exp < currentTime) {
                // Logout user
                dispatch(Actions.logoutUser());
                // Clear current Profile
                // dispatch(clearCurrentProfile());
                // Redirect to login
                navigate('/login');
            }
        } else {
            navigate('/login');
        }
    }, [dispatch]);

    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Navbar handleDrawerToggle={handleDrawerToggle} />
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    <Sidebar />
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    <Sidebar />
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    );
}

export default Layout;