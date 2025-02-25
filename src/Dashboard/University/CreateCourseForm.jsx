import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Grid } from '@mui/material';

const CreateCourseForm = ({ onCancel, onSubmit }) => {
  const [courseDetails, setCourseDetails] = useState({
    name: '',
    description: '',
    fees: '',
    // rating: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    console.log(onsubmit);

    console.log(courseDetails.name, courseDetails.description, courseDetails.fees);
    
    
    if (courseDetails.name && courseDetails.description && courseDetails.fees ) {
      onSubmit(courseDetails);
    } else {
      alert('Please fill all the fields.');
    }
  };

  return (
    <Box sx={{ padding: 3, border: '1px solid #ccc', borderRadius: 2, marginTop: 2 }}>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Create New Course
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Course Name"
            name="name"
            value={courseDetails.name}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Description"
            name="description"
            value={courseDetails.description}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Fees"
            name="fees"
            value={courseDetails.fees}
            onChange={handleChange}
          />
        </Grid>
        {/* <Grid item xs={12}>
          <TextField
            fullWidth
            label="Rating"
            name="rating"
            type="number"
            inputProps={{ min: 0, max: 5, step: 0.1 }}
            value={courseDetails.rating}
            onChange={handleChange}
          />
        </Grid> */}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 3 }}>
        <Button variant="contained" color="error" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default CreateCourseForm;