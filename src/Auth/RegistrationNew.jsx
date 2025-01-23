import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Stack,
  MenuItem,
  LinearProgress,
  IconButton,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  Link,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Registration = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    gender: "",
    email: "",
    reEnterEmail: "",
    password: "",
    mobileNo: "",
    passportFile: null,
    recentEducation: "",
    recentEducationOther: "",
    yearOfGraduation: "",
    collegeName: "",
    programType: "",
    programOther: "",
    discipline: "",
    disciplineOther: "",
    applyingCountry: "",
    applyingCountryOther: "",
    preferredUniversity: "",
    preferredUniversityName: "",
    preferredCourse: "",
    preferredCourseName: "",
    courseStart: "",
    englishRequirement: "",
    testTaken: "",
    testScore: "",
    documentUpload: null,
    hearAboutUs: "",
    agreeTerms: false,
    agreeGDPR: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({}); // State to store validation errors

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear the error for the field being edited
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleNext = () => {
    const newErrors = {};

    // Step 1 Validation
    if (step === 1) {
      if (!formData.firstName) newErrors.firstName = "First Name is required.";
      if (!formData.lastName) newErrors.lastName = "Last Name is required.";
      if (!formData.dob) newErrors.dob = "Date of Birth is required.";
      if (!formData.gender) newErrors.gender = "Gender is required.";
    }

    // Step 2 Validation
    if (step === 2) {
      if (!formData.email) newErrors.email = "Email ID is required.";
      if (!formData.reEnterEmail) newErrors.reEnterEmail = "Re-Enter Email ID is required.";
      if (formData.email && formData.reEnterEmail && formData.email !== formData.reEnterEmail) {
        newErrors.reEnterEmail = "Emails do not match.";
      }
      if (!formData.password) newErrors.password = "Password is required.";
      if (!formData.mobileNo) newErrors.mobileNo = "Mobile No is required.";
      if (!formData.passportFile) newErrors.passportFile = "Passport File is required.";
    }

    // Step 3 Validation
    if (step === 3) {
      if (!formData.recentEducation) newErrors.recentEducation = "Most Recent Education is required.";
      if (formData.recentEducation === "Other" && !formData.recentEducationOther) {
        newErrors.recentEducationOther = "Name of Recent Education is required.";
      }
      if (!formData.yearOfGraduation) newErrors.yearOfGraduation = "Year of Graduation is required.";
      if (!formData.collegeName) newErrors.collegeName = "Name of College/University is required.";
      if (!formData.programType) newErrors.programType = "Program Type is required.";
      if (formData.programType === "Other" && !formData.programOther) {
        newErrors.programOther = "Name of Program is required.";
      }
      if (!formData.discipline) newErrors.discipline = "Specific Discipline is required.";
      if (formData.discipline === "Other" && !formData.disciplineOther) {
        newErrors.disciplineOther = "Name of Discipline is required.";
      }
    }

    // Step 4 Validation
    if (step === 4) {
      if (!formData.applyingCountry) newErrors.applyingCountry = "Country is required.";
      if (formData.applyingCountry === "Other" && !formData.applyingCountryOther) {
        newErrors.applyingCountryOther = "Name of Country is required.";
      }
      if (!formData.preferredUniversity) newErrors.preferredUniversity = "Preferred University is required.";
      if (formData.preferredUniversity === "Yes" && !formData.preferredUniversityName) {
        newErrors.preferredUniversityName = "Name of University is required.";
      }
      if (!formData.preferredCourse) newErrors.preferredCourse = "Preferred Course is required.";
      if (formData.preferredCourse === "Yes" && !formData.preferredCourseName) {
        newErrors.preferredCourseName = "Name of Course is required.";
      }
      if (!formData.courseStart) newErrors.courseStart = "Course Start Date is required.";
      if (!formData.englishRequirement) newErrors.englishRequirement = "English Language Requirement is required.";
      if (formData.englishRequirement === "Yes" && !formData.testTaken) {
        newErrors.testTaken = "Name of the test taken is required.";
      }
      if (formData.englishRequirement === "Yes" && !formData.testScore) {
        newErrors.testScore = "Test Score is required.";
      }
      if (!formData.documentUpload) newErrors.documentUpload = "Document Upload is required.";
    }

    // If there are errors, set them and stop proceeding
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // If no errors, proceed to the next step
    setStep(step + 1);
    setErrors({}); // Clear errors
  };

  const handleBack = () => {
    setStep(step - 1);
    setErrors({}); // Clear errors when going back
  };

  const handleSubmit = () => {
    if (formData.agreeTerms && formData.agreeGDPR) {
      console.log("Form Data:", formData);
      alert("Form submitted successfully!");
    } else {
      alert("Please agree to the Terms and Conditions and GDPR Regulations.");
    }
  };

  const getProgress = () => {
    return step * 20; // 20% for each step (5 steps total)
  };

  const getMinDate = () => {
    const today = new Date();
    today.setFullYear(today.getFullYear() - 14);
    return today.toISOString().split("T")[0];
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "50px" }}>
      <Box
        sx={{
          marginTop: 12,
          boxShadow: 3,
          borderRadius: 2,
          p: 4,
        }}
      >
        {/* Heading */}
        <Typography variant="h4" align="center" gutterBottom>
          {step === 1
            ? "Personal Information"
            : step === 2
            ? "Contact Information"
            : step === 3
            ? "Educational Background"
            : step === 4
            ? "Program Preferences"
            : "Terms and Conditions"}
        </Typography>

        {/* Progress Bar */}
        <LinearProgress variant="determinate" value={getProgress()} sx={{ mb: 3 }} />

        {/* Step 1: Personal Information */}
        {step === 1 && (
          <>
            <Stack spacing={2}>
              <TextField
                label="First Name *"
                name="firstName"
                variant="outlined"
                fullWidth
                size="small"
                value={formData.firstName}
                onChange={handleChange}
                error={!!errors.firstName}
                helperText={errors.firstName}
              />
              <TextField
                label="Middle Name"
                name="middleName"
                variant="outlined"
                fullWidth
                size="small"
                value={formData.middleName}
                onChange={handleChange}
              />
              <TextField
                label="Last Name *"
                name="lastName"
                variant="outlined"
                fullWidth
                size="small"
                value={formData.lastName}
                onChange={handleChange}
                error={!!errors.lastName}
                helperText={errors.lastName}
              />
              <TextField
                label="Date of Birth *"
                type="date"
                name="dob"
                variant="outlined"
                fullWidth
                InputLabelProps={{ shrink: true }}
                size="small"
                value={formData.dob}
                onChange={handleChange}
                inputProps={{ max: getMinDate() }}
                error={!!errors.dob}
                helperText={errors.dob}
              />
              <TextField
                select
                label="Gender *"
                name="gender"
                variant="outlined"
                fullWidth
                size="small"
                value={formData.gender}
                onChange={handleChange}
                error={!!errors.gender}
                helperText={errors.gender}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
            </Stack>
            <Box mt={4} display="flex" justifyContent="flex-end">
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                sx={{ backgroundColor: "#2196F3", color: "#ffffff" }}
              >
                Save & Next
              </Button>
            </Box>
          </>
        )}

        {/* Step 2: Contact Information */}
        {step === 2 && (
          <>
            <Stack spacing={2}>
              <TextField
                label="Email ID *"
                name="email"
                variant="outlined"
                fullWidth
                size="small"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
              />
              <TextField
                label="Re-Enter Email ID *"
                name="reEnterEmail"
                variant="outlined"
                fullWidth
                size="small"
                value={formData.reEnterEmail}
                onChange={handleChange}
                error={!!errors.reEnterEmail}
                helperText={errors.reEnterEmail}
              />
              <TextField
                label="Password *"
                name="password"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                fullWidth
                size="small"
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePassword}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Mobile No *"
                name="mobileNo"
                variant="outlined"
                fullWidth
                size="small"
                value={formData.mobileNo}
                onChange={handleChange}
                error={!!errors.mobileNo}
                helperText={errors.mobileNo}
              />
              <input
                type="file"
                accept=".jpg, .png, .pdf, .doc, .docx"
                name="passportFile"
                onChange={handleFileChange}
                style={{ marginTop: "16px" }}
              />
              {errors.passportFile && (
                <Typography variant="body2" color="error">
                  {errors.passportFile}
                </Typography>
              )}
            </Stack>
            <Box mt={4} display="flex" justifyContent="space-between">
              <Button variant="outlined" onClick={handleBack}>
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                sx={{ backgroundColor: "#2196F3", color: "#ffffff" }}
              >
                Save & Next
              </Button>
            </Box>
          </>
        )}

        {/* Step 3: Educational Background */}
        {step === 3 && (
          <>
            <Stack spacing={2}>
              <TextField
                select
                label="Most Recent Education *"
                name="recentEducation"
                variant="outlined"
                fullWidth
                size="small"
                value={formData.recentEducation}
                onChange={handleChange}
                error={!!errors.recentEducation}
                helperText={errors.recentEducation}
              >
                <MenuItem value="BTech">BTech</MenuItem>
                <MenuItem value="Diploma">Diploma</MenuItem>
                <MenuItem value="Degree">Degree</MenuItem>
                <MenuItem value="Masters">Masters</MenuItem>
                <MenuItem value="PHD">PHD</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
              {formData.recentEducation === "Other" && (
                <TextField
                  label="Name of Recent Education *"
                  name="recentEducationOther"
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={formData.recentEducationOther}
                  onChange={handleChange}
                  error={!!errors.recentEducationOther}
                  helperText={errors.recentEducationOther}
                />
              )}
              <TextField
                select
                label="Year of Graduation *"
                name="yearOfGraduation"
                variant="outlined"
                fullWidth
                size="small"
                value={formData.yearOfGraduation}
                onChange={handleChange}
                error={!!errors.yearOfGraduation}
                helperText={errors.yearOfGraduation}
              >
                {Array.from({ length: 11 }, (_, i) => 2024 - i).map((year) => (
                  <MenuItem key={year} value={year}>
                    {year}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Name of College/University *"
                name="collegeName"
                variant="outlined"
                fullWidth
                size="small"
                value={formData.collegeName}
                onChange={handleChange}
                error={!!errors.collegeName}
                helperText={errors.collegeName}
              />
              <TextField
                select
                label="What type of program you are interested in? *"
                name="programType"
                variant="outlined"
                fullWidth
                size="small"
                value={formData.programType}
                onChange={handleChange}
                error={!!errors.programType}
                helperText={errors.programType}
              >
                <MenuItem value="Graduation">Graduation</MenuItem>
                <MenuItem value="Post Graduation">Post Graduation</MenuItem>
                <MenuItem value="Under Graduation">Under Graduation</MenuItem>
                <MenuItem value="PHD">PHD</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
              {formData.programType === "Other" && (
                <TextField
                  label="Name of Program *"
                  name="programOther"
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={formData.programOther}
                  onChange={handleChange}
                  error={!!errors.programOther}
                  helperText={errors.programOther}
                />
              )}
              <TextField
                select
                label="Any specific discipline? *"
                name="discipline"
                variant="outlined"
                fullWidth
                size="small"
                value={formData.discipline}
                onChange={handleChange}
                error={!!errors.discipline}
                helperText={errors.discipline}
              >
                <MenuItem value="Computers">Computers</MenuItem>
                <MenuItem value="Business">Business</MenuItem>
                <MenuItem value="Marketing">Marketing</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
              {formData.discipline === "Other" && (
                <TextField
                  label="Name of Discipline *"
                  name="disciplineOther"
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={formData.disciplineOther}
                  onChange={handleChange}
                  error={!!errors.disciplineOther}
                  helperText={errors.disciplineOther}
                />
              )}
            </Stack>
            <Box mt={4} display="flex" justifyContent="space-between">
              <Button variant="outlined" onClick={handleBack}>
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                sx={{ backgroundColor: "#2196F3", color: "#ffffff" }}
              >
                Save & Next
              </Button>
            </Box>
          </>
        )}

        {/* Step 4: Program Preferences */}
        {step === 4 && (
          <>
            <Stack spacing={2}>
              <TextField
                select
                label="Country you are applying from *"
                name="applyingCountry"
                variant="outlined"
                fullWidth
                size="small"
                value={formData.applyingCountry}
                onChange={handleChange}
                error={!!errors.applyingCountry}
                helperText={errors.applyingCountry}
              >
                <MenuItem value="UK">UK</MenuItem>
                <MenuItem value="India">India</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
              {formData.applyingCountry === "Other" && (
                <TextField
                  label="Name of Country *"
                  name="applyingCountryOther"
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={formData.applyingCountryOther}
                  onChange={handleChange}
                  error={!!errors.applyingCountryOther}
                  helperText={errors.applyingCountryOther}
                />
              )}
              <TextField
                select
                label="Any preferred university? *"
                name="preferredUniversity"
                variant="outlined"
                fullWidth
                size="small"
                value={formData.preferredUniversity}
                onChange={handleChange}
                error={!!errors.preferredUniversity}
                helperText={errors.preferredUniversity}
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </TextField>
              {formData.preferredUniversity === "Yes" && (
                <TextField
                  label="Name of University *"
                  name="preferredUniversityName"
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={formData.preferredUniversityName}
                  onChange={handleChange}
                  error={!!errors.preferredUniversityName}
                  helperText={errors.preferredUniversityName}
                />
              )}
              <TextField
                select
                label="Any preferred course? *"
                name="preferredCourse"
                variant="outlined"
                fullWidth
                size="small"
                value={formData.preferredCourse}
                onChange={handleChange}
                error={!!errors.preferredCourse}
                helperText={errors.preferredCourse}
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </TextField>
              {formData.preferredCourse === "Yes" && (
                <TextField
                  label="Name of Course *"
                  name="preferredCourseName"
                  variant="outlined"
                  fullWidth
                  size="small"
                  value={formData.preferredCourseName}
                  onChange={handleChange}
                  error={!!errors.preferredCourseName}
                  helperText={errors.preferredCourseName}
                />
              )}
              <TextField
                select
                label="When do you want to start your course? *"
                name="courseStart"
                variant="outlined"
                fullWidth
                size="small"
                value={formData.courseStart}
                onChange={handleChange}
                error={!!errors.courseStart}
                helperText={errors.courseStart}
              >
                <MenuItem value="3 months">3 months</MenuItem>
                <MenuItem value="6 months">6 months</MenuItem>
                <MenuItem value="9 months">9 months</MenuItem>
                <MenuItem value="1 year">1 year</MenuItem>
              </TextField>
              <TextField
                select
                label="English Language Requirement *"
                name="englishRequirement"
                variant="outlined"
                fullWidth
                size="small"
                value={formData.englishRequirement}
                onChange={handleChange}
                error={!!errors.englishRequirement}
                helperText={errors.englishRequirement}
              >
                <MenuItem value="Yes">Yes</MenuItem>
                <MenuItem value="No">No</MenuItem>
              </TextField>
              {formData.englishRequirement === "Yes" && (
                <>
                  <TextField
                    select
                    label="Name of the test taken *"
                    name="testTaken"
                    variant="outlined"
                    fullWidth
                    size="small"
                    value={formData.testTaken}
                    onChange={handleChange}
                    error={!!errors.testTaken}
                    helperText={errors.testTaken}
                  >
                    <MenuItem value="TOEFL">TOEFL</MenuItem>
                    <MenuItem value="IELTS">IELTS</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </TextField>
                  <TextField
                    label="Score *"
                    name="testScore"
                    variant="outlined"
                    fullWidth
                    size="small"
                    value={formData.testScore}
                    onChange={handleChange}
                    error={!!errors.testScore}
                    helperText={errors.testScore}
                  />
                </>
              )}
              <input
                type="file"
                accept=".jpg, .png, .pdf, .doc, .docx"
                name="documentUpload"
                onChange={handleFileChange}
                style={{ marginTop: "16px" }}
              />
              {errors.documentUpload && (
                <Typography variant="body2" color="error">
                  {errors.documentUpload}
                </Typography>
              )}
            </Stack>
            <Box mt={4} display="flex" justifyContent="space-between">
              <Button variant="outlined" onClick={handleBack}>
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                sx={{ backgroundColor: "#2196F3", color: "#ffffff" }}
              >
                Save & Next
              </Button>
            </Box>
          </>
        )}

        {/* Step 5: Terms and Conditions */}
        {step === 5 && (
          <>
            <Stack spacing={2}>
              <TextField
                select
                label="How did you hear about us? *"
                name="hearAboutUs"
                variant="outlined"
                fullWidth
                size="small"
                value={formData.hearAboutUs}
                onChange={handleChange}
              >
                <MenuItem value="Social media">Social media (e.g., Facebook, Instagram, LinkedIn)</MenuItem>
                <MenuItem value="Referral">Referral from a friend/family member</MenuItem>
                <MenuItem value="Online search">Online search/Google</MenuItem>
                <MenuItem value="Education fair">Education fair/exhibition</MenuItem>
                <MenuItem value="Advertisement">Advertisement (online/offline)</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </TextField>
              <FormControlLabel
                control={
                  <Checkbox
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                  />
                }
                label={
                  <Typography>
                    I agree to{" "}
                    <Link href="#" underline="always">
                      Terms and Conditions
                    </Link>
                  </Typography>
                }
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="agreeGDPR"
                    checked={formData.agreeGDPR}
                    onChange={(e) => setFormData({ ...formData, agreeGDPR: e.target.checked })}
                  />
                }
                label={
                  <Typography>
                    I agree to{" "}
                    <Link href="#" underline="always">
                      GDPR Regulations
                    </Link>
                  </Typography>
                }
              />
            </Stack>
            <Box mt={4} display="flex" justifyContent="space-between">
              <Button variant="outlined" onClick={handleBack}>
                Back
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                sx={{ backgroundColor: "#2196F3", color: "#ffffff" }}
              >
                Submit
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Container>
  );
};

export default Registration;