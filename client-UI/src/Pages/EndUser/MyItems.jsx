import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardMedia, CardContent, CircularProgress } from '@mui/material';
import Layout from '../../Components/EndUser/Layout';
import { getMyItems } from '../../api';

const gradientText = {
    backgroundClip: 'text',
    backgroundImage: 'linear-gradient(45deg, #00c9ff, #92fe9d)',
    color: 'transparent',
    display: 'inline-block',
}

const MyItems = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const userNameStore = localStorage.getItem('userName');

    useEffect(() => {
        const fetchMyItems = async () => {
            try {
                setLoading(true);
                const response = await getMyItems();
                const result = response.data.data
                if (result) {
                    setItems(result);
                } else {
                    setItems([])
                }
            } catch (error) {
                console.error('Failed to fetch items:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMyItems();
    }, []);

    return (
        <Layout isLoggedIn={true} username={userNameStore}>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Typography variant="h2" align="center" gutterBottom sx={gradientText}>
                    My Items
                </Typography>
                {loading ? (
                    <Grid container justifyContent="center">
                        <CircularProgress />
                    </Grid>
                ) : (
                    <Grid container spacing={4}>
                        {items.map((item) => (
                            <Grid item key={item.id} xs={12} sm={6} md={3}>
                                <Card>
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={item.image}
                                        alt={item.name}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {item.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Game: {item.game_name}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Container>
        </Layout>
    );
};

export default MyItems;