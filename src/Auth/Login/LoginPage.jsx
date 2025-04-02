import React from 'react';
import { Grid, Box } from '@mui/material';
import Login from './Login';
import image from '../../../src/assets/login/Login.png';

const LoginPage = () => {
  return (
    <Box sx={{ flexGrow: 1, padding: 3, height: '100vh' }}> {/* Full viewport height */}
      <Grid container spacing={2} sx={{ height: '100%' }}>
        {/* Left Grid Item for the Image */}
        <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
          <img
            src={image}
            alt="Login"
            style={{
              maxWidth: '100%', // Reduce image size
              width:'550px'
            }}
          />
        </Grid>

        {/* Right Grid Item for the Login Component, centered vertically */}
        <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
          <Login />
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoginPage;
