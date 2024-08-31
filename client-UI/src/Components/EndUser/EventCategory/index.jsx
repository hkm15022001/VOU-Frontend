import React from 'react';
import {
  Typography,
  Button,
  IconButton,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Box,
  Grow,
  Chip,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import { BackEndAddress } from '../../../api';
const EventCategory = ({ event }) => {
  const {
    name,
    images,
    game_name,
    start_time,
    end_time,
    user_name
  } = event;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getEventStatus = () => {
    const now = new Date();
    const startDate = new Date(start_time);
    const endDate = new Date(end_time);

    if (now < startDate) {
      return { label: "Upcoming", color: "primary" };
    } else if (now >= startDate && now <= endDate) {
      return { label: "In Progress", color: "success" };
    } else {
      return { label: "Expired", color: "error" };
    }
  };

  const eventStatus = getEventStatus();

  return (
    <Grow in={true} style={{ transformOrigin: '0 0 0' }} timeout={1000}>
      <Card sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease-in-out',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        '&:hover': {
          transform: 'translateY(-10px)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
        },
      }}>
        <CardMedia
          component="img"
          height="200"
          image={`${BackEndAddress}/image/event/${images}`}
          alt={name}
          sx={{
            transition: 'transform 0.3s ease-in-out',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
        />
        <CardContent sx={{ flexGrow: 1, p: 3 }}>
          <Typography gutterBottom variant="h5" component="div" sx={{ 
            fontWeight: 'bold', 
            color: '#333',
            mb: 2,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}>
            {name}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <SportsEsportsIcon sx={{ fontSize: 20, mr: 1, color: '#666' }} />
            <Typography variant="body2" sx={{ color: '#666' }}>
              {game_name}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <AccessTimeIcon sx={{ fontSize: 20, mr: 1, color: '#666' }} />
            <Typography variant="body2" sx={{ color: '#666' }}>
              {formatDate(start_time)} - {formatDate(end_time)}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <PersonIcon sx={{ fontSize: 20, mr: 1, color: '#666' }} />
            <Typography variant="body2" sx={{ color: '#666' }}>
              {user_name}
            </Typography>
          </Box>
          <Chip 
            label={eventStatus.label}
            color={eventStatus.color}
            size="small" 
            sx={{ fontWeight: 'bold', borderRadius: '12px' }} 
          />
        </CardContent>
        <CardActions sx={{ justifyContent: 'space-between', p: 2, pt: 0 }}>
          <Button
            size="small"
            variant="contained"
            sx={{
              bgcolor: 'primary.main',
              color: 'white',
              '&:hover': {
                bgcolor: 'primary.dark',
              },
              borderRadius: '20px',
              textTransform: 'none',
              fontWeight: 'bold',
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
            }}
          >
            Learn More
          </Button>
          <IconButton 
            aria-label="add to favorites" 
            sx={{ 
              color: 'secondary.main',
              '&:hover': {
                bgcolor: 'rgba(245, 0, 87, 0.1)',
              },
            }}
          >
            <StarIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Grow>
  );
};

export default EventCategory;