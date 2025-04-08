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
  Tabs,
  Tab,
  MenuItem,
  Select,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Avatar,
  Chip,
  IconButton,
  Box,
  Divider,
  CircularProgress,
} from "@mui/material";
import * as XLSX from "xlsx";
import axios from "axios";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Cake as CakeIcon,
  School as SchoolIcon,
  LocationOn as LocationIcon,
  Description as DescriptionIcon,
  Event as EventIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  HourglassEmpty as HourglassIcon,
  ExitToApp as WithdrawnIcon,
  ArrowBack as BackIcon,
  CloudDownload as DownloadIcon,
  Info as InfoIcon,
  EmojiPeopleOutlined,
  ContactPage,
} from "@mui/icons-material";

const base_url = import.meta.env.VITE_API_URL;
const token = Cookies.get("refreshtoken");

const statusIcons = {
  Processing: <HourglassIcon color="warning" />,
  Accepted: <CheckCircleIcon color="success" />,
  Rejected: <CancelIcon color="error" />,
  Withdrawn: <WithdrawnIcon color="action" />,
};

const statusColors = {
  Processing: "#FFA500",
  Accepted: "#4CAF50",
  Rejected: "#F44336",
  Withdrawn: "#9E9E9E",
};

const StudentApplicationManagement = () => {
  const [activeTab, setActiveTab] = useState(1); // Default to Pending tab
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchPendingApplications();
  }, []);

  const fetchPendingApplications = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${base_url}/agency/pending-applications`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const formattedApps = response.data.pendingApplications.map((app) => ({
        ...app,
        id: app.applicationId,
        name: app.student.name,
        email: app.student.email,
        course: app.course,
        university: app.university,
        status: app.status,
        submissionDate: app.submissionDate,
      }));

      setApplications(formattedApps);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching pending applications:", error);
      setLoading(false);
    }
  };

  const fetchApplicationDetails = async (applicationId) => {
    try {
      const response = await axios.get(
        `${base_url}/agency/get/application/${applicationId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      return response.data.application;
    } catch (error) {
      console.error("Error fetching application details:", error);
      return null;
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    if (newValue === 1) {
      fetchPendingApplications();
    }
  };

  const handleAcceptApplication = async (applicationId) => {
    try {
      setActionLoading(true);
      const response = await axios.post(
        `${base_url}/agency/application/send/${applicationId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Update the application status locally
      setApplications((prev) =>
        prev.map((app) =>
          app.id === applicationId ? { ...app, status: "Accepted" } : app
        )
      );

      // Close the dialog and refresh applications
      setOpenDialog(false);
      toast.success(response.message);
      fetchPendingApplications();
    } catch (error) {
      console.error("Error accepting application:", error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleRejectApplication = async (applicationId) => {
    try {
      setActionLoading(true);
      const response = await axios.put(
        `${base_url}/agency/reject-application/${applicationId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Update the application status locally
      setApplications((prev) =>
        prev.map((app) =>
          app.id === applicationId ? { ...app, status: "Rejected" } : app
        )
      );

      // Close the dialog and refresh applications
      setOpenDialog(false);
      toast.success(response.message);
      fetchPendingApplications();
    } catch (error) {
      console.error("Error rejecting application:", error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleViewDetails = async (applicationId) => {
    const details = await fetchApplicationDetails(applicationId);
    setSelectedApplication(details);
    setOpenDialog(true);
  };

  const exportToCSV = () => {
    const filteredApplications = applications.filter((app) => {
      if (activeTab === 0) return true;
      if (activeTab === 1) return app.status === "Processing";
      if (activeTab === 2) return app.status === "Accepted";
      if (activeTab === 3) return app.status === "Rejected";
      if (activeTab === 4) return app.status === "Withdrawn";
      return false;
    });

    const worksheet = XLSX.utils.json_to_sheet(filteredApplications);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Applications");
    XLSX.writeFile(workbook, "StudentApplications.csv");
  };

  const filteredApplications = applications.filter((app) => {
    if (activeTab === 0) return true;
    if (activeTab === 1) return app.status === "Processing";
    return false;
  });

  const formatDate = (dateString) => {
    if (!dateString || dateString === "Not reviewed yet") return dateString;
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  

  return (
    <div style={{ padding: "20px" }}>
      {actionLoading && (
        <Box
          position="fixed"
          top={0}
          left={0}
          right={0}
          bottom={0}
          display="flex"
          justifyContent="center"
          alignItems="center"
          bgcolor="rgba(0,0,0,0.5)"
          zIndex={9999}
        >
          <CircularProgress size={80} color="primary" />
        </Box>
      )}

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" component="h2" fontWeight="bold">
          Student Application Management
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<DownloadIcon />}
          onClick={exportToCSV}
          disabled={filteredApplications.length === 0}
        >
          Export Data
        </Button>
      </Box>

      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label="All Applications" />
        <Tab label="Pending Applications" />
        <Tab label="Accepted Applications" disabled />
        <Tab label="Rejected Applications" disabled />
        <Tab label="Withdrawn Applications" disabled />
      </Tabs>

      <TableContainer
        component={Paper}
        style={{ marginTop: "20px", minHeight: "400px" }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell sx={{ fontWeight: "bold" }}>Student</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>University</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Course</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Submission Date</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                  Loading applications...
                </TableCell>
              </TableRow>
            ) : filteredApplications.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                  No applications found
                </TableCell>
              </TableRow>
            ) : (
              filteredApplications.map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <Avatar sx={{ mr: 2, bgcolor: "primary.main" }}>
                        {row.name.charAt(0)}
                      </Avatar>
                      {row.name}
                    </Box>
                  </TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.university}</TableCell>
                  <TableCell>{row.course}</TableCell>
                  <TableCell>{formatDate(row.submissionDate)}</TableCell>
                  <TableCell>
                    <Chip
                      icon={statusIcons[row.status] || <InfoIcon />}
                      label={row.status}
                      style={{
                        backgroundColor: statusColors[row.status] + "20",
                        color: statusColors[row.status],
                        border: `1px solid ${statusColors[row.status]}`,
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Box display="flex">
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleViewDetails(row.id)}
                        startIcon={<InfoIcon />}
                      >
                        Details
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Application Details Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        fullWidth
        maxWidth="md"
      >
        {selectedApplication && (
          <>
            <DialogTitle>
              <Box display="flex" alignItems="center">
                <IconButton onClick={() => setOpenDialog(false)} sx={{ mr: 1 }}>
                  <BackIcon />
                </IconButton>
                <Typography variant="h6">
                  Application Details: {selectedApplication.student.firstName}{" "}
                  {selectedApplication.student.lastName}
                </Typography>
              </Box>
            </DialogTitle>
            <DialogContent dividers>
              <Box mb={3}>
                <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                  <PersonIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                  Personal Information
                </Typography>
                <Box pl={4} mt={1}>
                  <Typography>
                    <ContactPage
                      sx={{
                        mr: 1,
                        fontSize: "1rem",
                        verticalAlign: "middle",
                      }}
                    />
                    Full Name :
                    <strong>
                      {" "}
                      {selectedApplication.student.firstName}{" "}
                      {selectedApplication.student.middleName}{" "}
                      {selectedApplication.student.lastName}
                    </strong>{" "}
                  </Typography>
                  <Typography>
                    <EmailIcon
                      sx={{
                        mr: 1,
                        fontSize: "1rem",
                        verticalAlign: "middle",
                      }}
                    />
                    Email :<strong> {selectedApplication.student.email}</strong>{" "}
                  </Typography>
                  <Typography>
                    <PhoneIcon
                      sx={{
                        mr: 1,
                        fontSize: "1rem",
                        verticalAlign: "middle",
                      }}
                    />{" "}
                    Phone Number :
                    <strong>
                      {" "}
                      {selectedApplication.student.countryCode}{" "}
                      {selectedApplication.student.telephoneNumber}
                    </strong>{" "}
                  </Typography>
                  <Typography>
                    <CakeIcon
                      sx={{
                        mr: 1,
                        fontSize: "1rem",
                        verticalAlign: "middle",
                      }}
                    />
                    Date of Birth:
                    <strong>
                      {" "}
                      {formatDate(selectedApplication.student.dateOfBirth)}
                    </strong>{" "}
                  </Typography>
                  <Typography>
                    <EmojiPeopleOutlined
                      sx={{
                        mr: 1,
                        fontSize: "1rem",
                        verticalAlign: "middle",
                      }}
                    />
                    Gender :
                    <strong> {selectedApplication.student.gender}</strong>{" "}
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box mb={3}>
                <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                  <LocationIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                  Address
                </Typography>
                <Box pl={4} mt={1}>
                  <Typography>
                    {selectedApplication.student.address.addressLine}
                  </Typography>
                  <Typography>
                    {selectedApplication.student.address.city},{" "}
                    {selectedApplication.student.address.state_province_region}
                  </Typography>
                  <Typography>
                    {selectedApplication.student.address.country} -{" "}
                    {selectedApplication.student.address.zip_postalCode}
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box mb={3}>
                <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                  <SchoolIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                  Education & Application Details
                </Typography>
                <Box pl={4} mt={1}>
                  <Typography>
                    Most Recent Education:
                    <strong>
                      {" "}
                      {selectedApplication.student.mostRecentEducation}
                    </strong>{" "}
                  </Typography>
                  <Typography>
                    Previous Course:
                    <strong>
                      {" "}
                      {selectedApplication.student.courseName}
                    </strong>{" "}
                  </Typography>
                  <Typography>
                    Previous Institution:
                    <strong>
                      {" "}
                      {selectedApplication.student.collegeUniversity}
                    </strong>{" "}
                  </Typography>

                  <Typography>
                    {selectedApplication.grades}:
                    <strong> {selectedApplication.marks}</strong>{" "}
                  </Typography>

                  <Typography>
                    Applying to:
                    <strong> {selectedApplication.university.name}</strong>{" "}
                  </Typography>
                  <Typography>
                    Course: <strong>{selectedApplication.course.name} </strong>
                  </Typography>
                  <Typography>
                    Course Fees:
                    <strong> {selectedApplication.course.fees} GBP</strong>{" "}
                  </Typography>
                  <Typography>
                    Financial Aid Needed:
                    <strong> {selectedApplication.financialAid}</strong>{" "}
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box mb={3}>
                <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                  <EventIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                  Application Timeline
                </Typography>
                <Box pl={4} mt={1}>
                  <Typography>
                    <strong>Submission Date:</strong>{" "}
                    {formatDate(selectedApplication.submissionDate)}
                  </Typography>
                  <Typography>
                    <strong>Review Date:</strong>{" "}
                    {formatDate(selectedApplication.reviewDate)}
                  </Typography>
                  <Typography>
                    <strong>Status:</strong>
                    <Chip
                      icon={
                        statusIcons[selectedApplication.status] || <InfoIcon />
                      }
                      label={selectedApplication.status}
                      style={{
                        backgroundColor:
                          statusColors[selectedApplication.status] + "20",
                        color: statusColors[selectedApplication.status],
                        border: `1px solid ${
                          statusColors[selectedApplication.status]
                        }`,
                        marginLeft: "8px",
                      }}
                    />
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box>
                <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                  <DescriptionIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                  Documents
                </Typography>

                <Box pl={4} mt={1}>
                  {selectedApplication.latestdegreeCertificates &&
                  selectedApplication.latestdegreeCertificates?.length >
                    0 ? (
                    selectedApplication.latestdegreeCertificates.map(
                      (doc, index) => (
                        <Typography key={index}>
                          <a
                            href={doc}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Latest Degree Certificate
                          </a>
                        </Typography>
                      )
                    )
                  ) : (
                    <Typography>
                      User has not uploaded degree certificate.
                    </Typography>
                  )}
                </Box>

                <Box pl={4} mt={1}>
                  {selectedApplication.student.documentUpload &&
                  selectedApplication.student.documentUpload?.length > 0 ? (
                    selectedApplication.student.documentUpload.map(
                      (doc, index) => (
                        <Typography key={index}>
                          <a
                            href={doc}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Passport {index + 1}
                          </a>
                        </Typography>
                      )
                    )
                  ) : (
                    <Typography>Passport not uploaded by user.</Typography>
                  )}
                </Box>

                <Box pl={4} mt={1}>
                  {selectedApplication.student.document &&
                  selectedApplication.student.document?.length > 0 ? (
                    selectedApplication.student.document.map((doc, index) => (
                      <Typography key={index}>
                        <a href={doc} target="_blank" rel="noopener noreferrer">
                          {selectedApplication.student?.testName} :{" "}
                          {selectedApplication.student?.score}
                        </a>
                      </Typography>
                    ))
                  ) : (
                    <Typography>English Language Test Doc not uploaded by user.</Typography>
                  )}
                </Box>

                <Box pl={4} mt={1}>
                  {selectedApplication.proofOfAddress &&
                  selectedApplication.proofOfAddress?.length > 0 ? (
                    selectedApplication.proofOfAddress.map(
                      (doc, index) => (
                        <Typography key={index}>
                          <a
                            href={doc}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Proof of Address
                          </a>
                        </Typography>
                      )
                    )
                  ) : (
                    <Typography>Proof of Address not uploaded by user.</Typography>
                  )}
                </Box>

              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)}>Close</Button>
              {selectedApplication.status === "Processing" && (
                <>
                  <Button
                    variant="contained"
                    color="success"
                    startIcon={<CheckCircleIcon />}
                    onClick={() =>
                      handleAcceptApplication(selectedApplication.applicationId)
                    }
                    disabled={actionLoading}
                  >
                    Accept
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<CancelIcon />}
                    onClick={() =>
                      handleRejectApplication(selectedApplication.applicationId)
                    }
                    disabled={actionLoading}
                  >
                    Reject
                  </Button>
                </>
              )}
            </DialogActions>
          </>
        )}
        <Toaster position="top-center" reverseOrder={false} />
      </Dialog>
    </div>
  );
};

export default StudentApplicationManagement;
