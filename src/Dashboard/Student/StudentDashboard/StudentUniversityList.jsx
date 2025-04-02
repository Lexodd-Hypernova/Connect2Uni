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
} from "@mui/material";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";

const StudentUniversityList = () => {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const base_url = import.meta.env.VITE_API_URL;
  const { platform_access, payment_prompt } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (platform_access === null || platform_access === undefined) return; // Prevent unnecessary renders

    const token = Cookies.get("refreshtoken");
    if (!token) {
      alert("You are not authenticated. Please log in.");
      return;
    }

    if (platform_access.payment_required) {
      navigate("/payment/platform-fee");
      return;
    }

    const fetchUniversities = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${base_url}/student/get/universities`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUniversities(response.data.universities);

        setError(null);
      } catch (err) {
        setError(err.response);
        console.error("API Error:", err.response);
      } finally {
        setLoading(false);
      }
    };

    fetchUniversities();
  }, [platform_access, navigate]);

  // If API returned a 403, restrict access
  if (error?.status === 403) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h6" color="error">
          {error.data?.message || "Access Denied"}{" "}
          {/* ✅ Use API's error message */}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={() => navigate("/payment/platform-fee")} // ✅ Redirect to payment page
        >
          Complete Payment
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ p:1 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Typography variant="h4" sx={{ fontSize: "50px" }}>
          Universities
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
        {universities.map((university, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              sx={{
                borderRadius: "5px",
                background: "#fff",
                boxShadow: "4px 4px 4px 0px rgba(0, 0, 0, 0.25)",
              }}
            >
              <CardMedia
                component="img"
                height="140"
                image={university.bannerImage[0]}
                alt={university.name}
              />
              <CardContent>
                <Typography variant="h6">{university.name}</Typography>
                <Typography variant="body2">
                  Rating:{" "}
                  {university.ratings.length > 0
                    ? university.ratings[0]
                    : "No ratings yet"}
                </Typography>

                {/* More Info Button */}
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
                    navigate(`/student/dashboard/university/${university._id}`);
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

export default StudentUniversityList;
