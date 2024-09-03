import React from 'react';
import { Button, Typography, Box } from '@mui/material';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { useNavigate } from 'react-router-dom';

const styles = {
  logo: {
    width: '220px',
    height: '50px',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: '25px',
    overflow: 'hidden',
    background: 'linear-gradient(90deg, #00c9ff 0%, #92fe9d 100%)',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    cursor: 'pointer',
    transition: 'transform 0.2s ease-in-out',
    padding: '0 15px',
    '&:hover': {
      transform: 'scale(1.05)',
    },
  },
  textContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flex: 1,
  },
  text: {
    fontWeight: 'bold',
    fontSize: '1.2rem',
    color: '#fff',
    textShadow: '1px 1px 2px rgba(0,0,0,0.2)',
    letterSpacing: '0.5px',
  },
  iconContainer: {
    width: '36px',
    height: '36px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: '18px',
    boxShadow: '-2px 0 4px rgba(0,0,0,0.1)',
  },
  icon: {
    color: '#00c9ff',
    fontSize: '22px',
  },
};

const Logo = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/home');
  };

  return (
    <Button
      onClick={handleClick}
      sx={styles.logo}
      disableRipple
    >
      <Box sx={styles.textContainer}>
        <Typography sx={styles.text}>EVENT GAMING</Typography>
      </Box>
      <Box sx={styles.iconContainer}>
        <SportsEsportsIcon sx={styles.icon} />
      </Box>
    </Button>
  );
};

export default Logo;