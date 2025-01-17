import React, { useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';

const AddUniversityForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    thumbnail: null,
    description: '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'thumbnail' ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formPayload = new FormData();
    formPayload.append('name', formData.name);
    formPayload.append('email', formData.email);
    formPayload.append('phone', formData.phone);
    formPayload.append('thumbnail', formData.thumbnail);
    formPayload.append('description', formData.description);

    try {
      const response = await fetch('/api/universities', {
        method: 'POST',
        body: formPayload,
      });

      if (response.ok) {
        alert('University added successfully!');
        onClose(); // Close the modal
      } else {
        alert('Failed to add university.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="University Name"
            name="name"
            fullWidth
            required
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email ID"
            name="email"
            type="email"
            fullWidth
            required
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Phone Number"
            name="phone"
            type="tel"
            fullWidth
            required
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            type="file"
            name="thumbnail"
            fullWidth
            required
            inputProps={{ accept: 'image/*' }}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Description"
            name="description"
            multiline
            rows={3}
            fullWidth
            required
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddUniversityForm;
