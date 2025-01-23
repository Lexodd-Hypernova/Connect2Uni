import React, { useState } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted!");
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 12,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: 3,
          borderRadius: 2,
          p: 4,
        }}
      >
        <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
          {/* Email Field */}
          <TextField
            fullWidth
            label="Email Address"
            placeholder="Enter your email address"
            margin="normal"
            required
            variant="outlined"
          />

          {/* Password Field */}
          <TextField
            fullWidth
            label="Password"
            placeholder="Enter your password"
            margin="normal"
            autoComplete="on"
            type={showPassword ? "text" : "password"}
            required
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Remember Me and Forgot Password */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 1,
            }}
          >
            <FormControlLabel
              control={<Checkbox color="primary" />}
              label="Remember me"
            />
            <Link to="/forgot-password" style={{ textDecoration: "none" }}>
              Forgot password?
            </Link>
          </Box>

          {/* Login Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>

          {/* No Account Yet? Register */}
          <Typography variant="body2" align="center">
            No account yet?{" "}
            <Link
              to="/register"
              style={{
                textDecoration: "none",
                color: "#1976d2",
                cursor: "pointer",
              }}
            >
              Register
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
