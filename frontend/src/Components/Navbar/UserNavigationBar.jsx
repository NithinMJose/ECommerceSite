import React, { useEffect } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button, Grid, Drawer, List, ListItem, ListItemText, useTheme, useMediaQuery } from '@mui/material';
import { Menu as MenuIcon } from 'react-feather';
import { useNavigate } from 'react-router-dom';

const UserNavigationBar = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [sidebarOpen, setSidebarOpen] = React.useState(false);
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSidebarOpen = () => {
        setSidebarOpen(true);
    };

    const handleSidebarClose = () => {
        setSidebarOpen(false);
    };

    useEffect(() => {
        const handleResize = () => {
            console.log('Window width:', window.innerWidth);
        };

        window.addEventListener('resize', handleResize);

        // Log initial window width
        handleResize();

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Function to navigate to the /Signup route
    const handleSignupClick = () => {
        navigate('/Signup');
    };
    const handleHomeClick = () => {
        navigate('/');
    };


    const sidebarContent = (
        <List>
            <ListItem button onClick={handleHomeClick}>
                <ListItemText primary="Home" />
            </ListItem>
            <ListItem button onClick={handleSidebarClose}>
                <ListItemText primary="About" />
            </ListItem>
            <ListItem button onClick={handleSidebarClose}>
                <ListItemText primary="Services" />
            </ListItem>
            <ListItem button onClick={handleSidebarClose}>
                <ListItemText primary="Contact" />
            </ListItem>
            <ListItem button onClick={handleSidebarClose}>
                <ListItemText primary="Login" />
            </ListItem>
            <ListItem button onClick={handleSignupClick}>
                <ListItemText primary="Signup" />
            </ListItem>
        </List>
    );

    return (
        <div>
            <AppBar position="static" sx={{ backgroundColor: 'white', color: 'black', boxShadow: 'none' }}>
                <Toolbar sx={{ minHeight: 80 }}>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={handleSidebarOpen}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            flexGrow: 1,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            minWidth: 200,
                            textAlign: 'left',
                            fontFamily: 'Poppins',
                            fontWeight: 'bold',
                            fontSize: '1.5rem',
                            color: 'black',
                            letterSpacing: '0.1rem',
                            textTransform: 'uppercase',
                            textDecoration: 'none',
                            cursor: 'default'
                        }}
                    >
                        Bag Shop
                    </Typography>
                    {!isSmallScreen && (
                        <Grid container spacing={2} justifyContent="flex-end">
                            <Grid item>
                                <Button color="inherit" onClick={handleHomeClick} >Home</Button>
                            </Grid>
                            <Grid item>
                                <Button color="inherit">About</Button>
                            </Grid>
                            <Grid item>
                                <Button color="inherit">Services</Button>
                            </Grid>
                            <Grid item>
                                <Button color="inherit">Contact</Button>
                            </Grid>
                            <Grid item>
                                <Button color="inherit">Login</Button>
                            </Grid>
                            <Grid item>
                                <Button color="inherit" onClick={handleSignupClick}>Signup</Button>
                            </Grid>
                        </Grid>
                    )}
                </Toolbar>
            </AppBar>
            <Drawer anchor="left" open={sidebarOpen} onClose={handleSidebarClose}>
                {sidebarContent}
            </Drawer>
        </div>
    );
};

export default UserNavigationBar;
