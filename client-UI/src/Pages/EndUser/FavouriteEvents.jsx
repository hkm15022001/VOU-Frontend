import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, CircularProgress } from '@mui/material';
import Layout from '../../Components/EndUser/Layout';
import EventCategory from '../../Components/EndUser/EventCategory';
import { getFavouriteEvents } from '../../api';
const gradientText = {
    backgroundClip: 'text',
    backgroundImage: 'linear-gradient(45deg, #00c9ff, #92fe9d)',
    color: 'transparent',
    display: 'inline-block',
}
const FavouriteEvents = () => {
    const [loading, setLoading] = useState(true);
    const [events, setEvents] = useState([]);
    const userNameStore = localStorage.getItem('userName');
    useEffect(() => {
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
            } finally {
                setLoading(false);
            }
        };

        fetchFavouriteEvents();
    }, []);

    return (
        <Layout isLoggedIn={true} username={userNameStore}> {/* Replace with actual username */}
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
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
                            </Grid>
                        ))}
                    </Grid>
                )}

            </Container>
        </Layout>
    );
};

export default FavouriteEvents;