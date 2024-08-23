import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Helmet } from "react-helmet-async";
import LocationMap from '../../Components/LocationMap/LocationMap';
import { toast, ToastContainer } from 'react-toastify';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { createEnterprise } from '../../api';

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

const defaultTheme = createTheme();

export default function SignUp() {
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [gps, setGPS] = useState({
    latitude: '',
    longitude: ''
  });

  const handleMapSelect = (selectedGPS) => {
    setGPS({
      location: selectedGPS.location,
      latitude: selectedGPS.latitude,
      longitude: selectedGPS.longitude
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const data = new FormData(event.currentTarget);
    let payload = {
      name: data.get('name'),
      username: data.get('username'),
      phone: data.get('phone'),
      email: data.get('email'),
      password: data.get('password'),
      enterprise_name: data.get('enterprise_name'),
      field: data.get('field'),
      location: gps.location,
      gps: `${gps.latitude},${gps.longitude}`
    }
    console.log("payload: ", payload)
    try {
      await createEnterprise(payload);
      setOpen(true); // Show the popup when the registration is successful
    } catch (err) {
      toast.error(`Error register: ${err.response.data?.message || 'Please try again!'}`);
    } finally {
      setLoading(false);
    }
  };
  const handleClose = () => {
    setOpen(false);
    navigate('/login'); // Navigate to the login page
  };
  return (
    <div>
      <Helmet>
        <title>VOU System</title>
      </Helmet>
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
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
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
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="name"
                    label="Your Name"
                    name="name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="username"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="phone"
                    label="Phone"
                    name="phone"
                    autoComplete="family-name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    name="enterprise_name"
                    label="Enterprise Name"
                    id="enterprise_name"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    name="field"
                    label="Field"
                    id="field"
                  />
                </Grid>
                <Grid item xs={12} >
                  <LocationMap onSelect={handleMapSelect} />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    name="latitude"
                    id="latitude"
                    label="Latitude"
                    value={gps.latitude}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    name="longitude"
                    label="Longitude"
                    id="longitude"
                    value={gps.longitude}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} >
                  <FormControlLabel
                    control={<Checkbox required={true} value="allowExtraEmails" color="primary" />}
                    label="I want to receive inspiration, marketing promotions and updates via email."
                  />
                </Grid>
              </Grid>
              {loading ? (
                <div >
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Submitting...
                  </Button>
                </div>
              ) : (
                <div >
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign Up
                  </Button>
                </div>
              )}

              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider>
      <ToastContainer />
    </div>
  );
}
