import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, Box, Menu, MenuItem, Toolbar, Tooltip, Typography } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LogoutIcon from '@mui/icons-material/Logout';
import { HealthAndSafety } from '@mui/icons-material';
import * as Actions from '../../redux/actions';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ handleDrawerToggle }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [anchorElUser, setAnchorElUser] = useState(null);
    const { isAuthenticated } = useSelector(({ auth }) => auth);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const onLogoutClick = () => {
        // dispatch(clearCurrentProfile);
        dispatch(Actions.logoutUser());
        navigate('/login');
    };

    return (
        <AppBar position="fixed">
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
                <HealthAndSafety sx={{ display: { xs: 'none', md: 'block' }, mr: 1 }} fontSize='large' />
                <HealthAndSafety sx={{ display: { xs: 'block', md: 'none' }, mr: 1 }} />
                <Typography
                    variant="h4"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                        mt: 0.5,
                        mr: 2,
                        flexGrow: 1,
                        fontFamily: 'Algerian',
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                        display: {
                            xs: 'none',
                            md: 'block'
                        }
                    }}
                >
                    Prophysio
                </Typography>
                <Typography
                    variant="h5"
                    noWrap
                    component="a"
                    href="/"
                    sx={{
                        mr: 2,
                        flexGrow: 1,
                        fontFamily: 'Algerian',
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                        display: {
                            xs: 'block',
                            md: 'none'
                        }
                    }}
                >
                    Prophysio
                </Typography>
                <Box sx={{ flexGrow: 0 }}>
                    {isAuthenticated ? (
                        <>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Anthony Bartolotte" src="/static/images/avatar/2.jpg" />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem key={'Profile'} onClick={() => {
                                    handleCloseUserMenu();
                                }}>
                                    <ListItemIcon><AdminPanelSettingsIcon /></ListItemIcon>
                                    <ListItemText>Profile</ListItemText>
                                </MenuItem>
                                <MenuItem key={'Logout'} onClick={() => {
                                    handleCloseUserMenu();
                                    onLogoutClick();
                                }}>
                                    <ListItemIcon><LogoutIcon /></ListItemIcon>
                                    <ListItemText>Logout</ListItemText>
                                </MenuItem>
                            </Menu>
                        </>
                    ) : (
                        <>
                            <IconButton aria-label="login" onClick={() => navigate('/login')}>
                                <LoginIcon />
                            </IconButton>
                            <IconButton aria-label="register" onClick={() => navigate('/register')}>
                                <PersonAddIcon />
                            </IconButton>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;