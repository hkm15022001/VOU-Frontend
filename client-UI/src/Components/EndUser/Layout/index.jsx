import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Container,
  Grid,
  Box,
  useMediaQuery,
  useTheme,
  ThemeProvider,
  CssBaseline,
  InputBase,
  Paper,
  createTheme,
  Avatar,
  Tooltip
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Logo from '../Logo';

// Custom theme
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#0a0a0a',
      paper: '#1a1a1a',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3.5rem',
      fontWeight: 700,
      letterSpacing: '0.2rem',
    },
    h2: {
      fontSize: '2.75rem',
      fontWeight: 600,
      letterSpacing: '0.1rem',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '50px',
          textTransform: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
          overflow: 'hidden',
        },
      },
    },
  },
});
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
    padding: theme.spacing(6),
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



// Layout Component
const Layout = ({ children, isLoggedIn, username }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));


  const handleLogin = () => {
    navigate('/login');
  };
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userName');

    navigate('/login');
  };

  const navItems = isLoggedIn
    ? [
      { name: 'Attended Events', path: '/end-user/attended-events' },
      { name: 'Favourite Events', path: '/end-user/favourite-events' },
      { name: 'My Items', path: '/end-user/items' }
    ]
    : [
      { name: 'Home', path: '/home' },
      { name: 'Events', path: 'home' },
      { name: 'Games', path: '/home' },
      { name: 'Contact', path: '/home' }
    ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <AppBar position="fixed" color="transparent" elevation={0} sx={{ backdropFilter: 'blur(10px)' }}>
          <Toolbar>
            <Logo />
            {isMobile ? (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={() => setIsMenuOpen(true)}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
                {navItems.map((item) => (
                  <Button
                    key={item.name}
                    color="inherit"
                    onClick={() => navigate(item.path)}
                    sx={{
                      mx: 1,
                      '&:hover': {
                        backgroundColor: 'rgba(156, 39, 176)',
                        transform: 'translateY(-2px)',
                      },
                      transition: 'all 0.3s',
                    }}
                  >
                    {item.name}
                  </Button>
                ))}
                {isLoggedIn ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                    <Tooltip title="Your Profile" arrow>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          py: 0.5,
                          px: 2,
                          borderRadius: '50px',
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          transition: 'all 0.3s',
                          cursor: 'pointer',
                          '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                          },
                        }}
                      >
                        <Avatar
                          sx={{
                            width: 32,
                            height: 32,
                            mr: 1,
                            bgcolor: 'secondary.main',
                          }}
                        >
                          {username.charAt(0).toUpperCase()}
                        </Avatar>
                        <Typography
                          sx={{
                            color: 'black',
                            fontWeight: 'bold',
                          }}
                        >
                          {username}
                        </Typography>
                      </Box>
                    </Tooltip>
                    <Button
                      color="inherit"
                      onClick={handleLogout}
                      sx={{
                        ml: 2,
                        py: 1,
                        px: 3,
                        borderRadius: '50px',
                        backgroundColor: 'secondary.main',
                        color: 'white',
                        fontWeight: 'bold',
                        '&:hover': {
                          backgroundColor: 'secondary.dark',
                          transform: 'translateY(-2px)',
                          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                        },
                        transition: 'all 0.3s',
                      }}
                    >
                      Logout
                    </Button>
                  </Box>
                ) : (
                  <Button
                    color="inherit"
                    onClick={handleLogin}
                    sx={{
                      ml: 2,
                      py: 1,
                      px: 3,
                      borderRadius: '50px',
                      backgroundColor: 'secondary.main',
                      color: 'white',
                      fontWeight: 'bold',
                      '&:hover': {
                        backgroundColor: 'secondary.dark',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                      },
                      transition: 'all 0.3s',
                    }}
                  >
                    Login
                  </Button>
                )}
                <Paper
                  component="form"
                  sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 300, ml: 2, borderRadius: '50px' }}
                >
                  <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search events"
                    inputProps={{ 'aria-label': 'search events' }}
                  />
                  <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                  </IconButton>
                </Paper>
              </Box>
            )}
          </Toolbar>
        </AppBar>

        <Drawer
          anchor="right"
          open={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
        >
          <List sx={styles.fullHeightNav}>
            {navItems.map((item) => (
              <ListItem button key={item.name} onClick={() => { navigate(item.path); setIsMenuOpen(false); }}>
                <ListItemText primary={item.name} />
              </ListItem>
            ))}
            {isLoggedIn ? (
              <ListItem>
                <ListItemText primary={username} />
              </ListItem>
            ) : (
              <ListItem button onClick={() => { handleLogin(); setIsMenuOpen(false); }}>
                <ListItemText primary="Login" />
              </ListItem>
            )}
          </List>
        </Drawer>

        <Box component="main" sx={{ flexGrow: 1, pt: { xs: 8, sm: 9 } }}>
          {children}
        </Box>

        <Box component="footer" sx={styles.footer}>
          <Container maxWidth="lg">
            <Grid container spacing={4} justifyContent="space-evenly">
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="h6" color="text.primary" gutterBottom>
                  About Us
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Event Gaming brings you the most exciting gaming events and experiences.
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="h6" color="text.primary" gutterBottom>
                  Quick Links
                </Typography>
                <nav>
                  {['Home', 'Events', 'Games', 'Contact'].map((item) => (
                    <Typography
                      key={item}
                      variant="body2"
                      color="text.secondary"
                      display="block"
                      sx={{ '&:hover': { color: 'secondary.main' }, cursor: 'pointer', mb: 1 }}
                    >
                      {item}
                    </Typography>
                  ))}
                </nav>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="h6" color="text.primary" gutterBottom>
                  Follow Us
                </Typography>
                <Box>
                  {['Twitter', 'Facebook', 'Instagram', 'YouTube'].map((social) => (
                    <IconButton key={social} color="primary" sx={{ '&:hover': { color: 'secondary.main' } }}>
                      {social[0]}
                    </IconButton>
                  ))}
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="h6" color="text.primary" gutterBottom>
                  Newsletter
                </Typography>
                <Box component="form" noValidate sx={{ mt: 1 }}>
                  <InputBase
                    placeholder="Your email"
                    fullWidth
                    sx={{ mb: 2, bgcolor: 'background.paper', borderRadius: '4px', p: 1 }}
                  />
                  <Button variant="contained" color="secondary" fullWidth>
                    Subscribe
                  </Button>
                </Box>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Typography variant="body2" color="text.secondary" align="center">
                © 2024 Event Gaming. All rights reserved.
              </Typography>
            </Box>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};
export default Layout;
