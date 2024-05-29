import React from 'react';
import { Typography, Button, Grid, Container } from '@mui/material';
import UserNavigationBar from '../Navbar/UserNavigationBar';

const HomePage = () => {
    return (
        <div>
            <UserNavigationBar />
            {/* Hero unit */}
            <div style={{ backgroundColor: '#f5f5f5', padding: '8rem 0', textAlign: 'center' }}>
                <Container maxWidth="md">
                    <Typography variant="h2" color="primary" gutterBottom>
                        Welcome to Bag Shop
                    </Typography>
                    <Typography variant="h5" color="textSecondary" paragraph>
                        Explore our exclusive collection of stylish bags.
                    </Typography>
                    <Button variant="contained" color="primary" style={{ margin: '1rem' }}>
                        Shop Now
                    </Button>
                    <Button variant="outlined" color="primary" style={{ margin: '1rem' }}>
                        Learn More
                    </Button>
                </Container>
            </div>
            {/* End hero unit */}

            {/* About section */}
            <div style={{ backgroundColor: '#ffffff', padding: '6rem 0', textAlign: 'center' }}>
                <Container maxWidth="md">
                    <Typography variant="h4" color="primary" gutterBottom>
                        About Us
                    </Typography>
                    <Typography variant="body1" color="textSecondary" paragraph>
                        Bag Shop offers a wide selection of high-quality bags for every occasion. Our mission is to provide stylish and functional bags that complement your lifestyle.
                    </Typography>
                </Container>
            </div>
            {/* End about section */}

            {/* Services section */}
            <div style={{ backgroundColor: '#f5f5f5', padding: '6rem 0', textAlign: 'center' }}>
                <Container maxWidth="md">
                    <Typography variant="h4" color="primary" gutterBottom>
                        Our Services
                    </Typography>
                    <Grid container spacing={3} justifyContent="center">
                        <Grid item xs={12} sm={6} md={4}>
                            <Typography variant="h6" color="textSecondary" gutterBottom>
                                Free Shipping
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Enjoy free shipping on all orders above $50.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Typography variant="h6" color="textSecondary" gutterBottom>
                                24/7 Support
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Our customer support team is available round the clock to assist you.
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Typography variant="h6" color="textSecondary" gutterBottom>
                                Easy Returns
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Hassle-free returns within 30 days of purchase.
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
            </div>
            {/* End services section */}
        </div>
    );
};

export default HomePage;
