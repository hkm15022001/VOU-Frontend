import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { BackEndAddress, addEventToFavourite, getGame } from '../../../api';
import { toast, ToastContainer } from 'react-toastify';

const EventCategory = ({
  event,
  showLearnMore = true,
  showPlay = true,
  showFavorite = true
}) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [game, setGame] = useState(null);

  const {
    id,
    name,
    images,
    game_name,
    game_id,
    start_time,
    end_time,
    enterprise_name,
  } = event;
  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const gameResponse = await getGame(game_id);
        const gameResult = gameResponse.data.data;
        setGame(gameResult);
      } catch (error) {
        console.error('Failed to fetch event details:', error);
      }
    };

    fetchGameDetails();
  }, [id]);
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

  const handleLearnMore = () => {
    navigate(`/end-user/event/${id}`);
  };

  const handleAddToFavorite = async () => {
    try {
      await addEventToFavourite(id);
      toast.success('Event added to favorites successfully!');
      setOpen(false);
    } catch (error) {
      toast.error('Failed to add event to favorites. Please try again.');
      setOpen(false);
    }
  };

  const handlePlay = async () => {
    navigate(`/end-user/game/${game.type}`);

  };

  return (
    <>
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
                {enterprise_name}
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
            {showLearnMore && (
              <Button
                size="small"
                variant="contained"
                onClick={handleLearnMore}
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
            )}
            {showPlay && (
              <Button
                size="small"
                variant="contained"
                startIcon={<PlayArrowIcon />}
                onClick={handlePlay}
                sx={{
                  bgcolor: 'secondary.main',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'secondary.dark',
                  },
                  borderRadius: '20px',
                  textTransform: 'none',
                  fontWeight: 'bold',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
                }}
              >
                Play
              </Button>
            )}
            {showFavorite && (
              <IconButton
                aria-label="add to favorites"
                onClick={() => setOpen(true)}
                sx={{
                  color: 'secondary.main',
                  '&:hover': {
                    bgcolor: 'rgba(245, 0, 87, 0.1)',
                  },
                }}
              >
                <StarIcon />
              </IconButton>
            )}
          </CardActions>
        </Card>
      </Grow>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Add to Favorites"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to add this event to your favorite list?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>No</Button>
          <Button onClick={handleAddToFavorite} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </>
  );
};

export default EventCategory;