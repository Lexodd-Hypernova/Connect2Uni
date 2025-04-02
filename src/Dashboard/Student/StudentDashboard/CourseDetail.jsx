import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  CardMedia,
  CircularProgress,
  Grid,
  Button,
  Modal,
  TextField,
  Stepper,
  Step,
  StepLabel,
  IconButton,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Close, ArrowBack } from "@mui/icons-material"; // Import the close icon
import toast from "react-hot-toast";
import Cookies from "js-cookie";

const CourseDetail = () => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [formLoading, setFormLoading] = useState(false);
  const [degreeCertificate, setDegreeCertificate] = useState(null);
  const [languageCertificate, setLanguageCertificate] = useState(null);
  const [proofOfAddress, setProofOfAddress] = useState(null);
  // State
  const [studentDetails, setStudentDetails] = useState({
    // ... other fields
    gradeType: "",
    cgpa: "",
    percentage: "",
  });

  const [errors, setErrors] = useState({
    gradeType: "",
    cgpa: "",
    percentage: "",
    degreeCertificate: "",
  });

  // Handlers
  const handleGradeTypeChange = (type) => {
    setStudentDetails({
      ...studentDetails,
      gradeType: type,
      cgpa: type === "CGPA" ? studentDetails.cgpa : "",
      percentage: type === "Percentage" ? studentDetails.percentage : "",
    });
    setErrors({
      ...errors,
      gradeType: "",
      cgpa: "",
      percentage: "",
    });
  };

  const handleInputChange = (field, value) => {
    setStudentDetails({
      ...studentDetails,
      [field]: value,
    });
    setErrors({
      ...errors,
      [field]: "",
    });
  };

  // Validation function (call this before proceeding to next step)
  const validateStep2 = () => {
    const newErrors = {};

    if (!studentDetails.gradeType) {
      newErrors.gradeType = "Please select grade type";
    }

    if (studentDetails.gradeType === "CGPA" && !studentDetails.cgpa) {
      newErrors.cgpa = "Please enter your CGPA";
    }

    if (
      studentDetails.gradeType === "Percentage" &&
      !studentDetails.percentage
    ) {
      newErrors.percentage = "Please enter your percentage";
    }

    if (!degreeCertificate) {
      newErrors.degreeCertificate = "Please upload your degree certificate";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const { courseId } = useParams();
  const base_url = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        setLoading(true);
        const token = Cookies.get("refreshtoken");
        const response = await axios.get(
          `${base_url}/student/course/${courseId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCourse(response.data.Course_Details);
      } catch (err) {
        setError(
          err.response || {
            message: "An error occurred while fetching course details.",
          }
        );
      } finally {
        setLoading(false);
      }
    };
    fetchCourseDetails();
  }, [courseId]);

  const handleApplyNow = async () => {
    setOpen(true);
    setFormLoading(true);
    try {
      const token = Cookies.get("refreshtoken");
      const response = await axios.get(
        `${base_url}/student/application/getStudentDetailsForApplication`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setStudentDetails(response.data.student);
    } catch (error) {
      console.error("Error fetching student details:", error);
    } finally {
      setFormLoading(false);
    }
  };

  const handleFileUpload = (setFile) => (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
    }
  };

  const handleRemoveFile = (setFile) => () => {
    setFile(null);
  };

  const handleSubmitApplication = async () => {
    try {
      setFormLoading(true);

      // Validate the form before submission
      if (activeStep === 2 && !validateStep2()) {
        return;
      }

      const formData = new FormData();

      // Add the required fields to formData
      formData.append("grades", studentDetails.gradeType);
      formData.append(
        "marks",
        studentDetails.gradeType === "CGPA"
          ? studentDetails.cgpa
          : studentDetails.percentage
      );

      // Append files if they exist
      if (degreeCertificate) {
        formData.append("latestdegreeCertificates", degreeCertificate);
      }
      if (languageCertificate) {
        formData.append("englishTest", languageCertificate);
      }
      if (proofOfAddress) {
        formData.append("proofOfAddress", proofOfAddress);
      }

      const token = Cookies.get("refreshtoken");
      const response = await axios.post(
        `${base_url}/student/application/${courseId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Show success toast
      toast.success("Application submitted successfully!");

      // Close the modal after successful submission
      handleClose();
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error(
        error.response?.data?.message || "Failed to submit application"
      );
    } finally {
      setFormLoading(false);
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" color="error">
          Error: {error.message}
        </Typography>
      </Box>
    );
  }

  const steps = ["Personal Details", "Address", "Education", "Documents"];

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);
  const handleClose = () => {
    setOpen(false);
    setActiveStep(0);
    setDegreeCertificate(null);
    setLanguageCertificate(null);
    setProofOfAddress(null);
  };

  return (
    <Box sx={{ p: 3 }}>
      {course && (
        <Box>
          <CardMedia
            component="img"
            height="300"
            image={
              course.courseImage && course.courseImage[0]
                ? course.courseImage[0]
                : "https://via.placeholder.com/300"
            }
            alt={course.name}
            sx={{ borderRadius: 2, mb: 3 }}
          />

          <Grid
            container
            alignItems="center"
            justifyContent="space-between"
            sx={{ mb: 2 }}
          >
            <Grid item>
              <Typography variant="h2">{course.name}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="h6">Fees: ${course.fees}</Typography>
            </Grid>
          </Grid>

          <Box sx={{ mb: 3 }}>
            <Typography variant="body1">Type: {course.courseType}</Typography>
            <Typography variant="body1">
              Expiry Date: {new Date(course.expiryDate).toLocaleDateString()}
            </Typography>
          </Box>

          <Grid
            container
            alignItems="center"
            justifyContent="space-between"
            sx={{ mb: 2 }}
          >
            <Grid item>
              <Box
                sx={{
                  backgroundColor: "#004AAC",
                  color: "#ffffff",
                  borderRadius: 5,
                  p: 2,
                  display: "inline-block",
                }}
              >
                <Typography variant="h6">Description</Typography>
              </Box>
            </Grid>
            <Grid item>
              <Button
                onClick={handleApplyNow}
                variant="contained"
                sx={{
                  backgroundColor: "#004AAC",
                  color: "#ffffff",
                  borderRadius: 5,
                  p: 2,
                  textTransform: "none",
                  fontSize: "1rem",
                  "&:hover": { backgroundColor: "#003882" },
                }}
              >
                Apply Now
              </Button>
            </Grid>
          </Grid>

          <Typography
            variant="body1"
            sx={{
              color: "#000000",
              fontFamily: "Poppins",
              fontSize: "30px",
              mb: 3,
            }}
          >
            {course.description}
          </Typography>
        </Box>
      )}

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            width: 500,
            p: 3,
            backgroundColor: "white",
            borderRadius: 2,
            mx: "auto",
            mt: 5,
          }}
        >
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label, index) => (
              <Step key={index}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {formLoading ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "200px",
              }}
            >
              <CircularProgress />
            </Box>
          ) : (
            studentDetails && (
              <Box sx={{ mt: 3 }}>
                {activeStep === 0 && (
                  <Box>
                    <Typography>
                      Name:{" "}
                      {`${studentDetails.firstName} ${studentDetails.middleName} ${studentDetails.lastName}`}
                    </Typography>
                    <Typography>Email: {studentDetails.email}</Typography>
                    <Typography>
                      Phone:{" "}
                      {`${studentDetails.countryCode}-${studentDetails.telephoneNumber}`}
                    </Typography>
                    <Typography>Gender: {studentDetails.gender}</Typography>
                    <Typography>
                      Date of Birth:{" "}
                      {new Date(
                        studentDetails.dateOfBirth
                      ).toLocaleDateString()}
                    </Typography>
                  </Box>
                )}
                {activeStep === 1 && (
                  <Box>
                    <Typography>
                      Country : {`${studentDetails.address.country}`}
                    </Typography>
                    <Typography>
                      State/Province/Region :{" "}
                      {`${studentDetails.address.state_province_region}`}
                    </Typography>
                    <Typography>
                      City : {`${studentDetails.address.city}`}
                    </Typography>
                    <Typography>
                      Zip Code : {`${studentDetails.address.zip_postalCode}`}
                    </Typography>
                    <Typography>
                      Address-line : {`${studentDetails.address.addressLine}`}
                    </Typography>
                  </Box>
                )}
                {activeStep === 2 && (
                  <Box>
                    <Typography>
                      Most Recent Education:{" "}
                      {studentDetails.mostRecentEducation}
                    </Typography>
                    <Typography>
                      Specialization: {studentDetails.courseName}
                    </Typography>

                    {/* Grades Section */}
                    <Typography sx={{ mt: 2 }}>Grades You Scored *</Typography>

                    {/* Grade Type Selection */}
                    <FormControl error={errors.gradeType !== undefined}>
                      <FormGroup row>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={studentDetails.gradeType === "CGPA"}
                              onChange={() => handleGradeTypeChange("CGPA")}
                            />
                          }
                          label="CGPA"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={
                                studentDetails.gradeType === "Percentage"
                              }
                              onChange={() =>
                                handleGradeTypeChange("Percentage")
                              }
                            />
                          }
                          label="Percentage"
                        />
                      </FormGroup>
                      {errors.gradeType && (
                        <FormHelperText>{errors.gradeType}</FormHelperText>
                      )}
                    </FormControl>

                    {/* CGPA Input */}
                    {studentDetails.gradeType === "CGPA" && (
                      <TextField
                        fullWidth
                        label="Enter CGPA *"
                        value={studentDetails.cgpa || ""}
                        onChange={(e) =>
                          handleInputChange("cgpa", e.target.value)
                        }
                        // error={errors.cgpa !== undefined}
                        helperText={errors.cgpa}
                        sx={{ mt: 2 }}
                      />
                    )}

                    {/* Percentage Input */}
                    {studentDetails.gradeType === "Percentage" && (
                      <TextField
                        fullWidth
                        label="Enter Percentage *"
                        value={studentDetails.percentage || ""}
                        onChange={(e) =>
                          handleInputChange("percentage", e.target.value)
                        }
                        // error={errors.percentage !== undefined}
                        helperText={errors.percentage}
                        sx={{ mt: 2 }}
                      />
                    )}

                    {/* Degree Certificate Section - Moved here from step 3 */}
                    <Typography variant="h6" sx={{ mt: 3 }}>
                      Your latest degree Certificate *
                    </Typography>
                    {degreeCertificate ? (
                      <Box
                        sx={{
                          position: "relative",
                          display: "inline-block",
                          mt: 2,
                        }}
                      >
                        <CardMedia
                          component="img"
                          height="150"
                          image={URL.createObjectURL(degreeCertificate)}
                          alt="Degree Certificate"
                          sx={{ borderRadius: 2 }}
                        />
                        <IconButton
                          onClick={handleRemoveFile(setDegreeCertificate)}
                          sx={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                            backgroundColor: "rgba(255, 255, 255, 0.8)",
                            "&:hover": {
                              backgroundColor: "rgba(255, 255, 255, 1)",
                            },
                            color: "red",
                          }}
                        >
                          <Close />
                        </IconButton>
                      </Box>
                    ) : (
                      <Button
                        variant="contained"
                        component="label"
                        sx={{ mt: 1 }}
                      >
                        Upload
                        <input
                          type="file"
                          hidden
                          onChange={handleFileUpload(setDegreeCertificate)}
                        />
                      </Button>
                    )}
                  </Box>
                )}

                {activeStep === 3 && (
                  <Box>
                    {/* Passport Section */}
                    <Typography variant="h6">Passport</Typography>
                    {studentDetails.documentUpload &&
                    studentDetails.documentUpload.length > 0 ? (
                      <Box
                        sx={{
                          position: "relative",
                          display: "inline-block",
                          mt: 2,
                        }}
                      >
                        <CardMedia
                          component="img"
                          height="150"
                          image={studentDetails.documentUpload[0]}
                          alt="Passport"
                          sx={{ borderRadius: 2 }}
                        />
                      </Box>
                    ) : (
                      <Typography
                        variant="body2"
                        sx={{ mt: 2, color: "text.secondary" }}
                      >
                        No Passport document uploaded.
                      </Typography>
                    )}

                    {/* Language Certificate Section */}
                    {studentDetails.document &&
                    studentDetails.document.length > 0 ? (
                      <Box>
                        <Typography variant="h6" sx={{ mt: 3 }}>
                          Language Test Document
                        </Typography>
                        <Box
                          sx={{
                            position: "relative",
                            display: "inline-block",
                            mt: 2,
                          }}
                        >
                          <CardMedia
                            component="img"
                            height="150"
                            image={studentDetails.document[0]}
                            alt="Language Certificate"
                            sx={{ borderRadius: 2 }}
                          />
                        </Box>
                      </Box>
                    ) : (
                      <Box>
                        <Typography variant="h6" sx={{ mt: 3 }}>
                          IELTS/TOEFL/GRE Certificate
                        </Typography>
                        {languageCertificate ? (
                          <Box
                            sx={{
                              position: "relative",
                              display: "inline-block",
                              mt: 2,
                            }}
                          >
                            <CardMedia
                              component="img"
                              height="150"
                              image={URL.createObjectURL(languageCertificate)}
                              alt="Language Certificate"
                              sx={{ borderRadius: 2 }}
                            />
                            <IconButton
                              onClick={handleRemoveFile(setLanguageCertificate)}
                              sx={{
                                position: "absolute",
                                top: 8,
                                right: 8,
                                backgroundColor: "rgba(255, 255, 255, 0.8)",
                                "&:hover": {
                                  backgroundColor: "rgba(255, 255, 255, 1)",
                                },
                                color: "red",
                              }}
                            >
                              <Close />
                            </IconButton>
                          </Box>
                        ) : (
                          <Button
                            variant="contained"
                            component="label"
                            sx={{ mt: 1 }}
                          >
                            Upload Language Certificate
                            <input
                              type="file"
                              hidden
                              onChange={handleFileUpload(
                                setLanguageCertificate
                              )}
                            />
                          </Button>
                        )}
                      </Box>
                    )}

                    {/* Proof of Address Section */}
                    <Typography variant="h6" sx={{ mt: 3 }}>
                      Proof of Address
                    </Typography>
                    {proofOfAddress ? (
                      <Box
                        sx={{
                          position: "relative",
                          display: "inline-block",
                          mt: 2,
                        }}
                      >
                        <CardMedia
                          component="img"
                          height="150"
                          image={URL.createObjectURL(proofOfAddress)}
                          alt="Proof of Address"
                          sx={{ borderRadius: 2 }}
                        />
                        <IconButton
                          onClick={handleRemoveFile(setProofOfAddress)}
                          sx={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                            backgroundColor: "rgba(255, 255, 255, 0.8)",
                            "&:hover": {
                              backgroundColor: "rgba(255, 255, 255, 1)",
                            },
                            color: "red",
                          }}
                        >
                          <Close />
                        </IconButton>
                      </Box>
                    ) : (
                      <Button
                        variant="contained"
                        component="label"
                        sx={{ mt: 1 }}
                      >
                        Upload Proof of Address
                        <input
                          type="file"
                          hidden
                          onChange={handleFileUpload(setProofOfAddress)}
                        />
                      </Button>
                    )}
                  </Box>
                )}
              </Box>
            )
          )}

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
            {/* Back Button */}
            <Button
              variant="outlined"
              sx={{
                color: "#000000",
                border: "solid 2px #004AAC",
                "&:hover": {
                  borderColor: "#004AAC",
                  backgroundColor: "rgba(0, 74, 172, 0.04)",
                },
                visibility: activeStep === 0 ? "hidden" : "visible",
                textTransform: "none",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                height: "40px",
                minWidth: "100px",
              }}
              onClick={handleBack}
            >
              <ArrowBack />
              Back
            </Button>

            {/* Next or Submit Button */}
            {activeStep === steps.length - 1 ? (
              <Button
                onClick={handleSubmitApplication}
                variant="contained"
                disabled={formLoading}
                sx={{
                  background: "#004AAC",
                  color: "#fff",
                  height: "40px",
                  minWidth: "120px",
                  "&:hover": {
                    backgroundColor: "#003882",
                  },
                }}
              >
                {formLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Apply"
                )}
              </Button>
            ) : (
              <Button
                sx={{
                  background: "#004AAC",
                  color: "#fff",
                  height: "40px",
                  minWidth: "120px",
                  "&:hover": {
                    backgroundColor: "#003882",
                  },
                }}
                onClick={handleNext}
              >
                Next
              </Button>
            )}
          </Box>
          <Typography sx={{ color: "red", mt: 3, fontSize: "0.75rem" }}>
            <strong>Note:</strong> Before applying, make sure your details are
            correct. If any of your details are wrong, please go to the edit
            profile page and update your details.
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
};

export default CourseDetail;
