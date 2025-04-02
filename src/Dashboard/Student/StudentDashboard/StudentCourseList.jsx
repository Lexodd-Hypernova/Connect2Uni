import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
} from "@mui/material";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";

const StudentCourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const base_url = import.meta.env.VITE_API_URL;
  const { platform_access, payment_prompt } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (platform_access === null || platform_access === undefined) return;

    const token = Cookies.get("refreshtoken");
    if (!token) {
      alert("You are not authenticated. Please log in.");
      return;
    }

    if (platform_access.payment_required) {
      navigate("/payment/platform-fee");
      return;
    }

    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${base_url}/student/filters/course`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCourses(response.data.coursesList);
        
        setError(null);
      } catch (err) {
        setError(err.response);
        console.error("API Error:", err.response);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [platform_access, navigate]);

  if (error?.status === 403) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h6" color="error">
          {error.data?.message || "Access Denied"}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={() => navigate("/payment/platform-fee")}
        >
          Complete Payment
        </Button>
      </Box>
    );
  }

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 1 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Typography variant="h4" sx={{ fontSize: "50px" }}>
          Courses
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexGrow: 1,
            justifyContent: "flex-end",
          }}
        >
          <Box
            sx={{
              height: "1px",
              backgroundColor: "#C7C7C7",
              flexGrow: 1,
              mx: 2,
            }}
          />

          <Button
            variant="contained"
            sx={{
              backgroundColor: "#004AAC",
              borderRadius: "25px",
              fontSize: "18px",
              color: "white",
              "&:hover": {
                backgroundColor: "#003A8C",
              },
            }}
          >
            View all
          </Button>
        </Box>
      </Box>

      <Box sx={{p:6}}>
      <Grid container spacing={3}>
        {courses.map((course, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                borderRadius: "5px",
                background: "#fff",
                boxShadow: "4px 4px 4px 0px rgba(0, 0, 0, 0.25)",
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image={course.courseImage[0]}
                alt={course.name}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6">{course.name}</Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  <strong>University:</strong> {course.university.name}
                </Typography>
                <Typography variant="body2">
                  <strong>Country:</strong> {course.university.address.country}
                </Typography>
                <Typography variant="body2">
                  <strong>Course Type:</strong> {course.courseType}
                </Typography>
                <Typography variant="body2">
                  <strong>Duration:</strong> {course.courseDuration} days
                </Typography>
                <Typography variant="body2">
                  <strong>Fees:</strong> ${course.fees}
                </Typography>

                <Button
                  variant="outlined"
                  sx={{
                    cursor: "pointer",
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
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/student/course/${course._id}`)
                  }}
                >
                  More Info
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      </Box>
    </Box>
  );
};

export default StudentCourseList;
