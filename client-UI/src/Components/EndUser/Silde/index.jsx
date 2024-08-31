// Slide Component
import React, { useState, useEffect } from 'react';
import {
  IconButton,
  Box,
  Fade,

} from '@mui/material';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';


const Slide = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  const navigate = (direction) => {
    setCurrentSlide((prev) => {
      if (direction === 'next') return (prev + 1) % images.length;
      if (direction === 'prev') return (prev - 1 + images.length) % images.length;
      return prev;
    });
  };

  return (
    <Box sx={{ position: 'relative', width: '100%', height: 500, overflow: 'hidden', borderRadius: 4, boxShadow: 3 }}>
      {images.map((image, index) => (
        <Fade key={index} in={index === currentSlide} timeout={1000}>
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              display: index === currentSlide ? 'block' : 'none',
            }}
          >
            <img src={image} alt={`Slide ${index + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <Box sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '50%',
              background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
            }} />
          </Box>
        </Fade>
      ))}
      <IconButton
        onClick={() => navigate('prev')}
        sx={{ position: 'absolute', top: '50%', left: 16, transform: 'translateY(-50%)', bgcolor: 'rgba(0, 0, 0, 0.5)' }}
      >
        <ChevronLeftIcon />
      </IconButton>
      <IconButton
        onClick={() => navigate('next')}
        sx={{ position: 'absolute', top: '50%', right: 16, transform: 'translateY(-50%)', bgcolor: 'rgba(0, 0, 0, 0.5)' }}
      >
        <ChevronRightIcon />
      </IconButton>
      <Box sx={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', display: 'flex' }}>
        {images.map((_, index) => (
          <Box
            key={index}
            onClick={() => setCurrentSlide(index)}
            sx={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: index === currentSlide ? 'secondary.main' : 'rgba(255, 255, 255, 0.5)',
              margin: '0 4px',
              cursor: 'pointer',
              transition: 'all 0.3s',
              '&:hover': {
                backgroundColor: 'secondary.light',
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Slide;