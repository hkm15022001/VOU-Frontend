import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet-async";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Avatar, Box, Button, Checkbox, Container, CssBaseline,
  FormControlLabel, Grid, Link, TextField, Typography,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
  Paper, Stepper, Step, StepLabel
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LocationMap from '../../Components/LocationMap/LocationMap';
import { createEnterprise } from '../../api';

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
        VOU System
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const steps = ['Personal Information', 'Enterprise Details', 'Location'];

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
};

export default function SignUpEnterprise() {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    phone: '',
    email: '',
    password: '',
    enterprise_name: '',
    field: '',
    location: '',
    latitude: '',
    longitude: '',
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleMapSelect = (selectedGPS) => {
    setFormData({
      ...formData,
      location: selectedGPS.location,
      latitude: selectedGPS.latitude,
      longitude: selectedGPS.longitude,
    });
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
      await createEnterprise(formData);
      setOpen(true);
    } catch (err) {
      toast.error(`Error registering: ${err.response?.data?.message || 'Please try again!'}`);
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
              label="Your Name"
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
              id="phone"
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
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
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
            />
          </>
        );
      case 1:
        return (
          <>
            <TextField
              margin="normal"
              required
              fullWidth
              name="enterprise_name"
              label="Enterprise Name"
              id="enterprise_name"
              value={formData.enterprise_name}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="field"
              label="Field"
              id="field"
              value={formData.field}
              onChange={handleChange}
            />
          </>
        );
      case 2:
        return (
          <>
            <LocationMap onSelect={handleMapSelect} />
            <Box mt={2}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="latitude"
                id="latitude"
                label="Latitude"
                value={formData.latitude}
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="longitude"
                label="Longitude"
                id="longitude"
                value={formData.longitude}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Box>
          </>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Helmet>
        <title>VOU System - Sign Up</title>
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
                  <Button
                    variant="contained"
                    onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
                    sx={{ mt: 3, ml: 1 }}
                    disabled={loading}
                  >
                    {activeStep === steps.length - 1 ? 'Sign Up' : 'Next'}
                  </Button>
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