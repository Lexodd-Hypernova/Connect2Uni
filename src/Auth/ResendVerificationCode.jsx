import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";

const ResendVerificationCode = ({ open, handleClose, email }) => {
  const base_url = import.meta.env.VITE_API_URL;

  const handleResendVerification = async () => {
    try {
        await axios.post(
            `${base_url}/student/resend-verification-email`, 
            {email}, 
            {
              headers: {
                "Content-Type": "application/json",
              }
            }
          );
      toast.success("Verification email sent successfully!");
      handleClose(); // Close modal after successful resend
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to resend verification email.");
    }
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="resend-modal-title">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography id="resend-modal-title" variant="h6" component="h2" gutterBottom>
          Email Not Verified : <span style={{ color: "red", fontSize:'12px' }}>{email}</span>
        </Typography>
        <Typography variant="body2" gutterBottom>
          Your email has not been verified. Please check your mail or click below to resend the verification link.
        </Typography>
        <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleResendVerification}>
          Resend Verification Email
        </Button>
        <Button variant="outlined" color="secondary" fullWidth sx={{ mt: 1 }} onClick={handleClose}>
          Cancel
        </Button>
      </Box>
    </Modal>
  );
};

export default ResendVerificationCode;
