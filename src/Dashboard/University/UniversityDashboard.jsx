import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Drawer,
  Divider,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box } from "@mui/system";
// import Charts from './Charts/Charts';
// import UniversityProfile from './University/UniversityProfile';
import StudentApplication from './Student/StudentApplication';
import LogoutIcon from "@mui/icons-material/Logout";
import UniversityCourses from "./Courses/UniversityCourses";
import { useLogout } from "../../Auth/Logout";
// import Payments from './Payments/Payments';

// Example Components to Render
const DashboardContent = () => <h1>University Dashboard</h1>;
const UniversityProfileContent = () => <UniversityProfile />;
const StudentApplicationContent = () => <StudentApplication />;
const CoursesContent = () => <UniversityCourses />;
const PaymentsContent = () => <Payments />;

const UniversityDashboard = () => {
  const [expanded, setExpanded] = useState("dashboard"); // 'dashboard' is open by default
  const [selectedComponent, setSelectedComponent] = useState(
    <DashboardContent />
  ); // Default Content

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleItemClick = (component) => () => {
    setSelectedComponent(component); // Set the selected component to render
  };

  const handleLogout = useLogout();

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: 240,
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box sx={{ flexGrow: 1, padding: 2 }}>
          <List>
            <ListItem
              button
              selected={expanded === "dashboard"}
              onClick={handleItemClick(<DashboardContent />)}
            >
              <ListItemText primary="Dashboard" />
            </ListItem>
          </List>

          <Divider />

          <Accordion
            expanded={expanded === "universityProfile"}
            onChange={handleAccordionChange("universityProfile")}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <ListItemText primary="University Profile" />
            </AccordionSummary>
            <AccordionDetails>
              <List>
                <ListItem
                  button
                  onClick={handleItemClick(<UniversityProfileContent />)}
                >
                  <ListItemText primary="Profile Info" />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === "studentApplication"}
            onChange={handleAccordionChange("studentApplication")}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <ListItemText primary="Student Application" />
            </AccordionSummary>
            <AccordionDetails>
              <List>
                <ListItem
                  button
                  onClick={handleItemClick(<StudentApplicationContent />)}
                >
                  <ListItemText primary="Applications" />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === "courses"}
            onChange={handleAccordionChange("courses")}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <ListItemText primary="Courses" />
            </AccordionSummary>
            <AccordionDetails>
              <List>
                <ListItem button onClick={handleItemClick(<CoursesContent />)}>
                  <ListItemText primary="Course Management" />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === "payments"}
            onChange={handleAccordionChange("payments")}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <ListItemText primary="Payments" />
            </AccordionSummary>
            <AccordionDetails>
              <List>
                <ListItem button onClick={handleItemClick(<PaymentsContent />)}>
                  <ListItemText primary="Payment Management" />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
        </Box>

        {/* Logout Button at the bottom */}
        <Box sx={{ p: 2 }}>
          <Button
            variant="contained"
            color="error"
            fullWidth
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{
              mt: 2,
              backgroundColor: "#d32f2f", // Darker red color
              "&:hover": {
                backgroundColor: "#b71c1c", // Even darker on hover
              },
            }}
          >
            Logout
          </Button>
        </Box>
      </Drawer>

      {/* Main Content Area */}
      <Box
        sx={{
          flexGrow: 1,
          padding: 3,
          backgroundColor: "#f9f9f9",
          minHeight: "100vh",
        }}
      >
        {selectedComponent}
      </Box>
    </Box>
  );
};

export default UniversityDashboard;
