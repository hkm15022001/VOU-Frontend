import React, { useState, useEffect } from 'react';
import {
  Typography,
  Button,
  IconButton,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Box,
  Grow,
  Avatar,
} from '@mui/material';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import GroupIcon from '@mui/icons-material/Group';
import CasinoIcon from '@mui/icons-material/Casino';
import VrIcon from '@mui/icons-material/ViewInAr';
import StarIcon from '@mui/icons-material/Star';
import Slide from '../../Components/EndUser/Silde';
import Layout from '../../Components/EndUser/Layout';
import slide1 from '../../Images/slide1.png'
import slide2 from '../../Images/slide2.png'
import slide3 from '../../Images/slide3.png'
import backgroundImage from '../../Images/VOU.png';
import EventCategory from '../../Components/EndUser/EventCategory';
import { getAllEvents } from '../../api';
const styles = {
  gradientText: {
    backgroundClip: 'text',
    backgroundImage: 'linear-gradient(45deg, #00c9ff, #92fe9d)',
    color: 'transparent',
    display: 'inline-block',
  },
  fullHeightNav: {
    height: '100%',
  },
  footer: {
    backgroundColor: 'rgba(26, 26, 26, 0.9)',
    backdropFilter: 'blur(10px)',
    marginTop: 'auto',
  },
  heroSection: {
    position: 'relative',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    overflow: 'hidden',
  },
  heroBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(45deg, rgba(63, 81, 181, 0.4), rgba(245, 0, 87, 0.4))',
    },
  },
  heroContent: {
    position: 'relative',
    zIndex: 1,
  },
  pageBackground: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(63, 81, 181, 0.4) 0%, rgba(63, 81, 181, 0.01) 80.2%), radial-gradient(circle at 90% 80%, rgba(245, 0, 87, 0.4) 0%, rgba(245, 0, 87, 0.01) 80.2%)',
    zIndex: -1,
  },
};


// Main App Component
const HomeEndUser = () => {
  const adImages = [
    slide1, slide2, slide3
  ];
  const [events, setEvents] = useState([]);
  useEffect(() => {
    getAllEvents()
      .then(response => {
        // console.log(response.data.data)
        if (response.data.data === null) {
          return
        }
        setEvents(response.data.data);
      })
      .catch(error => {
        console.error('error when call API:', error);
      });
  }, []);

  return (
    <Layout>
      <Box sx={styles.pageBackground} />
      <Box sx={styles.heroSection}>
        <Box sx={styles.heroBackground} />
        <Container maxWidth="md" sx={styles.heroContent}>
          <Typography variant="h1" component="h1" sx={{ color: 'white', mb: 4 }}>
            Welcome to <span style={styles.gradientText}>Event Gaming</span>
          </Typography>
          <Typography variant="h5" sx={{ color: 'white', mb: 4 }}>
            Discover, Compete, and Celebrate in the World of Gaming
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            sx={{
              py: 2,
              px: 4,
              fontSize: '1.2rem',
              '&:hover': {
                transform: 'translateY(-3px)',
                boxShadow: '0 6px 20px rgba(245, 0, 87, 0.4)',
              },
              transition: 'all 0.3s',
            }}
          >
            Explore Events
          </Button>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mt: 8, mb: 8 }}>
        <Typography variant="h2" align="center" gutterBottom sx={{ ...styles.gradientText, mb: 6 }}>
          Featured Events
        </Typography>
        <Slide images={adImages} />

        <Box sx={{ mt: 8 }}>
          <Typography variant="h2" align="center" gutterBottom sx={{ ...styles.gradientText, mb: 6 }}>
            Discover Amazing Events
          </Typography>
          <Grid container spacing={4}>
          {events.map((event) => (
            <Grid item key={event.id} xs={12} sm={6} md={3}>
              <EventCategory event={event} />
            </Grid>
          ))}
        </Grid>
        </Box>

        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <Typography variant="h3" gutterBottom sx={{ color: 'text.primary' }}>
            Ready to Join the Fun?
          </Typography>
          <Typography variant="h6" paragraph sx={{ color: 'text.secondary', mb: 4 }}>
            Don't miss out on our upcoming events!
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            sx={{
              py: 2,
              px: 4,
              fontSize: '1.2rem',
              '&:hover': {
                transform: 'translateY(-3px)',
                boxShadow: '0 6px 20px rgba(245, 0, 87, 0.4)',
              },
              transition: 'all 0.3s',
            }}
          >
            Sign Up Now
          </Button>
        </Box>
      </Container>
    </Layout>
  );
};

export default HomeEndUser;