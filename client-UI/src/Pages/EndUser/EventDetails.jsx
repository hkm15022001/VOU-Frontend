import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Typography,
  Box,
  Container,
  Paper,
  Grid,
  CircularProgress,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Layout from '../../Components/EndUser/Layout';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { getEvent, BackEndAddress, getGame, attendEvent } from '../../api';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .1)',
}));

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  paddingTop: '56.25%', // 16:9 aspect ratio
}));

const EndUserEventDetail = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [game, setGame] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [enableButton, setEnableButton] = useState(false);
  const userNameStore = localStorage.getItem('userName');

  useEffect(() => {
    const fetchEventandGameDetails = async () => {
      try {
        const eventResponse = await getEvent(eventId);
        const eventResult = eventResponse.data.data;
        const gameResponse = await getGame(eventResult.game_id);
        const gameResult = gameResponse.data.data;
        if (eventResult && gameResult) {
          setEvent(eventResult);
          setGame(gameResult);
          updateButtonState(eventResult);
        } else {
          setEvent(null);
          setGame(null);
        }
      } catch (error) {
        console.error('Failed to fetch event details:', error);
        setEvent(null);
        setGame(null);
      } finally {
        setLoading(false);
      }
    };

    fetchEventandGameDetails();
  }, [eventId]);

  const updateButtonState = (eventData) => {
    const now = new Date();
    const startDate = new Date(eventData.start_time);
    const endDate = new Date(eventData.end_time);

    if (now >= startDate && now <= endDate) {
      setEnableButton(true);
    } else {
      setEnableButton(false);
    }
  };

  const handleAttendEvent = async () => {
    try {
      await attendEvent(eventId);
      console.log('Successfully attended the event');
      toast.success('Event added to attended list successfully!');
      setOpenDialog(false);
    } catch (error) {
      console.error('Failed to attend event:', error);
      toast.error('Failed to add event to attended list. Please try again.');
    }
  };

  if (loading) {
    return (
      <Layout>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container justifyContent="center">
            <CircularProgress />
          </Grid>
        </Container>
      </Layout>
    );
  }

  if (!event || !game) {
    return (
      <Layout>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Typography variant="h5">Event not found or failed to load.</Typography>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout isLoggedIn={true} username={userNameStore}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <StyledPaper>
          <Typography variant="h3" gutterBottom align="center">
            {event.name}
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <StyledCard>
                <StyledCardMedia
                  image={`${BackEndAddress}/image/event/${event.images}`}
                  title={event.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Event Details
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Organizer: {event.enterprise_name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Start Time: {new Date(event.start_time).toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    End Time: {new Date(event.end_time).toLocaleString()}
                  </Typography>
                  <Button
                    variant="contained"
                    disabled={!enableButton}
                    color="primary"
                    onClick={() => setOpenDialog(true)}
                    sx={{ mt: 2 }}
                    fullWidth
                  >
                    Attend Event
                  </Button>
                </CardContent>
              </StyledCard>
            </Grid>
            <Grid item xs={12} md={6}>
              <StyledCard>
                <StyledCardMedia
                  image={`${BackEndAddress}/image/game/${game.images}`}
                  title={game.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Game: {game.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {game.tutorial}
                  </Typography>
                </CardContent>
              </StyledCard>
            </Grid>
          </Grid>
        </StyledPaper>
      </Container>

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Xác nhận tham gia"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bạn có chắc chắn muốn tham gia sự kiện này không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Hủy</Button>
          <Button onClick={handleAttendEvent} autoFocus>
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </Layout>
  );
};

export default EndUserEventDetail;