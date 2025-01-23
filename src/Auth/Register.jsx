import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Stack,
  MenuItem,
} from "@mui/material";

const Registration = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    gender: "",
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  // Calculate the minimum date for DOB (15 years ago from today)
  const getMinDate = () => {
    const today = new Date();
    today.setFullYear(today.getFullYear() - 14);
    return today.toISOString().split("T")[0];
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "50px" }}>
      <Box
        sx={{
          marginTop: 12,
          boxShadow: 3,
          borderRadius: 2,
          p: 4,
        }}
        component="form"
        onSubmit={handleSubmit}
      >
        {/* Heading */}
        <Typography variant="h4" align="center" gutterBottom>
          Personal Information
        </Typography>

        {/* Name Inputs */}
        <Box mt={3}>
          <Stack spacing={2}>
            <TextField
              label="First Name"
              name="firstName"
              variant="outlined"
              fullWidth
              size="small"
              value={formData.firstName}
              onChange={handleChange}
            />
            <TextField
              label="Middle Name"
              name="middleName"
              variant="outlined"
              fullWidth
              size="small"
              value={formData.middleName}
              onChange={handleChange}
            />
            <TextField
              label="Last Name"
              name="lastName"
              variant="outlined"
              fullWidth
              size="small"
              value={formData.lastName}
              onChange={handleChange}
            />
          </Stack>
        </Box>

        {/* DOB Input */}
        <Box mt={3}>
          <TextField
            label="Date of Birth"
            type="date"
            name="dob"
            variant="outlined"
            fullWidth
            InputLabelProps={{ shrink: true }}
            size="small"
            value={formData.dob}
            onChange={handleChange}
            inputProps={{ max: getMinDate() }}
          />
        </Box>

        {/* Gender Input */}
        <Box mt={3}>
          <TextField
            select
            label="Gender"
            name="gender"
            variant="outlined"
            fullWidth
            size="small"
            value={formData.gender}
            onChange={handleChange}
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </TextField>
        </Box>

        {/* Save & Next Button */}
        <Box mt={4} display="flex" justifyContent="flex-end">
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ backgroundColor: "#2196F3", color: "#ffffff" }}
          >
            Save & Next
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Registration;
