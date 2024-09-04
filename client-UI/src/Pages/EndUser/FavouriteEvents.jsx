import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, CircularProgress, IconButton, Snackbar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import MuiAlert from '@mui/material/Alert';
import Layout from '../../Components/EndUser/Layout';
import EventCategory from '../../Components/EndUser/EventCategory';
import { getFavouriteEvents, deleteFavouriteEvent } from '../../api';

const gradientText = {
    backgroundClip: 'text',
    backgroundImage: 'linear-gradient(45deg, #00c9ff, #92fe9d)',
    color: 'transparent',
    display: 'inline-block',
}

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const FavouriteEvents = () => {
    const [loading, setLoading] = useState(true);
    const [events, setEvents] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const userNameStore = localStorage.getItem('userName');

    const fetchFavouriteEvents = async () => {
        try {
            setLoading(true);
            const response = await getFavouriteEvents();
            const result = response.data.data
            if (result) {
                setEvents(result);
            } else {
                setEvents([])
            }
        } catch (error) {
            console.error('Failed to fetch favourite events:', error);
            showSnackbar('Failed to fetch favourite events', 'error');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFavouriteEvents();
    }, []);

    const handleDeleteEvent = async (eventId) => {
        try {
            console.log(eventId)
            await deleteFavouriteEvent(eventId);
            showSnackbar('Event deleted successfully', 'success');
            // Refresh the events list
            fetchFavouriteEvents();
        } catch (error) {
            console.error('Failed to delete favourite event:', error);
            showSnackbar('Failed to delete event', 'error');
        }
    };

    const showSnackbar = (message, severity) => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setOpenSnackbar(true);
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    return (
        <Layout isLoggedIn={true} username={userNameStore}>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 16 }}>
                <Typography variant="h2" align="center" gutterBottom sx={gradientText}>
                    Favourite Events
                </Typography>
                {loading ? (
                    <Grid container justifyContent="center">
                        <CircularProgress />
                    </Grid>
                ) : (
                    <Grid container spacing={4}>
                        {events.map((event) => (
                            <Grid item key={event.id} xs={12} sm={6} md={3}>
                                <EventCategory event={event} showLearnMore={false} showFavorite={false} />
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                    <IconButton
                                        aria-label="delete"
                                        onClick={() => handleDeleteEvent(event.id)}
                                        sx={{ mt: 2 }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </div>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Container>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Layout>
    );
};

export default FavouriteEvents;