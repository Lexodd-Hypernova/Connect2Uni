import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "../../store/authSlice";
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";
import Cookies from 'js-cookie'; // Import js-cookie
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
} from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate(); // Initialize useNavigate

  const base_url = "http://localhost:3000";

  const navigateSignUp = () =>  {
    navigate('/register')
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
  
    try {
      const response = await axios.post(`${base_url}/student/login`, {
        email,
        password,
      });
  
      if (response.status === 200) {
       

        console.log(response);
        
  
        // Store token in cookies
        Cookies.set('refreshtoken', response.data.token, { expires: 1 }); // Expires in 1 day
  
        // Dispatch login success with user and role
        dispatch(loginSuccess({
          user: response.data.user,
          role: response.data.role,
          token: response.data.token,
          platform_access: response.data.platform_access,
          notifications: response.data.notifications,
          payment_status: response.data.payment_status,
          payment_prompt: response.data.payment_prompt || null, // ✅ Add this
        }));
  
        // Redirect based on role
       
        if (response.data.role === 'student') {
          navigate('/student/dashboard');
        } else if (response.data.role === 'admin') {
          navigate('/agency/dashboard');
        } else if (response.data.role === 'solicitor') {
          navigate('/solicitor/dashboard');
        } else if (response.data.role === 'agent') {
          navigate('/agent/dashboard');
        } else if (response.data.role === 'agent') {
          navigate('/agent/dashboard');
        } else if (response.data.role === 'University') {
          navigate('/university/dashboard');
        }

        toast.success('Login Successful');
        // Save email to localStorage if "Remember Me" is checked
        if (rememberMe) {
          localStorage.setItem("rememberedEmail", email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }
      } else {
        dispatch(loginFailure("Invalid email or password"));
      }
    } catch (err) {
      toast.error(err.response.data.message);
      dispatch(loginFailure(err.response?.data?.message || "An error occurred. Please try again."));
    }
  };

  // Pre-fill email if "Remember Me" was checked previously
  React.useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          boxShadow: 3,
          borderRadius: 2,
          p: 4,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        <Box component="form" onSubmit={handleLogin} sx={{ mt: 1, width: "100%" }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                color="primary"
              />
            }
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
          {/* {error && (
            <Typography variant="body2" color="error" align="center">
              {error}
            </Typography>
          )} */}
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link onClick={navigateSignUp} variant="body2">
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Toaster
          position="top-center"
          reverseOrder={false}
        />
    </Container>
  );
};

export default Login;








// cors code

// const app = express()
// require('dotenv').config({ path: '.env' })
// require('./utils/passport'); 

// app.use(cors({
//     origin: "http://localhost:5173", // Remove trailing slash
//     credentials: true
//   }));