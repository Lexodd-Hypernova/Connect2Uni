import React, { useState, useEffect } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  CircularProgress,
  Typography,
  Box,
  Avatar,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Grid,
} from "@mui/material";
import * as XLSX from "xlsx";
import Cookies from "js-cookie";
import AddUniversityForm from "./AddUniversityForm";
import {
  Email,
  Phone,
  Public,
  LocationCity,
  Home,
  School,
  Star,
  Event,
  Update,
  Code,
  Apps,
  CheckCircle,
  Close,
} from "@mui/icons-material";

const UniversityInfo = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const base_url = import.meta.env.VITE_API_URL;
  const token = Cookies.get("refreshtoken");

  // Fetch universities data
  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await fetch(`${base_url}/agency/get/universities`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch universities");
        }

        const data = await response.json();
        setUniversities(data.universities);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUniversities();
  }, [base_url, token]);

  // Fetch university details
  const fetchUniversityDetails = async (id) => {
    setDetailLoading(true);
    try {
      const response = await fetch(`${base_url}/agency/universities/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch university details");
      }

      const data = await response.json();
      setSelectedUniversity(data.university);
      setOpenDetailModal(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setDetailLoading(false);
    }
  };

  // Function to export data to Excel
  const exportToExcel = () => {
    const dataToExport = universities.map((univ) => ({
      Name: univ.name,
      ID: univ._id,
      Email: univ.email,
      Country: univ.address?.country || "N/A",
      City: univ.address?.city || "N/A",
      Phone: univ.phoneNumber,
      Website: univ.website,
      Type: univ.institutionType,
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "University Info");
    XLSX.writeFile(workbook, "UniversityInfo.xlsx");
  };

  // Handlers for modals
  const handleAddModalOpen = () => setOpenAddModal(true);
  const handleAddModalClose = () => setOpenAddModal(false);
  const handleDetailModalClose = () => setOpenDetailModal(false);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress style={{ color: "#004AAC" }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
      >
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      {detailLoading && (
        <Box
          position="fixed"
          top={0}
          left={0}
          right={0}
          bottom={0}
          display="flex"
          justifyContent="center"
          alignItems="center"
          bgcolor="rgba(0, 0, 0, 0.5)"
          zIndex={9999}
        >
          <CircularProgress style={{ color: "#004AAC" }} size={60} />
        </Box>
      )}
      
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <Typography
          variant="h4"
          style={{ color: "#004AAC", fontWeight: "bold" }}
        >
          University Information
        </Typography>
        <div>
          <Button
            variant="contained"
            style={{
              backgroundColor: "#004AAC",
              color: "white",
              marginRight: "10px",
            }}
            onClick={exportToExcel}
          >
            Export Data
          </Button>
          <Button
            variant="contained"
            style={{
              backgroundColor: "#004AAC",
              color: "white",
            }}
            onClick={handleAddModalOpen}
          >
            Add University
          </Button>
        </div>
      </div>

      <TableContainer
        component={Paper}
        elevation={3}
        style={{ borderRadius: "8px" }}
      >
        <Table>
          <TableHead style={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell style={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Email</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Country</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Phone</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {universities.map((university) => (
              <TableRow 
                key={university._id} 
                hover 
                onClick={() => fetchUniversityDetails(university._id)}
                style={{ cursor: "pointer" }}
              >
                <TableCell>{university.name}</TableCell>
                <TableCell>{university.email}</TableCell>
                <TableCell>{university.address?.country || "N/A"}</TableCell>
                <TableCell>{university.phoneNumber}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add University Modal */}
      <Dialog open={openAddModal} onClose={handleAddModalClose} fullWidth maxWidth="sm">
        <DialogTitle style={{ color: "#004AAC", fontWeight: "bold" }}>
          Add University
        </DialogTitle>
        <DialogContent>
          <AddUniversityForm onClose={handleAddModalClose} />
        </DialogContent>
      </Dialog>

      {/* University Details Modal */}
      <Dialog 
        open={openDetailModal} 
        onClose={handleDetailModalClose} 
        fullWidth 
        maxWidth="md"
      >
        <DialogTitle style={{ 
          color: "#004AAC", 
          fontWeight: "bold",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          University Details
          <IconButton onClick={handleDetailModalClose}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {selectedUniversity ? (
            <Box>
              <Box display="flex" alignItems="center" mb={3}>
                {selectedUniversity.bannerImage?.length > 0 && (
                  <Avatar
                    src={selectedUniversity.bannerImage[0]}
                    variant="rounded"
                    sx={{ width: 100, height: 100, mr: 3 }}
                  />
                )}
                <Box>
                  <Typography variant="h4" style={{ color: "#004AAC" }}>
                    {selectedUniversity.name}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    {selectedUniversity.institutionType} Institution
                  </Typography>
                  <Chip 
                    label={selectedUniversity.isPromoted === "YES" ? "Promoted" : "Not Promoted"}
                    color={selectedUniversity.isPromoted === "YES" ? "success" : "default"}
                    size="small"
                    sx={{ mt: 1 }}
                  />
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom style={{ color: "#004AAC" }}>
                    Basic Information
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <Email color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Email" 
                        secondary={selectedUniversity.email || "N/A"} 
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Phone color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Phone" 
                        secondary={selectedUniversity.phoneNumber || "N/A"} 
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Public color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Website" 
                        secondary={
                          selectedUniversity.website ? (
                            <a 
                              href={selectedUniversity.website} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              style={{ color: "#004AAC" }}
                            >
                              {selectedUniversity.website}
                            </a>
                          ) : "N/A"
                        } 
                      />
                    </ListItem>
                  </List>

                  <Typography variant="h6" gutterBottom style={{ color: "#004AAC", mt: 3 }}>
                    Address
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <Home color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Country" 
                        secondary={selectedUniversity.address?.country || "N/A"} 
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <LocationCity color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="City" 
                        secondary={selectedUniversity.address?.city || "N/A"} 
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Code color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="ZIP Code" 
                        secondary={selectedUniversity.address?.zipCode || "N/A"} 
                      />
                    </ListItem>
                  </List>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom style={{ color: "#004AAC" }}>
                    Additional Information
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <School color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Institution Type" 
                        secondary={selectedUniversity.institutionType || "N/A"} 
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Star color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Ratings" 
                        secondary={
                          selectedUniversity.ratings?.length > 0 
                            ? selectedUniversity.ratings.join(", ") 
                            : "No ratings yet"
                        } 
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Apps color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Courses" 
                        secondary={
                          selectedUniversity.courses?.length > 0 
                            ? `${selectedUniversity.courses.length} courses` 
                            : "No courses"
                        } 
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <CheckCircle color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Status" 
                        secondary={selectedUniversity.isDeleted ? "Deleted" : "Active"} 
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Event color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Created At" 
                        secondary={new Date(selectedUniversity.createdAt).toLocaleDateString()} 
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Update color="primary" />
                      </ListItemIcon>
                      <ListItemText 
                        primary="Last Updated" 
                        secondary={new Date(selectedUniversity.updatedAt).toLocaleDateString()} 
                      />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </Box>
          ) : (
            <Typography>No university data available</Typography>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UniversityInfo;