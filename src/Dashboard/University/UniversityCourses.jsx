import React, { useState, useEffect } from 'react';
import { Button, Card, CardContent, Typography, Box, Grid, Modal, CircularProgress } from '@mui/material';
import CreateCourseForm from './CreateCourseForm';
import axios from 'axios';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

const base_url = import.meta.env.VITE_API_URL;

const UniversityCourses = () => {
  const [showForm, setShowForm] = useState(false);
  const [courses, setCourses] = useState([]); // State to store fetched courses
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch courses from the API
  useEffect(() => {
    const fetchCourses = async () => {
      const token = Cookies.get('refreshtoken');
      if (!token) {
        toast.error('You are not authenticated. Please log in.');
        return;
      }

      try {
        const response = await axios.get(`${base_url}/university/get/all-courses`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Set the fetched courses to state
        setCourses(response.data.courses);
      } catch (error) {
        console.error('Error fetching courses:', error);
        toast.error('Failed to fetch courses.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Handle form submission for creating a new course
  const handleSubmit = async (newCourse) => {
    const token = Cookies.get('refreshtoken');
    if (!token) {
      toast.error('You are not authenticated. Please log in.');
      return;
    }

    try {
      const response = await axios.post(`${base_url}/university/api/course/create`, newCourse, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Add the new course to the existing list of courses
      setCourses((prev) => [...prev, response.data]);
      toast.success('Course created successfully!');
      setShowForm(false);
    } catch (error) {
      console.error('Error creating course:', error);
      toast.error('Failed to create course.');
    }
  };

  if (loading) {
    return <Box sx={{ textAlign: "center", mt: 4 }}>
              <CircularProgress />
              <Typography variant="h6" sx={{ mt: 2 }}>
                Loading payment details...
              </Typography>
            </Box>
  }

  return (
    <Box sx={{ padding: 3 }}>
      {/* Create Course Button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 3 }}>
        <Button variant="contained" color="primary" onClick={() => setShowForm(true)}>
          Create Course
        </Button>
      </Box>

      {/* Modal for Create Course Form */}
      <Modal open={showForm} onClose={() => setShowForm(false)}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
          <CreateCourseForm
            onCancel={() => setShowForm(false)}
            onSubmit={handleSubmit}
          />
        </Box>
      </Modal>

      {/* Display Courses in Card Form */}
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        Courses
      </Typography>
      <Grid container spacing={3}>
        {courses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course._id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent>
                <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                  {course.name}
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                  Description: {course.description}
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                  Fees: ${course.fees}
                </Typography>
                {/* <Typography variant="body1" sx={{ marginBottom: 1 }}>
                  Ratings: {course.ratings.length > 0 ? course.ratings.join(', ') : 'No ratings yet'}
                </Typography> */}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default UniversityCourses;