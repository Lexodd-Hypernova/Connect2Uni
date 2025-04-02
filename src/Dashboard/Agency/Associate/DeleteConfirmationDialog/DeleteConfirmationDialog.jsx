import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
  Box,
  Avatar,
  Typography,
} from "@mui/material";
import { Warning, Delete } from "@mui/icons-material";

const DeleteConfirmationDialog = ({ open, onClose, onConfirm, associate }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const base_url = import.meta.env.VITE_API_URL;

  const handleDelete = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = Cookies.get("refreshtoken");
      await axios.delete(`${base_url}/agency/associate/${associate._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onConfirm();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete associate");
      console.error("Error deleting associate:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      {loading && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "rgba(255,255,255,0.7)",
            zIndex: 1,
          }}
        >
          <CircularProgress size={60} />
        </Box>
      )}

      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center", // Add this for horizontal centering
          gap: 2,
          textAlign: "center", // Ensures text is centered if it wraps
        }}
      >
        <Avatar sx={{ bgcolor: "error.light" }}>
          <Warning />
        </Avatar>
        <Typography variant="h6" component="span" fontWeight="bold">
          Confirm Deletion
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ display: "flex", alignItems: "center", gap: 3, mb: 2 }}>
          <Avatar sx={{ width: 60, height: 60, bgcolor: "primary.main" }}>
            {associate.nameOfAssociate.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="body1" fontWeight="medium">
              {associate.nameOfAssociate}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {associate.email}
            </Typography>
          </Box>
        </Box>

        <DialogContentText>
          Are you sure you want to permanently delete this associate and all
          related data? This action cannot be undone.
        </DialogContentText>

        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          disabled={loading}
          sx={{ borderRadius: 2 }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleDelete}
          color="error"
          variant="contained"
          disabled={loading}
          startIcon={<Delete />}
          sx={{ borderRadius: 2 }}
        >
          Delete Permanently
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
