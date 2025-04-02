import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
  Paper,
  Avatar,
  Divider,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box
} from '@mui/material';
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  School as SchoolIcon,
  Description as DocumentIcon,
  Flag as NationalityIcon,
  CalendarToday as TimelineIcon,
  Language as LanguageIcon
} from '@mui/icons-material';

const StudentDetail = ({ student, open, onClose }) => {
  if (!student) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center">
          <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
            {student.firstName.charAt(0)}{student.lastName.charAt(0)}
          </Avatar>
          <Typography variant="h6">
            {student.firstName} {student.middleName} {student.lastName}
          </Typography>
        </Box>
      </DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={3}>
          {/* Left Column - Personal Info */}
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ p: 2, mb: 2 }}>
              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                Personal Information
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <EmailIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Email" secondary={student.email} />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <PhoneIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Phone" secondary={student.telephoneNumber} />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <NationalityIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Nationality" secondary={student.countryApplyingFrom} />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <DocumentIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Document Type" 
                    secondary={
                      <Chip 
                        label={student.documentType} 
                        size="small" 
                        color="primary" 
                        variant="outlined" 
                      />
                    } 
                  />
                </ListItem>
              </List>
            </Paper>
          </Grid>

          {/* Right Column - Education Info */}
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ p: 2, mb: 2 }}>
              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                Education Information
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <SchoolIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Recent Education" 
                    secondary={student.mostRecentEducation} 
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemText 
                    primary="Institution" 
                    secondary={student.collegeUniversity} 
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemText 
                    primary="Program Type" 
                    secondary={student.programType} 
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemText 
                    primary="Discipline" 
                    secondary={student.discipline} 
                  />
                </ListItem>
                
                <ListItem>
                  <ListItemIcon>
                    <TimelineIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Course Start Timeline" 
                    secondary={student.courseStartTimeline} 
                  />
                </ListItem>
                
                {student.englishLanguageRequirement === "Yes" && (
                  <ListItem>
                    <ListItemIcon>
                      <LanguageIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText 
                      primary="English Score" 
                      secondary={`IELTS ${student.score}`} 
                    />
                  </ListItem>
                )}
              </List>
            </Paper>
          </Grid>

          {/* Document Preview */}
          {student.documentUpload && student.documentUpload.length > 0 && (
            <Grid item xs={12}>
              <Paper elevation={0} sx={{ p: 2 }}>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                  Document Preview
                </Typography>
                <Divider sx={{ mb: 2 }} />
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                  {student.documentUpload.map((doc, index) => (
                    <Paper key={index} elevation={3} sx={{ p: 1 }}>
                      <img 
                        src={doc} 
                        alt={`Document ${index + 1}`} 
                        style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'contain' }}
                      />
                    </Paper>
                  ))}
                </Box>
              </Paper>
            </Grid>
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StudentDetail;