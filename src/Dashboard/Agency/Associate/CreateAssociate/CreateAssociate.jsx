import React, { useState } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  Stack,
  Grid,
  CircularProgress,
} from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import axios from "axios";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";

const CreateAssociate = () => {
  const [open, setOpen] = useState(false);
   const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nameOfAssociate: "",
    email: "",
    phoneNumber: "",
    address: {
      country: "",
      city: "",
      addressLine: "",
    },
    bankDetails: {
      accountNumber: "",
      accountHolderName: "",
      bankName: "",
      ifscSwiftCode: "",
    },
  });

  const base_url = import.meta.env.VITE_API_URL;
  const token = Cookies.get("refreshtoken");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle nested objects (address and bankDetails)
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    try {
      const response = await axios.post(
        `${base_url}/agency/associate/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false)
      toast.success("Associate created successfully")
      handleClose();
      // You might want to refresh the associates list or show a success message here
    } catch (error) {
      setLoading(false)
      toast.error(error.response.data.message)
      // Handle error (show error message, etc.)
    }
  };

  return (
    <Box>
      <Box display="flex" justifyContent="flex-end">
        <Button variant="contained" color="primary" onClick={handleOpen}>
          Create Associate
        </Button>
      </Box>

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

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            maxWidth: "800px",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 1,
            maxHeight: "90vh",
            overflowY: "auto",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
            <BusinessIcon fontSize="medium" color="primary" />
            <Typography variant="h6" component="h2">
              Create New Associate
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Name of associate"
                  name="nameOfAssociate"
                  value={formData.nameOfAssociate}
                  disabled={loading}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  disabled={loading}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  disabled={loading}
                  onChange={handleChange}
                  required
                />
              </Grid>

              {/* Address Fields */}
              <Grid item xs={12}>
                <Typography variant="subtitle1" mt={2} mb={1}>
                  Address
                </Typography>
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextField
                  fullWidth
                  label="Country"
                  name="address.country"
                  value={formData.address.country}
                  disabled={loading}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="City"
                  name="address.city"
                  value={formData.address.city}
                  disabled={loading}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Full Addressline"
                  name="address.addressLine"
                  value={formData.address.addressLine}
                  disabled={loading}
                  onChange={handleChange}
                  required
                />
              </Grid>

              {/* Bank Details */}
              <Grid item xs={12}>
                <Typography variant="subtitle1" mt={2} mb={1}>
                  Bank Details
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Account Number"
                  name="bankDetails.accountNumber"
                  value={formData.bankDetails.accountNumber}
                  disabled={loading}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Account Holder Name"
                  name="bankDetails.accountHolderName"
                  value={formData.bankDetails.accountHolderName}
                  disabled={loading}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Bank Name"
                  name="bankDetails.bankName"
                  value={formData.bankDetails.bankName}
                  disabled={loading}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="IFSC/Swift Code"
                  name="bankDetails.ifscSwiftCode"
                  disabled={loading}
                  value={formData.bankDetails.ifscSwiftCode}
                  onChange={handleChange}
                  required
                />
              </Grid>
            </Grid>

            <Stack direction="row" spacing={2} justifyContent="flex-end" mt={4}>
              <Button variant="outlined" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Create Associate
              </Button>
            </Stack>
          </form>
        </Box>
      </Modal>
      <Toaster position="top-center" reverseOrder={false} />
    </Box>
  );
};

export default CreateAssociate;
