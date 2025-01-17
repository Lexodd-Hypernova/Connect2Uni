import React from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import * as XLSX from 'xlsx';

const StudentInfo = () => {
  // Dummy data for the table
  const rows = [
    { name: 'John Doe', id: 'S001', gender: 'Male', dob: '1995-06-15', phone: '1234567890' },
    { name: 'Jane Smith', id: 'S002', gender: 'Female', dob: '1996-04-10', phone: '9876543210' },
    { name: 'Alice Johnson', id: 'S003', gender: 'Female', dob: '1998-01-22', phone: '4561237890' },
    { name: 'Michael Brown', id: 'S004', gender: 'Male', dob: '1994-12-05', phone: '7891234560' },
  ];

  // Function to export data to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(rows); // Convert rows to Excel sheet
    const workbook = XLSX.utils.book_new(); // Create a new workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Student Info'); // Append sheet to workbook
    XLSX.writeFile(workbook, 'StudentInfo.xlsx'); // Save as file
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Student Information</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>DOB</TableCell>
              <TableCell>Phone Number</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.gender}</TableCell>
                <TableCell>{row.dob}</TableCell>
                <TableCell>{row.phone}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        variant="contained"
        color="primary"
        style={{ marginTop: '20px' }}
        onClick={exportToExcel}
      >
        Export Data
      </Button>
    </div>
  );
};

export default StudentInfo;
