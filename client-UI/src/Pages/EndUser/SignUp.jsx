import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet-async";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Avatar, Box, Button, Container, CssBaseline,
  Grid, Link, TextField, Typography,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  Paper, Stepper, Step, StepLabel, Select, MenuItem, FormControl, InputLabel
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

// Assume we have these API functions
import { createEndUser ,sendOtp } from '../../api';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const steps = ['Personal Information', 'Contact Details', 'Verify Phone'];

const useStyles = {
  root: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: theme.spacing(2),
  },
  paper: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(4),
    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
    backdropFilter: 'blur(4px)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
  },
  datePicker: {
    width: '100%',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    '& .react-datepicker-wrapper': {
      width: '100%',
    },
    '& .react-datepicker__input-container input': {
      width: '100%',
      padding: '16.5px 14px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      fontSize: '1rem',
      '&:hover': {
        borderColor: '#000',
      },
      '&:focus': {
        borderColor: '#1976d2',
        borderWidth: '2px',
        outline: 'none',
      },
    },
  },
};

export default function SignUp() {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    email: '',
    birthday: null,
    gender: '',
    facebook: '',
    phone: '',
    otp: '',
  });

  const handleChange = (event) => {
    // let { name, value } = event.target;
    //     if (name === 'phone') {
    //       value = parseInt(value, 10);
    //     }
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, birthday: date });
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await createEndUser(formData);
      setOpen(true);
    } catch (err) {
      toast.error(`Error registering: ${err.response?.data?.message || 'Please try again!'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyPhone = async () => {
    setLoading(true);
    try {
      await verifyPhone(formData.phone, formData.verificationCode);
      handleNext();
    } catch (err) {
      toast.error(`Error verifying phone: ${err.response?.data?.message || 'Please try again!'}`);
    } finally {
      setLoading(false);
    }
  };
  const handleSendOTP = async () => {
    setLoading(true);
    try {
      console.log(formData.phone)
      await sendOtp({phone : formData.phone});
      toast.success('OTP sent successfully!');
    } catch (err) {
      toast.error(`Error sending OTP: ${err.response?.data?.message || 'Please try again!'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    navigate('/login');
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <>
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Full Name"
              name="name"
              autoFocus
              value={formData.name}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
            />
            <Box sx={useStyles.datePicker}>
              <DatePicker
                selected={formData.birthday}
                onChange={handleDateChange}
                dateFormat="MMMM d, yyyy"
                placeholderText="Select Birthday"
                showYearDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={100}
                maxDate={new Date()}
              />
            </Box>
            <FormControl fullWidth margin="normal">
              <InputLabel id="gender-label">Gender</InputLabel>
              <Select
                labelId="gender-label"
                id="gender"
                name="gender"
                value={formData.gender}
                label="Gender"
                onChange={handleChange}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
          </>
        );
      case 1:
        return (
          <>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              fullWidth
              name="facebook"
              label="Facebook URL"
              id="facebook"
              value={formData.urlFacebook}
              onChange={handleChange}
            />
          </>
        );
        case 2:
          return (
            <>
              <Typography variant="body1" gutterBottom>
                Please enter your phone number and click 'Send OTP' to receive a verification code.
              </Typography>
              <TextField
                margin="normal"
                required
                fullWidth
                name="phone"
                label="Phone Number"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleSendOTP}
                disabled={loading}
                sx={{ mt: 2, mb: 2 }}
              >
                {loading ? 'Sending...' : 'Send OTP'}
              </Button>
              <TextField
                margin="normal"
                required
                fullWidth
                name="otp"
                label="Verification Code"
                id="otp"
                value={formData.verificationCode}
                onChange={handleChange}
              />
            </>
          );
      default:
        return 'Unknown step';
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Helmet>
        <title>User Sign Up</title>
      </Helmet>
      <Box sx={useStyles.root}>
        <Container component="main" maxWidth="sm">
          <CssBaseline />
          <Paper elevation={3} sx={useStyles.paper}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, width: '100%' }}>
                {getStepContent(activeStep)}
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}
                  {activeStep !== steps.length - 1 && (
                    <Button
                      variant="contained"
                      onClick={handleNext}
                      sx={{ mt: 3, ml: 1 }}
                    >
                      Next
                    </Button>
                  )}
                  {activeStep === steps.length - 1 && (
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{ mt: 3, ml: 1 }}
                      disabled={loading}
                    >
                      {loading ? 'Signing Up...' : 'Sign Up'}
                    </Button>
                  )}
                </Box>
              </Box>
            </Box>
            <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Paper>
          <Copyright sx={{ mt: 5, color: 'white' }} />
        </Container>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Registration Successful</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your registration was successful. Please log in to continue.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </ThemeProvider>
  );
}