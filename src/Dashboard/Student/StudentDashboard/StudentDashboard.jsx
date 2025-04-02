// src/components/StudentDashboard.js
import { Box } from "@mui/material";
import StudentUniversityList from "./StudentUniversityList";
import StudentCourseList from "./StudentCourseList";

const StudentDashboard = () => {
  return (
    <Box sx={{ p: 3 }}>
      <StudentUniversityList />
      <Box sx={{ mt: 4 }}>
        <StudentCourseList />
      </Box>
    </Box>
  );
};

export default StudentDashboard;