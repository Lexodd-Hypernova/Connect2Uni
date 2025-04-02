import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Button,
  Chip,
  Avatar,
  IconButton,
  Tooltip
} from "@mui/material";
import { Business, Add, Refresh } from "@mui/icons-material";
import CreateAssociate from "./CreateAssociate/CreateAssociate";
import AssociateDetails from "./AssociateDetails";
import theme from "../../../theme/theme";

const AssociateList = () => {
  const [associates, setAssociates] = useState([]);
  const [associateDetails, setAssociateDetails] = useState(null); // Add this line
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAssociate, setSelectedAssociate] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const base_url = import.meta.env.VITE_API_URL;

  const fetchAssociates = async () => {
    setLoading(true);
    try {
      const token = Cookies.get("refreshtoken");
      const response = await axios.get(`${base_url}/agency/associate`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAssociates(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch associates");
      console.error("Error fetching associates:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssociates();
  }, []);

  const fetchAssociateDetails = async (associateId) => {
    try {
      setDetailsLoading(true);
      const token = Cookies.get("refreshtoken");
      const response = await axios.get(`${base_url}/agency/associate/${associateId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAssociateDetails(response.data.data);
      setSelectedAssociate(associateId);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch associate details");
      console.error("Error fetching associate details:", err);
    } finally {
      setDetailsLoading(false);
    }
  };

  const handleAssociateCreated = (newAssociate) => {
    setAssociates([...associates, newAssociate]);
  };

  const handleAssociateUpdated = (updatedAssociate) => {
    setAssociates(associates.map(a => 
      a._id === updatedAssociate._id ? updatedAssociate : a
    ));
    setAssociateDetails(updatedAssociate);
  };

  const handleAssociateDeleted = (deletedId) => {
    setAssociates(associates.filter(a => a._id !== deletedId));
    setSelectedAssociate(null);
  };

  const handleBackToList = () => {
    setSelectedAssociate(null);
    setAssociateDetails(null);
  };

  if (loading) return <LoadingScreen />;
  if (error) return <ErrorScreen error={error} onRetry={fetchAssociates} />;
  if (selectedAssociate) {
    return (
      <AssociateDetails 
        associate={associateDetails} 
        loading={detailsLoading}
        onBack={handleBackToList}
        onAssociateUpdated={handleAssociateUpdated}
        onAssociateDeleted={handleAssociateDeleted}
      />
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
            <Business />
          </Avatar>
          <Typography variant="h4" fontWeight="bold">Associates</Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Tooltip title="Refresh list">
            <IconButton onClick={fetchAssociates}>
              <Refresh />
            </IconButton>
          </Tooltip>
          <CreateAssociate onAssociateCreated={handleAssociateCreated} />
        </Box>
      </Box>

      <Paper elevation={3} sx={{ borderRadius: 3, overflow: 'hidden' }}>
        <TableContainer>
          <Table>
            <TableHead sx={{ bgcolor: theme.palette.grey[100] }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Contact</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Assigned Students</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {associates.length > 0 ? (
                associates.map((associate) => (
                  <TableRow
                    key={associate._id}
                    hover
                    onClick={() => fetchAssociateDetails(associate._id)}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell>
                      <Typography fontWeight="medium">{associate.nameOfAssociate}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {associate.email}
                      </Typography>
                    </TableCell>
                    <TableCell>{associate.phoneNumber}</TableCell>
                    <TableCell>
                      {associate.studentAssigned?.length > 0 ? (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                          {associate.studentAssigned.slice(0, 3).map((student) => (
                            <Chip key={student._id} label={student.name} size="small" />
                          ))}
                          {associate.studentAssigned.length > 3 && (
                            <Chip 
                              label={`+${associate.studentAssigned.length - 3}`} 
                              size="small" 
                            />
                          )}
                        </Box>
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          None
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label="Active" 
                        color="success" 
                        size="small" 
                        sx={{ borderRadius: 1 }}
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} sx={{ textAlign: 'center', py: 4 }}>
                    <Typography variant="body1">No associates found</Typography>
                    <Button 
                      variant="outlined" 
                      startIcon={<Add />}
                      sx={{ mt: 2 }}
                      onClick={() => setCreateDialogOpen(true)}
                    >
                      Create Associate
                    </Button>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

const LoadingScreen = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
    <CircularProgress size={60} />
  </Box>
);

const ErrorScreen = ({ error, onRetry }) => (
  <Box sx={{ textAlign: 'center', mt: 4 }}>
    <Typography color="error" gutterBottom>
      {error}
    </Typography>
    <Button
      variant="contained"
      onClick={onRetry}
      startIcon={<Refresh />}
      sx={{ mt: 2 }}
    >
      Retry
    </Button>
  </Box>
);

export default AssociateList;