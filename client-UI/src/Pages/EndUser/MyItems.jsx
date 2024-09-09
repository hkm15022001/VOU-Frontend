import React, { useState, useEffect } from 'react';
import {
    Container, Typography, Grid, Card, CardMedia, CardContent,
    CircularProgress, Button, Dialog, DialogTitle, DialogContent,
    DialogActions, TextField, Snackbar
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Layout from '../../Components/EndUser/Layout';
import { getMyItems, giveItem } from '../../api';

const gradientText = {
    backgroundClip: 'text',
    backgroundImage: 'linear-gradient(45deg, #00c9ff, #92fe9d)',
    color: 'transparent',
    display: 'inline-block',
};

const MyItems = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loading2, setLoading2] = useState(false);
    const [openGiveDialog, setOpenGiveDialog] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [receiverEmail, setReceiverEmail] = useState('');
    const [giveAmount, setGiveAmount] = useState(1);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const userNameStore = localStorage.getItem('userName');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMyItems = async () => {
            try {
                setLoading(true);
                const response = await getMyItems();
                const result = response.data.data;
                if (result) {
                    setItems(result);
                } else {
                    setItems([]);
                }
            } catch (error) {
                console.error('Failed to fetch items:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMyItems();
    }, []);

    const handleOpenGiveDialog = (item) => {
        setSelectedItem(item);
        setOpenGiveDialog(true);
    };

    const handleCloseGiveDialog = () => {
        setOpenGiveDialog(false);
        setSelectedItem(null);
        setReceiverEmail('');
        setGiveAmount(1);
    };

    const handleGiveItem = async () => {
        try {
            setLoading2(true)
            await giveItem({
                item_id: selectedItem.id,
                receiver_email: receiverEmail,
                number: giveAmount
            });
            setSnackbarMessage(`Successfully gave ${giveAmount} ${selectedItem.name}(s) to ${receiverEmail}`);
            setSnackbarOpen(true);
            handleCloseGiveDialog();
            // Refresh the items list
            const response = await getMyItems();
            setItems(response.data.data);
        } catch (error) {
            console.error('Failed to give item:', error);
            setSnackbarMessage('Failed to give item. Please try again.');
            setSnackbarOpen(true);
        } finally {
            setLoading2(false)
        }
    };

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
                                        image={`/Images/characters/${item.images}`}
                                        alt={item.name}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {item.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            GameId: {item.game_id}
                                        </Typography>
                                        <Typography variant="body1" color="text.secondary">
                                            Count: {item.number}
                                        </Typography>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleOpenGiveDialog(item)}
                                            sx={{ mt: 2 }}
                                        >
                                            Give my friend
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}

                <Dialog open={openGiveDialog} onClose={handleCloseGiveDialog}>
                    <DialogTitle>Give Item to Friend</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="receiver-email"
                            label="Friend's Email"
                            type="email"
                            fullWidth
                            variant="standard"
                            value={receiverEmail}
                            onChange={(e) => setReceiverEmail(e.target.value)}
                        />
                        <TextField
                            margin="dense"
                            id="give-amount"
                            label="Amount to Give"
                            type="number"
                            fullWidth
                            variant="standard"
                            value={giveAmount}
                            onChange={(e) => setGiveAmount(Math.max(1, parseInt(e.target.value)))}
                            inputProps={{ min: 1, max: selectedItem?.number }}
                        />
                    </DialogContent>
                    {
                        loading2 ? (
                            <Grid container justifyContent="center">
                                <CircularProgress />
                            </Grid>
                        ) : (
                            <DialogActions>
                                <Button onClick={handleCloseGiveDialog}>Cancel</Button>
                                <Button onClick={handleGiveItem}>Give</Button>
                            </DialogActions>
                        )
                    }
                </Dialog>

                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={6000}
                    onClose={() => setSnackbarOpen(false)}
                    message={snackbarMessage}
                />
            </Container>
        </Layout>
    );
};

export default MyItems;