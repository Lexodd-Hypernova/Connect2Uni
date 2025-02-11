import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import axios from "axios";
import { useLogout } from "../../Auth/Logout";

const PlatformFee = () => {
  const { payment_prompt } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const base_url = "http://localhost:3000";
  

  // Redirect if payment_prompt is not available
  useEffect(() => {
    if (!payment_prompt) {
      navigate("/student/dashboard"); // ✅ Go back if no payment required
    }
  }, [payment_prompt, navigate]);

  const handlePayment = async () => {
    try {
      if (!payment_prompt) return; // ✅ Prevent error if payment_prompt is null

      // Make request to backend to get Stripe payment session
      const response = await axios.post(base_url+payment_prompt.payment_url, {}, { withCredentials: true });

      // Redirect user to Stripe Checkout
      window.location.href = response.data.checkout_url; // ✅ Redirect to Stripe
    } catch (error) {
      console.error("Payment Error:", error);
    }
  };

  const handleLogout = useLogout()

  // ✅ Show loading indicator until payment_prompt is available
  if (!payment_prompt) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Loading payment details...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ textAlign: "center", mt: 4 }}>
      <Typography variant="h5" color="error">
        You need to pay the platform fee to access universities & courses.
      </Typography>
      <Typography variant="h6" sx={{ mt: 2 }}>
        Amount: {payment_prompt.amount} {payment_prompt.currency}
      </Typography>
      <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handlePayment}>
        Pay Now
      </Button>

      <Button variant="contained" color="error" sx={{ mt: 2 }} onClick={handleLogout}>
        Logout
      </Button>
    </Box>
  );
};

export default PlatformFee;
