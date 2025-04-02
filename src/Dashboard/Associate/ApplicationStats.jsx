import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid,
  useTheme 
} from '@mui/material';
import {
  Description as TotalIcon,
  PendingActions as PendingIcon,
  CheckCircle as AcceptedIcon,
  Cancel as RejectedIcon
} from '@mui/icons-material';

const ApplicationStats = () => {
  const theme = useTheme();
  
  // Sample data - replace with your actual data
  const stats = [
    { 
      title: 'Total Applications', 
      value: 1245, 
      icon: <TotalIcon fontSize="large" />,
      color: theme.palette.primary.main,
      bgColor: theme.palette.primary.light
    },
    { 
      title: 'Pending Applications', 
      value: 328, 
      icon: <PendingIcon fontSize="large" />,
      color: theme.palette.warning.main,
      bgColor: theme.palette.warning.light
    },
    { 
      title: 'Accepted Applications', 
      value: 782, 
      icon: <AcceptedIcon fontSize="large" />,
      color: theme.palette.success.main,
      bgColor: theme.palette.success.light
    },
    { 
      title: 'Rejected Applications', 
      value: 135, 
      icon: <RejectedIcon fontSize="large" />,
      color: theme.palette.error.main,
      bgColor: theme.palette.error.light
    }
  ];

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Typography variant="h6" gutterBottom>
        Application Statistics
      </Typography>
      
      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper 
              elevation={3}
              sx={{ 
                p: 3,
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Box sx={{ 
                backgroundColor: stat.bgColor,
                color: stat.color,
                p: 2,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {stat.icon}
              </Box>
              
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="h5" fontWeight="bold">
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {stat.title}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ApplicationStats;