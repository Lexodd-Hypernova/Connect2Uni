import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  InputAdornment,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Cookies from "js-cookie";
import * as XLSX from "xlsx";
import StudentDetail from "./StudentDetail"; // Import the new component

const StudentList = () => {
  const base_url = import.meta.env.VITE_API_URL;
  const token = Cookies.get("refreshtoken");
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${base_url}/agency/students`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setStudents(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Handle row click
  const handleRowClick = (studentId) => {
    const student = students.find(s => s._id === studentId);
    setSelectedStudent(student);
    setDetailOpen(true);
  };

  // Transform the data to the desired format
  const transformedData = students.map((student) => ({
    id: student._id, // Include the ID for row click
    name: `${student.firstName} ${student.middleName || ""} ${student.lastName}`,
    email: student.email,
    nationality: student.countryApplyingFrom,
    phone: `${student.countryCode}-${student.telephoneNumber}`,
    preferred_University: student.preferredUniversity,
  }));

  // Filter data based on search term
  const filteredData = transformedData.filter((student) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      student.name?.toLowerCase().includes(searchLower) ||
      student.email?.toLowerCase().includes(searchLower) ||
      student.nationality?.toLowerCase().includes(searchLower) ||
      student.phone?.toLowerCase().includes(searchLower) ||
      student.preferred_University?.toLowerCase().includes(searchLower)
    );
  });

  // Function to export data to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Student Info");
    XLSX.writeFile(workbook, "StudentList.xlsx");
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* Header and Search Input */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginBottom="20px"
      >
        <h2>Student Information</h2>
        <TextField
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          style={{ width: "300px" }}
        />
      </Box>

      {/* Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Nationality</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Preferred University</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row, index) => (
              <TableRow 
                key={index}
                hover
                onClick={() => handleRowClick(row.id)}
                style={{ cursor: 'pointer' }}
              >
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.nationality}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>{row.preferred_University}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Export Button */}
      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: "20px" }}
        onClick={exportToExcel}
      >
        Export Data
      </Button>

      {/* Student Detail Dialog */}
      <StudentDetail 
        student={selectedStudent} 
        open={detailOpen} 
        onClose={() => setDetailOpen(false)} 
      />
    </div>
  );
};

export default StudentList;