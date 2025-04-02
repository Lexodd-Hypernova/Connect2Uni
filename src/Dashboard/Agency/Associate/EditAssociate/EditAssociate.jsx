import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {
  Box,
  Typography,
  Button,
  Paper,
  TextField,
  Stack,
  CircularProgress,
  Alert,
  Divider,
  Grid,
  Avatar
} from "@mui/material";
import { ArrowBack, Save } from "@mui/icons-material";
import theme from "../../../../theme/theme";

const EditAssociate = ({ associate, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    nameOfAssociate: associate.nameOfAssociate,
    email: associate.email,
    phoneNumber: associate.phoneNumber,
    address: associate.address || {
      addressLine: "",
      city: "",
      country: ""
    },
    bankDetails: associate.bankDetails || {
      accountHolderName: "",
      bankName: "",
      accountNumber: "",
      ifscSwiftCode: ""
    }
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const base_url = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [name]: value
      }
    }));
  };

  const handleBankDetailsChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      bankDetails: {
        ...prev.bankDetails,
        [name]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = Cookies.get("refreshtoken");
      
      const submissionData = {
        nameOfAssociate: formData.nameOfAssociate,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
        bankDetails: formData.bankDetails
      };

      const response = await axios.put(
        `${base_url}/agency/associate/${associate._id}`,
        submissionData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onSave(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update associate");
      console.error("Error updating associate:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={onCancel}
          sx={{ borderRadius: 2 }}
        >
          Back
        </Button>
        <Typography variant="h4" fontWeight="bold">
          Edit Associate
        </Typography>
        <Box sx={{ width: 100 }} /> {/* Spacer for alignment */}
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {loading && (
        <Box sx={{ 
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          bgcolor: 'rgba(0,0,0,0.1)',
          zIndex: 9999
        }}>
          <CircularProgress size={60} />
        </Box>
      )}

      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 4 }}>
          <Avatar sx={{ 
            width: 80, 
            height: 80, 
            bgcolor: theme.palette.primary.main,
            fontSize: '2rem'
          }}>
            {formData.nameOfAssociate.charAt(0)}
          </Avatar>
          <Typography variant="h5" fontWeight="bold">
            {formData.nameOfAssociate}
          </Typography>
        </Box>

        <form onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <Box>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Basic Information
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Full Name"
                    name="nameOfAssociate"
                    value={formData.nameOfAssociate}
                    onChange={handleChange}
                    fullWidth
                    required
                    disabled={loading}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Email"
                    name="email"
                    value={formData.email}
                    fullWidth
                    disabled
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Phone Number"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    fullWidth
                    required
                    disabled={loading}
                  />
                </Grid>
              </Grid>
            </Box>

            <Box>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Address
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    label="Address Line"
                    name="addressLine"
                    value={formData.address.addressLine}
                    onChange={handleAddressChange}
                    fullWidth
                    disabled={loading}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="City"
                    name="city"
                    value={formData.address.city}
                    onChange={handleAddressChange}
                    fullWidth
                    disabled={loading}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Country"
                    name="country"
                    value={formData.address.country}
                    onChange={handleAddressChange}
                    fullWidth
                    disabled={loading}
                  />
                </Grid>
              </Grid>
            </Box>

            <Box>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Bank Details
              </Typography>
              <Divider sx={{ mb: 3 }} />
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Account Holder Name"
                    name="accountHolderName"
                    value={formData.bankDetails.accountHolderName}
                    onChange={handleBankDetailsChange}
                    fullWidth
                    disabled={loading}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Bank Name"
                    name="bankName"
                    value={formData.bankDetails.bankName}
                    onChange={handleBankDetailsChange}
                    fullWidth
                    disabled={loading}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Account Number"
                    name="accountNumber"
                    value={formData.bankDetails.accountNumber}
                    onChange={handleBankDetailsChange}
                    fullWidth
                    disabled={loading}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="IFSC/Swift Code"
                    name="ifscSwiftCode"
                    value={formData.bankDetails.ifscSwiftCode}
                    onChange={handleBankDetailsChange}
                    fullWidth
                    disabled={loading}
                  />
                </Grid>
              </Grid>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, pt: 2 }}>
              <Button 
                variant="outlined" 
                onClick={onCancel}
                disabled={loading}
                sx={{ borderRadius: 2, px: 4 }}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                variant="contained" 
                color="primary"
                disabled={loading}
                startIcon={loading ? null : <Save />}
                sx={{ borderRadius: 2, px: 4 }}
              >
                {loading ? <CircularProgress size={24} /> : "Save Changes"}
              </Button>
            </Box>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default EditAssociate;