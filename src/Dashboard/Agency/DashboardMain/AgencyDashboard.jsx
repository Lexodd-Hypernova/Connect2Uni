import React, { useState } from 'react';
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
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box } from '@mui/system';
import LogoutIcon from '@mui/icons-material/Logout';
import Charts from './Charts/Charts';
import AgentInfo from '../Agents/AgentInfo'
import StudentList from '../Student/StudentList';
import StudentApplicationManagement from '../Student/StudentApplicationManagement';
import UniversityInfo from '../University/UniversityInfo';
import UniversityApplicationManagement from '../University/UniversityApplicationManagement';
import AssociateList from '../Associate/AssociateList';
import { useLogout } from '../../../Auth/Logout';

// Example Components to Render
const DashboardContent = () => <Charts />;
const Agentinfo = () => <AgentInfo />
const StudentLists = () => <StudentList /> ;
const StudentApplication_Management = () => <StudentApplicationManagement /> ;
const Universityinfo = () => <UniversityInfo />;
const UniversityApplication_Management = () => <UniversityApplicationManagement />;
const AssociateOption1Content = () => <AssociateList />;

const AgencyDashboard = () => {
  const [expanded, setExpanded] = useState('dashboard'); // 'dashboard' is open by default
  const [selectedComponent, setSelectedComponent] = useState(<DashboardContent />); // Default Content

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleItemClick = (component) => () => {
    setSelectedComponent(component); // Set the selected component to render
  };

  const handleLogout = useLogout();

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar */}
      <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between', // This will push the logout button to the bottom
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box>
          <List>
            <ListItem
              button
              selected={expanded === 'dashboard'}
              onClick={handleItemClick(<DashboardContent />)}
            >
              <ListItemText primary="Dashboard" />
            </ListItem>
          </List>

          <Divider />

          <Accordion
            expanded={expanded === 'agents'}
            onChange={handleAccordionChange('agents')}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <ListItemText primary="Agents" />
            </AccordionSummary>
            <AccordionDetails>
              <List>
                <ListItem button onClick={handleItemClick(<Agentinfo />)}>
                  <ListItemText primary="Agent Info" />
                </ListItem>
                
                <ListItem button onClick={handleItemClick(<div>Application Management</div>)}>
                  <ListItemText primary="Application Management" />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>


          <Accordion
            expanded={expanded === 'student'}
            onChange={handleAccordionChange('student')}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <ListItemText primary="Student" />
            </AccordionSummary>
            <AccordionDetails>
              <List>
                <ListItem button onClick={handleItemClick(<StudentLists />)}>
                  <ListItemText primary="Student Info" />
                </ListItem>
                <ListItem button onClick={handleItemClick(<StudentApplication_Management />)}>
                  <ListItemText primary="Application Management" />
                </ListItem>
                <ListItem button>
                  <ListItemText primary="Option 3" />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === 'university'}
            onChange={handleAccordionChange('university')}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <ListItemText primary="University" />
            </AccordionSummary>
            <AccordionDetails>
              <List>
                <ListItem button onClick={handleItemClick(<Universityinfo />)}>
                  <ListItemText primary="University Info" />
                </ListItem>
                <ListItem button onClick={handleItemClick(<UniversityApplication_Management />)}>
                  <ListItemText primary="Application Management" />
                </ListItem>
                <ListItem button>
                  <ListItemText primary="Option 3" />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>

          <Accordion
            expanded={expanded === 'associate'}
            onChange={handleAccordionChange('associate')}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <ListItemText primary="Associate" />
            </AccordionSummary>
            <AccordionDetails>
              <List>
                <ListItem button onClick={handleItemClick(<AssociateOption1Content />)}>
                  <ListItemText primary="Associate Info" />
                </ListItem>
                <ListItem button>
                  <ListItemText primary="Option 2" />
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
              backgroundColor: '#d32f2f', // Darker red color
              '&:hover': {
                backgroundColor: '#b71c1c', // Even darker on hover
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
          backgroundColor: '#f9f9f9',
          // minHeight: '100vh',
        }}
      >
        {selectedComponent}
      </Box>
    </Box>
  );
};

export default AgencyDashboard;