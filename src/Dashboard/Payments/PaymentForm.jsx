import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { Box, Button, Typography, CircularProgress } from '@mui/material';

// Load Stripe outside of component to avoid reloading on re-render

const Stripe_Public_Key = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
const stripePromise = loadStripe(Stripe_Public_Key);

const CheckoutForm = ({ clientSecret, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setError(null);

    const cardElement = elements.getElement(CardElement);

    try {
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement },
      });

      if (stripeError) {
        setError(stripeError.message);
      } else {
        onSuccess(paymentIntent); // Notify parent of success
      }
    } catch (err) {
      setError('An error occurred while processing the payment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Enter Payment Details
      </Typography>

      <Box
        sx={{
          border: '1px solid #ccc',
          padding: '12px',
          borderRadius: '4px',
          marginBottom: '16px',
        }}
      >
        <CardElement options={{ hidePostalCode: true }} />
      </Box>

      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        disabled={!stripe || loading}
        sx={{ mt: 2 }}
      >
        {loading ? <CircularProgress size={24} /> : 'Pay Now'}
      </Button>
    </Box>
  );
};

const PaymentForm = ({ clientSecret, onSuccess }) => (
  <Elements stripe={stripePromise} options={{ clientSecret }}>
    <CheckoutForm clientSecret={clientSecret} onSuccess={onSuccess} />
  </Elements>
);

export default PaymentForm;
