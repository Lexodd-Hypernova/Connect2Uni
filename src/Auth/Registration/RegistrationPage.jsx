import React from 'react';
import { Grid, Box } from '@mui/material';
import Registration from './Registration';
import image from '../../../src/assets/register/Connect2Uni-register.png';

const RegistrationPage = () => {
  return (
    <Box sx={{ flexGrow: 1, padding: 3, height: '100vh' }}> {/* Full viewport height */}
      <Grid container spacing={2} sx={{ height: '100%' }}>
        {/* Left Grid Item for the Image */}
        <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
          <img
            src={image}
            alt="Registration"
            style={{
              maxWidth: '100%', // Reduce image size
            }}
          />
        </Grid>

        {/* Right Grid Item for the Registration Component, centered vertically */}
        <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
          <Registration />
        </Grid>
      </Grid>
    </Box>
  );
};

export default RegistrationPage;
