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
    email: "",
    password: "",
    confirmPassword: "",
    countryCode: "+1",
    phoneNumber: "",
    document: null,
  });

  const [documentPreview, setDocumentPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, document: file });
    if (file) {
      setDocumentPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  // Calculate the minimum date for DOB (15 years ago from today)
  const getMinDate = () => {
    const today = new Date();
    today.setFullYear(today.getFullYear() - 15);
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
          Registration Page
        </Typography>

        {/* Name Inputs */}
        <Box mt={3}>
          <Stack direction="row" spacing={2}>
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

        {/* Email Input */}
        <Box mt={3}>
          <TextField
            label="Email"
            type="email"
            name="email"
            variant="outlined"
            fullWidth
            size="small"
            value={formData.email}
            onChange={handleChange}
          />
        </Box>

        {/* Password Input */}
        <Box mt={3}>
          <TextField
            label="Password"
            type="password"
            name="password"
            variant="outlined"
            fullWidth
            size="small"
            value={formData.password}
            onChange={handleChange}
          />
        </Box>

        {/* Confirm Password Input */}
        <Box mt={3}>
          <TextField
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            variant="outlined"
            fullWidth
            size="small"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </Box>

        {/* Phone Number Input */}
        <Box mt={3}>
          <Stack direction="row" spacing={2}>
            <TextField
              select
              label="Country Code"
              name="countryCode"
              variant="outlined"
              size="small"
              style={{ maxWidth: "120px" }}
              value={formData.countryCode}
              onChange={handleChange}
            >
             <MenuItem value="+1">
    <img 
      src="https://flagcdn.com/us.svg" 
      alt="USA Flag" 
      width="20" 
      style={{ marginRight: "8px" }} 
    />
    +1 (USA)
  </MenuItem>
  <MenuItem value="+91">
    <img 
      src="https://flagcdn.com/in.svg" 
      alt="India Flag" 
      width="20" 
      style={{ marginRight: "8px" }} 
    />
    +91 (India)
  </MenuItem>
  <MenuItem value="+44">
    <img 
      src="https://flagcdn.com/gb.svg" 
      alt="UK Flag" 
      width="20" 
      style={{ marginRight: "8px" }} 
    />
    +44 (UK)
  </MenuItem>
            </TextField>
            <TextField
              label="Phone Number"
              type="tel"
              name="phoneNumber"
              variant="outlined"
              fullWidth
              size="small"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </Stack>
        </Box>

        {/* File Upload */}
        <Box mt={3}>
          <Button
            variant="outlined"
            component="label"
            fullWidth
            sx={{ textAlign: "left" }}
          >
            Upload Document
            <input
              type="file"
              name="document"
              hidden
              onChange={handleFileChange}
            />
          </Button>
          {/* Document Preview */}
          {documentPreview && (
            <Box mt={2}>
              <Typography variant="body2">Preview:</Typography>
              <a href={documentPreview} target="_blank" rel="noopener noreferrer">
                View Uploaded Document
              </a>
            </Box>
          )}
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
