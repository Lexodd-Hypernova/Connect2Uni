import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
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
  DialogActions,Grid,
  Button,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Badge
} from '@mui/material';
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
  Lock as PasswordIcon
} from '@mui/icons-material';

const AssociateInfo = () => {
  const base_url = import.meta.env.VITE_API_URL;
  const token = Cookies.get('refreshtoken');
  
  const [solicitors, setSolicitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSolicitor, setSelectedSolicitor] = useState(null);
  const [solicitorDetails, setSolicitorDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);

  useEffect(() => {
    const fetchSolicitors = async () => {
      try {
        const response = await axios.get(`${base_url}/associate/solicitors`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setSolicitors(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch solicitors');
        setLoading(false);
      }
    };

    fetchSolicitors();
  }, [base_url, token]);

  const fetchSolicitorDetails = async (id) => {
    setDetailsLoading(true);
    try {
      const response = await axios.get(`${base_url}/associate/solicitor/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setSolicitorDetails(response.data);
      setSelectedSolicitor(id);
    } catch (err) {
      setError(err.message || 'Failed to fetch solicitor details');
    } finally {
      setDetailsLoading(false);
    }
  };

  const handleRowClick = (id) => {
    fetchSolicitorDetails(id);
  };

  const handleCloseDialog = () => {
    setSelectedSolicitor(null);
    setSolicitorDetails(null);
  };

  const filteredSolicitors = solicitors.filter(solicitor => 
    `${solicitor.firstName} ${solicitor.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    solicitor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    solicitor.phoneNumber.includes(searchTerm)
  );

  const handleClearSearch = () => {
    setSearchTerm('');
  };

  if (loading) {
    return (
      <Box 
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'background.paper',
          zIndex: 9999
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
      <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 'bold' }}>
        Solicitors Management
      </Typography>
      
      <Paper elevation={3} sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'medium' }}>
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

        <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 2 }}>
          <Table>
            <TableHead sx={{ backgroundColor: 'primary.light' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Solicitor</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Contact</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Students Assigned</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
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
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: 'action.hover'
                      }
                    }}
                  >
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar sx={{ bgcolor: 'secondary.main', mr: 2 }}>
                          {solicitor.firstName.charAt(0)}{solicitor.lastName.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle1" sx={{ fontWeight: 'medium' }}>
                            {solicitor.firstName} {solicitor.lastName}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            ID: {solicitor._id.substring(0, 8)}...
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <EmailIcon color="action" sx={{ mr: 1 }} />
                        <Typography variant="body2">{solicitor.email}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <PhoneIcon color="action" sx={{ mr: 1 }} />
                        <Typography variant="body2">
                          {solicitor.countryCode} {solicitor.phoneNumber}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={solicitor.studentAssigned.length} 
                        color={solicitor.studentAssigned.length > 0 ? 'success' : 'default'}
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={solicitor.isActive ? 'Active' : 'Inactive'} 
                        color={solicitor.isActive ? 'success' : 'error'}
                        size="small"
                        sx={{ borderRadius: 1 }}
                        icon={solicitor.isActive ? <ActiveIcon fontSize="small" /> : <InactiveIcon fontSize="small" />}
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
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <PersonIcon color="primary" sx={{ mr: 1 }} />
            <Typography variant="h6">Solicitor Details</Typography>
          </Box>
          <IconButton onClick={handleCloseDialog}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        
        <DialogContent dividers>
          {detailsLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
              <CircularProgress />
            </Box>
          ) : solicitorDetails ? (
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar sx={{ 
                  bgcolor: 'secondary.main', 
                  width: 80, 
                  height: 80,
                  fontSize: '2rem',
                  mr: 3
                }}>
                  {solicitorDetails.firstName.charAt(0)}{solicitorDetails.lastName.charAt(0)}
                </Avatar>
                <Box>
                  <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    {solicitorDetails.firstName} {solicitorDetails.lastName}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {solicitorDetails.email}
                  </Typography>
                  <Box sx={{ display: 'flex', mt: 1 }}>
                    <Chip
                      label={solicitorDetails.isActive ? 'Active' : 'Inactive'}
                      color={solicitorDetails.isActive ? 'success' : 'error'}
                      size="small"
                      sx={{ mr: 1 }}
                    />
                    <Chip
                      label={`Visa: ${solicitorDetails.visaRequestStatus}`}
                      color={
                        solicitorDetails.visaRequestStatus === 'completed' ? 'success' : 
                        solicitorDetails.visaRequestStatus === 'inprogress' ? 'warning' : 'default'
                      }
                      size="small"
                    />
                  </Box>
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 'medium' }}>Contact Information</Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon><PhoneIcon color="primary" /></ListItemIcon>
                      <ListItemText 
                        primary="Phone Number" 
                        secondary={`${solicitorDetails.countryCode} ${solicitorDetails.phoneNumber}`} 
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><EmailIcon color="primary" /></ListItemIcon>
                      <ListItemText primary="Email" secondary={solicitorDetails.email} />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><HomeIcon color="primary" /></ListItemIcon>
                      <ListItemText primary="Address" secondary={solicitorDetails.address || 'Not provided'} />
                    </ListItem>
                  </List>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 'medium' }}>Account Information</Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon><DateIcon color="primary" /></ListItemIcon>
                      <ListItemText 
                        primary="Created At" 
                        secondary={new Date(solicitorDetails.createdAt).toLocaleDateString()} 
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon><VisaIcon color="primary" /></ListItemIcon>
                      <ListItemText 
                        primary="Visa Status" 
                        secondary={
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
                      <ListItemIcon><PasswordIcon color="primary" /></ListItemIcon>
                      <ListItemText primary="Account Type" secondary={solicitorDetails.role} />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>

              <Divider sx={{ my: 2 }} />

              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'medium' }}>Assigned Students</Typography>
              {solicitorDetails.studentAssigned.length > 0 ? (
                <Typography>Students list would appear here</Typography>
              ) : (
                <Typography color="text.secondary">No students assigned</Typography>
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
          <Button 
            variant="contained" 
            color="primary"
            onClick={() => {
              // Add action for editing or other operations
            }}
          >
            Edit Profile
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AssociateInfo;