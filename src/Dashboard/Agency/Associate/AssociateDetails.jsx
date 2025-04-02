import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
  Chip,
  IconButton,
  Avatar,
  Stack,
  Grid
} from "@mui/material";
import {
  ArrowBack,
  Edit,
  Delete,
  Email,
  Phone,
  LocationOn,
  AccountBalance,
  People
} from "@mui/icons-material";
import EditAssociate from "./EditAssociate/EditAssociate";
import PersonIcon from '@mui/icons-material/Person';
import PaymentIcon from '@mui/icons-material/Payment';
import NumbersIcon from '@mui/icons-material/Numbers';
import DeleteConfirmationDialog from "./DeleteConfirmationDialog/DeleteConfirmationDialog";
import theme from "../../../theme/theme";

const AssociateDetails = ({
  associate,
  loading,
  onBack,
  onAssociateUpdated,
  onAssociateDeleted
}) => {
  const [editMode, setEditMode] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!associate) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography color="error">No associate data available</Typography>
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={onBack}
          startIcon={<ArrowBack />}
        >
          Back to List
        </Button>
      </Box>
    );
  }

  if (editMode) {
    return (
      <EditAssociate
        associate={associate}
        onSave={(updated) => {
          onAssociateUpdated(updated);
          setEditMode(false);
        }}
        onCancel={() => setEditMode(false)}
      />
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={onBack}
          sx={{ borderRadius: 2 }}
        >
          Back to Associates
        </Button>
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            startIcon={<Edit />}
            onClick={() => setEditMode(true)}
            sx={{ borderRadius: 2 }}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<Delete />}
            onClick={() => setDeleteDialogOpen(true)}
            sx={{ borderRadius: 2 }}
          >
            Delete
          </Button>
        </Stack>
      </Box>

      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={() => {
          onAssociateDeleted(associate._id);
          setDeleteDialogOpen(false);
        }}
        associate={associate}
      />

      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, gap: 3 }}>
          <Avatar sx={{ 
            width: 80, 
            height: 80, 
            bgcolor: theme.palette.primary.main,
            fontSize: '2rem'
          }}>
            {associate.nameOfAssociate.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="h4" fontWeight="bold">
              {associate.nameOfAssociate}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Associate since {new Date(associate.createdAt).toLocaleDateString()}
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ p: 3, borderRadius: 2, bgcolor: theme.palette.grey[50] }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Contact Information
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <List disablePadding>
                <ListItem sx={{ px: 0 }}>
                  <Email color="action" sx={{ mr: 2 }} />
                  <ListItemText 
                    primary="Email" 
                    secondary={associate.email} 
                    secondaryTypographyProps={{ color: 'text.primary' }}
                  />
                </ListItem>
                <ListItem sx={{ px: 0 }}>
                  <Phone color="action" sx={{ mr: 2 }} />
                  <ListItemText 
                    primary="Phone" 
                    secondary={associate.phoneNumber} 
                    secondaryTypographyProps={{ color: 'text.primary' }}
                  />
                </ListItem>
                {associate.address && (
                  <ListItem sx={{ px: 0 }}>
                    <LocationOn color="action" sx={{ mr: 2 }} />
                    <ListItemText 
                      primary="Address" 
                      secondary={`
                        ${associate.address.addressLine}, 
                        ${associate.address.city}, 
                        ${associate.address.country}
                      `} 
                      secondaryTypographyProps={{ color: 'text.primary' }}
                    />
                  </ListItem>
                )}
              </List>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ p: 3, borderRadius: 2, bgcolor: theme.palette.grey[50] }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Bank Details
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              {associate.bankDetails ? (
                <List disablePadding>
                  <ListItem sx={{ px: 0 }}>
                    <AccountBalance color="action" sx={{ mr: 2 }} />
                    <ListItemText 
                      primary="Bank Name" 
                      secondary={associate.bankDetails.bankName} 
                      secondaryTypographyProps={{ color: 'text.primary' }}
                    />
                  </ListItem>
                  <ListItem sx={{ px: 0 }}>
                  <PersonIcon color="action" sx={{ mr: 2 }} />
                    <ListItemText 
                      primary="Account Holder" 
                      secondary={associate.bankDetails.accountHolderName} 
                      secondaryTypographyProps={{ color: 'text.primary' }}
                    />
                  </ListItem>
                  <ListItem sx={{ px: 0 }}>
                  <PaymentIcon color="action" sx={{ mr: 2}}/>
                    <ListItemText 
                      primary="Account Number" 
                      secondary={associate.bankDetails.accountNumber} 
                      secondaryTypographyProps={{ color: 'text.primary' }}
                    />
                  </ListItem>
                  <ListItem sx={{ px: 0 }}>
                    <NumbersIcon color="action" sx={{ mr: 2 }} />
                    <ListItemText 
                      primary="IFSC/Swift Code" 
                      secondary={associate.bankDetails.ifscSwiftCode} 
                      secondaryTypographyProps={{ color: 'text.primary' }}
                    />
                  </ListItem>
                </List>
              ) : (
                <Typography color="text.secondary">No bank details provided</Typography>
              )}
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper elevation={0} sx={{ p: 3, borderRadius: 2, bgcolor: theme.palette.grey[50] }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Assigned Students
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              {associate.studentAssigned?.length > 0 ? (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {associate.studentAssigned.map((student) => (
                    <Chip
                      key={student._id}
                      label={student.name}
                      icon={<People fontSize="small" />}
                      sx={{ borderRadius: 1 }}
                    />
                  ))}
                </Box>
              ) : (
                <Typography color="text.secondary">No students assigned</Typography>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default AssociateDetails;