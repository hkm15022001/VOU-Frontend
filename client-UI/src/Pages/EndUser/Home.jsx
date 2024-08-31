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
    backgroundImage: `url("/api/placeholder/1920/1080")`,
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



// Event Category Component
const EventCategory = ({ title, description, image, icon: Icon }) => {
  return (
    <Grow in={true} style={{ transformOrigin: '0 0 0' }} timeout={1000}>
      <Card sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s',
        background: 'linear-gradient(135deg, rgba(63, 81, 181, 0.8), rgba(245, 0, 87, 0.8))',
        '&:hover': {
          transform: 'translateY(-10px) scale(1.03)',
          boxShadow: '0 20px 30px rgba(0, 0, 0, 0.3)',
        },
      }}>
        <CardMedia
          component="img"
          height="160"
          image={image}
          alt={title}
          sx={{
            transition: 'all 0.3s',
            '&:hover': {
              transform: 'scale(1.1)',
            },
          }}
        />
        <CardContent sx={{ flexGrow: 1, position: 'relative' }}>
          <Avatar sx={{
            bgcolor: 'secondary.main',
            position: 'absolute',
            top: -28,
            left: 16,
            width: 56,
            height: 56,
            boxShadow: 3,
          }}>
            <Icon />
          </Avatar>
          <Box sx={{ mt: 3 }}>
            <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold', color: 'white' }}>
              {title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              {description}
            </Typography>
          </Box>
        </CardContent>
        <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
          <Button
            size="small"
            variant="contained"
            sx={{
              bgcolor: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.3)',
              },
            }}
          >
            Learn More
          </Button>
          <IconButton aria-label="add to favorites" sx={{ color: 'white' }}>
            <StarIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Grow>
  );
};

// Main App Component
const App = () => {
  const adImages = [
    slide1, slide2, slide3
  ];

  const eventCategories = [
    { title: 'eSports Tournaments', description: 'Compete in thrilling online battles across popular games', image: '/api/placeholder/400/300', icon: SportsEsportsIcon },
    { title: 'Cosplay Showcase', description: 'Bring your favorite characters to life in our cosplay events', image: '/api/placeholder/400/300', icon: GroupIcon },
    { title: 'Board Game Nights', description: 'Strategic fun with classic and modern tabletop games', image: '/api/placeholder/400/300', icon: CasinoIcon },
    { title: 'VR Gaming Zone', description: 'Immerse yourself in cutting-edge virtual reality experiences', image: '/api/placeholder/400/300', icon: VrIcon },
  ];

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
            {eventCategories.map((category, index) => (
              <Grid item key={index} xs={12} sm={6} md={3}>
                <EventCategory {...category} />
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

export default App;