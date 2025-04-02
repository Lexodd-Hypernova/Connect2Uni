import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, CircularProgress, Button } from '@mui/material';
import axios from 'axios';
import Cookies from 'js-cookie';
import PaymentForm from './PaymentForm'; 

const PlatformFee = () => {
  const { payment_prompt } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [clientSecret, setClientSecret] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const base_url = import.meta.env.VITE_API_URL;
  const token = Cookies.get('refreshtoken');

  useEffect(() => {
    if (!payment_prompt) {
      navigate("/student/dashboard");
    }
  }, [payment_prompt, navigate]);

  const createPaymentIntent = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${base_url}/student/create-payment-intent`,
        { amount: payment_prompt.amount, currency: payment_prompt.currency },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setClientSecret(response.data.clientSecret);
      setShowPaymentForm(true);
    } catch (error) {
      console.error('Error creating payment intent:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSuccess = async (paymentIntent) => {
    console.log('Payment succeeded:', paymentIntent);
    try {
      await axios.post(
        `${base_url}/student/stripe-webhook`,
        { paymentIntentId: paymentIntent.id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate("/student/dashboard"); // Redirect on success
    } catch (error) {
      console.error('Error confirming payment:', error);
    }
  };

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

      {!showPaymentForm && (
        <Button
          variant="contained"
          color="primary"
          onClick={createPaymentIntent}
          disabled={loading}
          sx={{ mt: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : 'Pay Now'}
        </Button>
      )}

      {showPaymentForm && clientSecret && (
        <PaymentForm clientSecret={clientSecret} onSuccess={handlePaymentSuccess} />
      )}
    </Box>
  );
};

export default PlatformFee;
