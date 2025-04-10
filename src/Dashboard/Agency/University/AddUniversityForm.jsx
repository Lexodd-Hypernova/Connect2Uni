import React, { useState } from "react";
import axios from "axios";
import { 
  TextField, 
  Button, 
  Grid, 
  MenuItem, 
  Paper,
  Typography,
  Box,
  InputAdornment,
  Avatar
} from "@mui/material";
import { CountryCodes } from "../../../Auth/CountryCodes";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";
import { AddAPhoto, Public, Email, Phone, Home, School, Star, Description } from "@mui/icons-material";

const base_url = import.meta.env.VITE_API_URL;

const AddUniversityForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneCode: "+44",
    phoneNumber: "",
    website: "",
    address: {
      country: "United Kingdom",
      city: "",
      zipCode: "",
    },
    institutionType: "",
    ratings: [],
    description: "",
    bannerImage: null,
    isCountryAutoFilled: true,
  });

  const [previewImage, setPreviewImage] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    if (name === "bannerImage" && files && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(files[0]);
    }

    if (name.startsWith("address.")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, [key]: value },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: name === "ratings" ? Number(value) : files ? files[0] : value,
      }));
    }
  };

  const handlePhoneCodeChange = (e) => {
    const selectedCode = e.target.value;
    const selectedCountry = CountryCodes.find(
      (country) => country.code === selectedCode
    );

    setFormData((prev) => ({
      ...prev,
      phoneCode: selectedCode,
      address: {
        ...prev.address,
        country: prev.isCountryAutoFilled
          ? selectedCountry?.name || ""
          : prev.address.country,
      },
    }));
  };

  const handleCountryChange = (e) => {
    setFormData({
      ...formData,
      address: { ...formData.address, country: e.target.value },
      isCountryAutoFilled: e.target.value === "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = Cookies.get("refreshtoken");
    if (!token) {
      toast.error("You are not authenticated. Please log in.");
      return;
    }

    const formPayload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (
        key !== "isCountryAutoFilled" &&
        key !== "phoneCode" &&
        key !== "phoneNumber"
      ) {
        if (key === "address") {
          Object.entries(value).forEach(([addrKey, addrValue]) => {
            formPayload.append(`address[${addrKey}]`, addrValue);
          });
        } else {
          formPayload.append(key, value);
        }
      }
    });

    formPayload.append(
      "phoneNumber",
      `${formData.phoneCode}${formData.phoneNumber}`
    );

    try {
      const response = await axios.post(
        `${base_url}/agency/create/university`,
        formPayload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        toast.success("University added successfully!");
        onClose();
      } else {
        toast.error("Failed to add university. Try again later");
      }
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h5" component="div" sx={{ 
        mb: 3, 
        color: '#004AAC',
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        gap: 1
      }}>
        <School sx={{ fontSize: 30 }} /> Add New University
      </Typography>
      
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* University Name */}
          <Grid item xs={12}>
            <TextField
              label="University Name"
              name="name"
              fullWidth
              required
              variant="outlined"
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <School color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          {/* Website */}
          <Grid item xs={12}>
            <TextField
              label="Official Website"
              name="website"
              type="url"
              fullWidth
              required
              variant="outlined"
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Public color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          {/* Email */}
          <Grid item xs={12}>
            <TextField
              label="Email ID"
              name="email"
              type="email"
              fullWidth
              required
              variant="outlined"
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          {/* Phone Number */}
          <Grid item xs={12} container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                select
                name="phoneCode"
                value={formData.phoneCode}
                onChange={handlePhoneCodeChange}
                fullWidth
                variant="outlined"
                label="Country Code"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone color="action" />
                    </InputAdornment>
                  ),
                }}
              >
                {CountryCodes.map((country) => (
                  <MenuItem key={country.code} value={country.code}>
                    {country.name} ({country.code})
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={8}>
              <TextField
                label="Phone Number"
                name="phoneNumber"
                type="tel"
                fullWidth
                required
                variant="outlined"
                onChange={handleChange}
              />
            </Grid>
          </Grid>

          {/* Address Section */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" sx={{ mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Home /> Address Information
            </Typography>
            <Box sx={{ pl: 2, borderLeft: '2px solid #004AAC' }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Country"
                    name="address.country"
                    fullWidth
                    required
                    variant="outlined"
                    value={formData.address.country}
                    onChange={handleCountryChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="City"
                    name="address.city"
                    fullWidth
                    required
                    variant="outlined"
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="ZIP Code"
                    name="address.zipCode"
                    type="text"
                    fullWidth
                    required
                    variant="outlined"
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>

          {/* Institution Type */}
          <Grid item xs={12} sm={6}>
            <TextField
              select
              label="Type of Institution"
              name="institutionType"
              fullWidth
              required
              variant="outlined"
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <School color="action" />
                  </InputAdornment>
                ),
              }}
            >
              <MenuItem value="Public">Public</MenuItem>
              <MenuItem value="Private">Private</MenuItem>
            </TextField>
          </Grid>

          {/* Ratings */}
          <Grid item xs={12} sm={6}>
            <TextField
              label="University Ratings"
              name="ratings"
              type="number"
              fullWidth
              required
              variant="outlined"
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Star color="action" />
                  </InputAdornment>
                ),
                inputProps: { min: 0, max: 5, step: 0.1 }
              }}
            />
          </Grid>

          {/* Banner Image */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {previewImage && (
                <Avatar
                  src={previewImage}
                  variant="rounded"
                  sx={{ width: '100%', height: 200, mb: 1 }}
                />
              )}
              <Button
                variant="outlined"
                component="label"
                startIcon={<AddAPhoto />}
                fullWidth
                sx={{ py: 1.5 }}
              >
                Upload Banner Image
                <input
                  type="file"
                  name="bannerImage"
                  hidden
                  accept="image/*"
                  onChange={handleChange}
                />
              </Button>
            </Box>
          </Grid>

          {/* Description */}
          <Grid item xs={12}>
            <TextField
              label="University Description"
              name="description"
              multiline
              rows={4}
              fullWidth
              required
              variant="outlined"
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Description color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          {/* Action Buttons */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Button 
                variant="outlined" 
                onClick={onClose}
                sx={{
                  color: '#004AAC',
                  borderColor: '#004AAC',
                  '&:hover': {
                    backgroundColor: '#004AAC10',
                    borderColor: '#004AAC'
                  }
                }}
              >
                Cancel
              </Button>
              <Button 
                variant="contained" 
                type="submit"
                sx={{
                  backgroundColor: '#004AAC',
                  '&:hover': {
                    backgroundColor: '#003A8C'
                  }
                }}
              >
                Submit
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
      <Toaster position="top-center" reverseOrder={false} />
    </Paper>
  );
};

export default AddUniversityForm;