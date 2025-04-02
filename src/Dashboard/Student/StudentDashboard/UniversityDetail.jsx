import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Box, Button, Typography, Card, CardContent, CardMedia, CircularProgress, Grid } from "@mui/material";
import Cookies from 'js-cookie';
import React from "react";

const UniversityDetail = () => {
  const [university, setUniversity] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  const { id } = useParams();
  const base_url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const token = Cookies.get('refreshtoken');

        // Fetch university details
        const universityResponse = await axios.get(`${base_url}/student/api/universities/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUniversity(universityResponse.data.university);

        // Fetch courses
        const coursesResponse = await axios.get(`${base_url}/student/courses/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCourses(coursesResponse.data.coursesList || []);

      } catch (err) {
        setError(err.response || { message: "An error occurred while fetching data." });
        console.error("API Error:", err.response);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  const handleCourseClick = (courseId) => {
    navigate(`/student/course/${courseId}`);
  };

  const circleColors = ["#004AAD", "#005B1A"];

  return (
    <Box sx={{ p: 3 }}>
      {university && (
        <Card>
          <CardMedia
            component="img"
            height="140"
            image={university.bannerImage[0]}
            alt={university.name}
          />
          <CardContent>
            <Typography variant="h4">{university.name}</Typography>
            <Typography variant="body1">Email: {university.email}</Typography>
            <Typography variant="body1">Website: {university.website}</Typography>
            <Typography variant="body1">Phone: {university.phoneNumber}</Typography>
            <Typography variant="body1">Type: {university.institutionType}</Typography>
            <Typography variant="body1">
              Rating: {university.ratings.length > 0 ? university.ratings[0] : 'No ratings yet'}
            </Typography>
          </CardContent>
        </Card>
      )}

      <Typography variant="h5" sx={{ mt: 4, mb: 2, textAlign: "center" }}>
        Our Courses
      </Typography>

      {courses.length > 0 ? (
        <Grid container spacing={2}>
          {courses.map((course, index) => {
            const circleColor = circleColors[index % 2]; // Alternate colors

            return (
              <Grid item xs={12} sm={6} md={4} key={course._id} sx={{ position: "relative" }}>
                <Card sx={{
                  borderRadius: '5px',
                  background: '#fff',
                  boxShadow: '4px 4px 4px 0px rgba(0, 0, 0, 0.25)',
                  position: "relative",
                  overflow: "hidden"
                }}>
                  {/* Number Circle */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: "-10px",
                      right: "-10px",
                      width: "70px",
                      height: "70px",
                      borderRadius: "50%",
                      backgroundColor: circleColor,
                      color: "#fff",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontWeight: "bold",
                      fontFamily: "Poppins",
                      fontSize: "22px",
                      boxShadow: "2px 2px 4px rgba(0,0,0,0.2)",
                      clipPath: "inset(0px 0px -20px -20px)"
                    }}
                  >
                    {index + 1}
                  </Box>

                  <CardMedia
                    component="img"
                    height="140"
                    image={course.courseImage[0]}
                    alt={course.name}
                  />
                  <CardContent>
                    <Typography variant="h3">{course.name}</Typography>
                    <Typography variant="body2">{course.description}</Typography>
                    <Typography variant="body2">Duration: {course.courseDuration}</Typography>
                    <Typography variant="body2">Fees: ${course.fees}</Typography>
                    <Typography variant="body2">Status: {course.status}</Typography>
                    <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
                    <Button
                      variant="outlined"
                      onClick={() => handleCourseClick(course._id)}
                      sx={{
                        mt: 2,
                        borderRadius: "18px",
                        borderColor: "#004AAC",
                        backgroundColor: "#004AAC",
                        color: "#FFFFFF",
                        "&:hover": {
                          backgroundColor: "#003B82",
                          color: "#fff",
                        },
                      }}
                    >
                      More Info
                    </Button>
                  </Box>

                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <Typography variant="h6" color="error" sx={{ textAlign: "center", mt: 2 }}>
          This university does not have any courses.
        </Typography>
      )}
    </Box>
  );
};

export default React.memo(UniversityDetail);
