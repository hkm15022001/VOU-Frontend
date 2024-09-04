import React, { useState, useEffect } from 'react';
import { 
  Container, Typography, Grid, Card, CardMedia, CardContent, 
  CircularProgress, Button, Dialog, DialogTitle, DialogContent, 
  DialogActions, List, ListItem, ListItemText 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Layout from '../../Components/EndUser/Layout';
import { getMyItems, getVouchers, tradeVoucherGacha } from '../../api';

const gradientText = {
    backgroundClip: 'text',
    backgroundImage: 'linear-gradient(45deg, #00c9ff, #92fe9d)',
    color: 'transparent',
    display: 'inline-block',
};

const MyItems = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [vouchers, setVouchers] = useState([]);
    const [openVoucherDialog, setOpenVoucherDialog] = useState(false);
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

    const handleOpenVoucherDialog = async () => {
        try {
            const response = await getVouchers();
            setVouchers(response.data.data);
            setOpenVoucherDialog(true);
        } catch (error) {
            console.error('Failed to fetch vouchers:', error);
        }
    };

    const handleCloseVoucherDialog = () => {
        setOpenVoucherDialog(false);
    };

    const handleTradeVoucher = async (voucherId, gameId) => {
        try {
            await tradeVoucherGacha({"voucher_id":voucherId, "game_id":gameId});
            // Refresh the items list after successful trade
            const response = await getMyItems();
            setItems(response.data.data);
            handleCloseVoucherDialog();
        } catch (error) {
            console.error('Failed to trade voucher:', error);
        }
    };

    return (
        <Layout isLoggedIn={true} username={userNameStore}>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Typography variant="h2" align="center" gutterBottom sx={gradientText}>
                    My Items
                </Typography>
                {/* <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleOpenVoucherDialog}
                    sx={{ mb: 2 }}
                >
                    Đổi voucher
                </Button> */}
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
                                        image={`/src/Images/characters/${item.images}`}
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