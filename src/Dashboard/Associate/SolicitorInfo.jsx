import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  CircularProgress,
  Alert,
  Chip,
  TextField,
  InputAdornment,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Grid,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Badge,
  FormControl,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  Person as PersonIcon,
  Search as SearchIcon,
  Clear as ClearIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  Close as CloseIcon,
  Home as HomeIcon,
  CalendarToday as DateIcon,
  CheckCircle as ActiveIcon,
  Warning as InactiveIcon,
  Work as VisaIcon,
  Lock as PasswordIcon,
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Warning,
} from "@mui/icons-material";

const SolicitorInfo = () => {
  const base_url = import.meta.env.VITE_API_URL;
  const token = Cookies.get("refreshtoken");

  const [solicitors, setSolicitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSolicitor, setSelectedSolicitor] = useState(null);
  const [solicitorDetails, setSolicitorDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const fetchSolicitors = async () => {
      try {
        const response = await axios.get(`${base_url}/associate/solicitors`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSolicitors(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to fetch solicitors");
        setLoading(false);
      }
    };

    fetchSolicitors();
  }, [base_url, token, submitSuccess]);

  const fetchSolicitorDetails = async (id) => {
    setDetailsLoading(true);
    try {
      const response = await axios.get(
        `${base_url}/associate/solicitor/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSolicitorDetails(response.data);
      setSelectedSolicitor(id);
    } catch (err) {
      setError(err.message || "Failed to fetch solicitor details");
    } finally {
      setDetailsLoading(false);
    }
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEditClick = () => {
    if (solicitorDetails) {
      setFormData({
        firstName: solicitorDetails.firstName,
        lastName: solicitorDetails.lastName,
        email: solicitorDetails.email,
        phoneNumber: solicitorDetails.phoneNumber,
        address: solicitorDetails.address,
      });
      setEditModalOpen(true);
    }
    handleMenuClose();
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
    handleMenuClose();
  };

  const handleCreateModalOpen = () => {
    setCreateModalOpen(true);
  };

  const handleCreateModalClose = () => {
    setCreateModalOpen(false);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      address: "",
    });
    setFormErrors({});
    setSubmitSuccess(false);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      address: "",
    });
    setFormErrors({});
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: null,
      });
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.firstName.trim()) errors.firstName = "First name is required";
    if (!formData.lastName.trim()) errors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Invalid email format";
    }
    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = "Phone number is required";
    } else if (!/^\d+$/.test(formData.phoneNumber)) {
      errors.phoneNumber = "Phone number must contain only digits";
    }
    if (!formData.address.trim()) errors.address = "Address is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
      };

      await axios.post(`${base_url}/associate/solicitor/create`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSubmitSuccess(true);
      setTimeout(() => {
        handleCreateModalClose();
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create solicitor");
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setActionLoading(true);
    try {
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
      };

      await axios.put(
        `${base_url}/associate/solicitor/update/${selectedSolicitor}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSubmitSuccess(true);
      setEditModalOpen(false);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update solicitor");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    setActionLoading(true);
    try {
      await axios.delete(
        `${base_url}/associate/solicitor/delete/${selectedSolicitor}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSubmitSuccess(true);
      setDeleteDialogOpen(false);
      setSelectedSolicitor(null);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete solicitor");
    } finally {
      setActionLoading(false);
    }
  };

  const handleRowClick = (id) => {
    fetchSolicitorDetails(id);
  };

  const handleCloseDialog = () => {
    setSelectedSolicitor(null);
    setSolicitorDetails(null);
  };

  const filteredSolicitors = solicitors.filter(
    (solicitor) =>
      `${solicitor.firstName} ${solicitor.lastName}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      solicitor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      solicitor.phoneNumber.includes(searchTerm)
  );

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "background.paper",
          zIndex: 9999,
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ mt: 2 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Global Loading Indicator */}
      {actionLoading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            zIndex: 9999,
          }}
        >
          <CircularProgress size={60} />
        </Box>
      )}

      {/* Header with Create Button */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold" }}>
          Solicitors Management
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleCreateModalOpen}
          sx={{
            borderRadius: 2,
            textTransform: "none",
            px: 3,
            py: 1,
          }}
        >
          Create Solicitor
        </Button>
      </Box>

      {/* Main Content */}
      <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "medium" }}>
            Total Solicitors: <Chip label={solicitors.length} color="primary" />
          </Typography>

          <TextField
            variant="outlined"
            size="small"
            placeholder="Search solicitors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: searchTerm && (
                <IconButton onClick={handleClearSearch} size="small">
                  <ClearIcon fontSize="small" />
                </IconButton>
              ),
            }}
            sx={{ width: 300 }}
          />
        </Box>

        <TableContainer
          component={Paper}
          elevation={0}
          sx={{ borderRadius: 2 }}
        >
          <Table>
            <TableHead sx={{ backgroundColor: "primary.light" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Solicitor</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Contact</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Students Assigned
                </TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredSolicitors.length > 0 ? (
                filteredSolicitors.map((solicitor) => (
                  <TableRow
                    key={solicitor._id}
                    hover
                    onClick={() => handleRowClick(solicitor._id)}
                    sx={{
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: "action.hover",
                      },
                    }}
                  >
                    <TableCell>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Avatar sx={{ bgcolor: "secondary.main", mr: 2 }}>
                          {solicitor.firstName.charAt(0)}
                          {solicitor.lastName.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: "medium" }}
                          >
                            {solicitor.firstName} {solicitor.lastName}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            ID: {solicitor._id.substring(0, 8)}...
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 1 }}
                      >
                        <EmailIcon color="action" sx={{ mr: 1 }} />
                        <Typography variant="body2">
                          {solicitor.email}
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <PhoneIcon color="action" sx={{ mr: 1 }} />
                        <Typography variant="body2">
                          {solicitor.phoneNumber}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={solicitor.studentAssigned.length}
                        color={
                          solicitor.studentAssigned.length > 0
                            ? "success"
                            : "default"
                        }
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={solicitor.isActive ? "Active" : "Inactive"}
                        color={solicitor.isActive ? "success" : "error"}
                        size="small"
                        sx={{ borderRadius: 1 }}
                        icon={
                          solicitor.isActive ? (
                            <ActiveIcon fontSize="small" />
                          ) : (
                            <InactiveIcon fontSize="small" />
                          )
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center" sx={{ py: 4 }}>
                    <Typography variant="body1" color="text.secondary">
                      No solicitors found matching your search
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Solicitor Details Dialog */}
      <Dialog
        open={Boolean(selectedSolicitor)}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <PersonIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="h6">Solicitor Details</Typography>
          </Box>
          <Box>
            <IconButton onClick={handleMenuOpen}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleEditClick}>
                <ListItemIcon>
                  <EditIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Edit Profile</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleDeleteClick}>
                <ListItemIcon>
                  <DeleteIcon fontSize="small" color="error" />
                </ListItemIcon>
                <ListItemText sx={{ color: "error.main" }}>Delete</ListItemText>
              </MenuItem>
            </Menu>
            <IconButton onClick={handleCloseDialog}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent dividers>
          {detailsLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
              <CircularProgress />
            </Box>
          ) : solicitorDetails ? (
            <Box>
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Avatar
                  sx={{
                    bgcolor: "secondary.main",
                    width: 80,
                    height: 80,
                    fontSize: "2rem",
                    mr: 3,
                  }}
                >
                  {solicitorDetails.firstName.charAt(0)}
                  {solicitorDetails.lastName.charAt(0)}
                </Avatar>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    {solicitorDetails.firstName} {solicitorDetails.lastName}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {solicitorDetails.email}
                  </Typography>
                  <Box sx={{ display: "flex", mt: 1 }}>
                    <Chip
                      label={solicitorDetails.isActive ? "Active" : "Inactive"}
                      color={solicitorDetails.isActive ? "success" : "error"}
                      size="small"
                      sx={{ mr: 1 }}
                    />
                    <Chip
                      label={`Visa: ${solicitorDetails.visaRequestStatus}`}
                      color={
                        solicitorDetails.visaRequestStatus === "completed"
                          ? "success"
                          : solicitorDetails.visaRequestStatus === "inprogress"
                          ? "warning"
                          : "default"
                      }
                      size="small"
                    />
                  </Box>
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: "medium" }}>
                    Contact Information
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <PhoneIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Phone Number"
                        secondary={`${solicitorDetails.phoneNumber}`}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <EmailIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Email"
                        secondary={solicitorDetails.email}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <HomeIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Address"
                        secondary={solicitorDetails.address || "Not provided"}
                      />
                    </ListItem>
                  </List>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: "medium" }}>
                    Account Information
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <DateIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Created At"
                        secondary={new Date(
                          solicitorDetails.createdAt
                        ).toLocaleDateString()}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <VisaIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Visa Status"
                        secondary={
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Typography component="span" sx={{ mr: 1 }}>
                              {solicitorDetails.visaRequestStatus}
                            </Typography>
                            <Badge
                              badgeContent={solicitorDetails.completedVisa}
                              color="primary"
                              max={999}
                            />
                          </Box>
                        }
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <PasswordIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary="Account Type"
                        secondary={solicitorDetails.role}
                      />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>

              <Divider sx={{ my: 2 }} />

              <Typography variant="h6" sx={{ mb: 2, fontWeight: "medium" }}>
                Assigned Students
              </Typography>
              {solicitorDetails.studentAssigned.length > 0 ? (
                <Typography>Students list would appear here</Typography>
              ) : (
                <Typography color="text.secondary">
                  No students assigned
                </Typography>
              )}
            </Box>
          ) : (
            <Typography color="error">Failed to load details</Typography>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Create Solicitor Modal */}
      <Dialog
        open={createModalOpen}
        onClose={handleCreateModalClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <PersonIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="h6">Create New Solicitor</Typography>
          </Box>
          <IconButton onClick={handleCreateModalClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3} sx={{ mt: 1, p: 2 }}>
              {/* Name Fields */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  error={!!formErrors.firstName}
                  helperText={formErrors.firstName}
                  variant="filled"
                  margin="dense"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiFilledInput-root": {
                      backgroundColor: "rgba(0, 0, 0, 0.04)",
                      borderRadius: 1,
                      "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.08)",
                      },
                      "&.Mui-focused": {
                        backgroundColor: "rgba(0, 0, 0, 0.08)",
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  error={!!formErrors.lastName}
                  helperText={formErrors.lastName}
                  variant="filled"
                  margin="dense"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiFilledInput-root": {
                      backgroundColor: "rgba(0, 0, 0, 0.04)",
                      borderRadius: 1,
                      "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.08)",
                      },
                      "&.Mui-focused": {
                        backgroundColor: "rgba(0, 0, 0, 0.08)",
                      },
                    },
                  }}
                />
              </Grid>

              {/* Email Field */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  error={!!formErrors.email}
                  helperText={formErrors.email}
                  variant="filled"
                  margin="dense"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiFilledInput-root": {
                      backgroundColor: "rgba(0, 0, 0, 0.04)",
                      borderRadius: 1,
                      "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.08)",
                      },
                      "&.Mui-focused": {
                        backgroundColor: "rgba(0, 0, 0, 0.08)",
                      },
                    },
                  }}
                />
              </Grid>

              {/* Phone Field */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  error={!!formErrors.phoneNumber}
                  helperText={formErrors.phoneNumber}
                  variant="filled"
                  margin="dense"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon color="primary" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiFilledInput-root": {
                      backgroundColor: "rgba(0, 0, 0, 0.04)",
                      borderRadius: 1,
                      "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.08)",
                      },
                      "&.Mui-focused": {
                        backgroundColor: "rgba(0, 0, 0, 0.08)",
                      },
                    },
                  }}
                />
              </Grid>

              {/* Address Field */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  error={!!formErrors.address}
                  helperText={formErrors.address}
                  variant="filled"
                  margin="dense"
                  multiline
                  rows={3}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationIcon
                          color="primary"
                          sx={{ mt: -2, alignSelf: "flex-start" }}
                        />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiFilledInput-root": {
                      backgroundColor: "rgba(0, 0, 0, 0.04)",
                      borderRadius: 1,
                      "&:hover": {
                        backgroundColor: "rgba(0, 0, 0, 0.08)",
                      },
                      "&.Mui-focused": {
                        backgroundColor: "rgba(0, 0, 0, 0.08)",
                      },
                    },
                  }}
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCreateModalClose} color="primary">
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={submitting}
            startIcon={submitting ? <CircularProgress size={20} /> : null}
          >
            {submitting ? "Creating..." : "Create Solicitor"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Solicitor Modal */}
      <Dialog
        open={editModalOpen}
        onClose={handleEditModalClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <EditIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="h6">Edit Solicitor</Typography>
          </Box>
          <IconButton onClick={handleEditModalClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <form onSubmit={handleUpdate}>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  error={!!formErrors.firstName}
                  helperText={formErrors.firstName}
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  error={!!formErrors.lastName}
                  helperText={formErrors.lastName}
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  disabled
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  error={!!formErrors.phoneNumber}
                  helperText={formErrors.phoneNumber}
                  variant="outlined"
                  margin="normal"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  error={!!formErrors.address}
                  helperText={formErrors.address}
                  variant="outlined"
                  margin="normal"
                  multiline
                  rows={3}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleEditModalClose} color="primary">
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleUpdate}
            disabled={submitting}
            startIcon={submitting ? <CircularProgress size={20} /> : null}
          >
            {submitting ? "Updating..." : "Update Solicitor"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteDialogClose}
        maxWidth="sm"
      >
        <DialogTitle>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Warning color="error" sx={{ mr: 1 }} />
            <Typography variant="h6">Confirm Delete</Typography>
          </Box>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete {solicitorDetails?.firstName}{" "}
            {solicitorDetails?.lastName}? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            color="error"
            variant="contained"
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SolicitorInfo;
