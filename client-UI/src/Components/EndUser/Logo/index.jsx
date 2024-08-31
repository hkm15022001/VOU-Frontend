import React from 'react';
import { Box } from '@mui/material';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

// CSS styles for the logo
const styles = {
  logo: {
    width: '220px',
    height: '50px',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '25px',
    overflow: 'hidden',
    background: 'linear-gradient(90deg, #00c9ff 0%, #92fe9d 100%)',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  },
  text: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '1.5rem',
    color: '#fff',
    textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
    zIndex: 2,
    marginLeft: '10px',
  },
  iconContainer: {
    width: '50px',
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: '0 25px 25px 0',
    boxShadow: '-2px 0 4px rgba(0,0,0,0.1)',
  },
  icon: {
    color: '#00c9ff',
    fontSize: '28px',
  },
};

// Logo Component
const Logo = () => {
  return (
    <Box sx={styles.logo}>
      <span style={styles.text}>Event Gaming</span>
      <Box sx={styles.iconContainer}>
        <SportsEsportsIcon sx={styles.icon} />
      </Box>
    </Box>
  );
};

// ... (rest of the components remain the same)

export default Logo;