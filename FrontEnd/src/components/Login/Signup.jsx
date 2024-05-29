import React, { useState } from 'react';
import axios from 'axios';
import { Container, Grid, Card, CardContent, Typography, TextField, Button } from '@mui/material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserNavigationBar from '../Navbar/UserNavigationBar';

const Signup = () => {
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        password: ''
    });
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [intOtp, setIntOtp] = useState(0);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put('https://localhost:7211/api/User/SendEmailVerification', {
                email: formData.email,
                name: formData.name
            });

            if (response.status === 200) {
                console.log(response.data);
                const otpFromResponse = response.data.otp;
                setIntOtp(parseInt(otpFromResponse));
                toast.success('Email sent successfully');
                setOtpSent(true);
            } else {
                console.error('Failed to send email verification');
                toast.error('Failed to send email verification');
            }
        } catch (error) {
            console.error('Error sending email verification:', error);
            toast.error('Error sending email verification');
        }
    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        console.log('email:', formData.email);
        console.log('name:', formData.name);

        if (intOtp === parseInt(otp)) {
            console.log('OTP verified');
            try {
                const response = await axios.post('https://localhost:7211/api/User/CreateUser', formData);

                if (response.status === 201) {
                    toast.success('User created successfully');
                    console.log('User created successfully');
                } else {
                    console.error('Failed to create user');
                    toast.error('Failed to create user');
                }
            } catch (error) {
                console.error('Error creating user:', error);
                toast.error('Error creating user');
            }
        } else {
            toast.error('Invalid OTP');
        }
    };

    return (
        <>
            <UserNavigationBar />
            <Container maxWidth="sm" mt={5}>
                <Card>
                    <CardContent>
                        <Typography variant="h5" align="center" gutterBottom>Signup</Typography>
                        {!otpSent ? (
                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField fullWidth label="Email" type="email" name="email" value={formData.email} onChange={handleChange} required />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField fullWidth label="Username" name="name" value={formData.name} onChange={handleChange} required />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField fullWidth label="Password" type="password" name="password" value={formData.password} onChange={handleChange} required />
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} mt={2}>
                                    <Button type="submit" variant="contained" color="primary" fullWidth>Verify Email</Button>
                                </Grid>
                            </form>
                        ) : (
                            <form onSubmit={handleOtpSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Typography variant="body1">Email: {formData.email}</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="body1">Username: {formData.name}</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField fullWidth label="Enter OTP" type="text" value={otp} onChange={(e) => setOtp(e.target.value)} required />
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} mt={2}>
                                    <Button type="submit" variant="contained" color="primary" fullWidth>Submit OTP</Button>
                                </Grid>
                            </form>
                        )}
                    </CardContent>
                </Card>
            </Container>
        </>
    );
};

export default Signup;
