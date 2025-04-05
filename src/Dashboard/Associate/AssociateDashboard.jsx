
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
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box } from '@mui/system';
import ApplicationStats from './ApplicationStats';
import SolicitorInfo from './SolicitorInfo';

// Example Components to Render
const DashboardContent = () => <ApplicationStats />;
const Soliciorinfo = () =>  <SolicitorInfo />;
const StudentLists = () =>  <h1>3</h1>;
const StudentApplication_Management = () =>  <h1>4</h1>;
const Universityinfo = () =>  <h1>5</h1>;
const UniversityApplication_Management = () =>  <h1>6</h1>;
const AssociateOption1Content = () => <h1>7</h1>;

const AssociateDashboard = () => {
  const [expanded, setExpanded] = useState('dashboard'); // 'dashboard' is open by default
  const [selectedComponent, setSelectedComponent] = useState(<DashboardContent />); // Default Content

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleItemClick = (component) => () => {
    setSelectedComponent(component); // Set the selected component to render
  };

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
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Box sx={{ width: '100%', padding: '16px 0px' }}>
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
              <ListItemText primary="Solicitor" />
            </AccordionSummary>
            <AccordionDetails>
              <List>
                <ListItem button onClick={handleItemClick(<Soliciorinfo />)}>
                  <ListItemText primary="Solicitor Info" />
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
      </Drawer>

      {/* Main Content Area */}
      <Box
        sx={{
          flexGrow: 1,
          padding: 3,
          backgroundColor: '#f9f9f9',
        }}
      >
        {selectedComponent}
      </Box>
    </Box>
  );
};

export default AssociateDashboard;
