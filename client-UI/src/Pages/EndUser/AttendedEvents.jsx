import React, { useState, useEffect } from 'react';
import {
    Container, Typography, Grid, CircularProgress, Button, Snackbar, IconButton,
    Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem, ListItemText,
    Modal, Box,CardMedia
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import MuiAlert from '@mui/material/Alert';
import Layout from '../../Components/EndUser/Layout';
import EventCategory from '../../Components/EndUser/EventCategory';
import { BackEndAddress, getAttendedEvents, addTurnToUser, deleteAttendedEvent, getVouchers, tradeVoucherGacha } from '../../api';

const gradientText = {
    backgroundClip: 'text',
    backgroundImage: 'linear-gradient(45deg, #00c9ff, #92fe9d)',
    color: 'transparent',
    display: 'inline-block',
}

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AttendedEvents = () => {
    const [loading, setLoading] = useState(true);
    const [events, setEvents] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const userNameStore = localStorage.getItem('userName');
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [vouchers, setVouchers] = useState([]);
    const [openVoucherDialog, setOpenVoucherDialog] = useState(false);
    const [selectedEventId, setSelectedEventId] = useState(null);
    const [qrCodeImage, setQrCodeImage] = useState(null);
    const [openQrCodeModal, setOpenQrCodeModal] = useState(false);
    const [isExchangingVoucher, setIsExchangingVoucher] = useState(false);

    useEffect(() => {
        fetchAttendedEvents();

        // Initialize Facebook SDK
        window.fbAsyncInit = function () {
            FB.init({
                appId: 'YOUR_APP_ID', // Replace with your Facebook App ID
                xfbml: true,
                version: 'v12.0'
            });
        };

        // Load Facebook SDK
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }, []);

    const fetchAttendedEvents = async () => {
        try {
            setLoading(true);
            const response = await getAttendedEvents();
            const result = response.data.data
            if (result) {
                setEvents(response.data.data);
            } else {
                setEvents([])
            }
        } catch (error) {
            console.error('Failed to fetch attended events:', error);
            showSnackbar('Failed to fetch attended events', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleShareCallback = async (eventId) => {
        try {
            await addTurnToUser(eventId);
            showSnackbar('Bạn đã được thêm lượt chơi, mời vào game để kiểm tra', 'success');
        } catch (error) {
            console.error('Failed to add a turn to user:', error);
            showSnackbar('Failed to add a turn to user', 'error');
        }
    };

    const handleDeleteEvent = async (eventId) => {
        try {
            await deleteAttendedEvent(eventId);
            showSnackbar('Event deleted successfully', 'success');
            // Refresh the events list
            fetchAttendedEvents();
        } catch (error) {
            console.error('Failed to delete event:', error);
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

    const checkDialogStatus = (eventId) => {
        const pollTimer = window.setInterval(() => {
            if (!isDialogOpen) {
                window.clearInterval(pollTimer);
                handleShareCallback(eventId);
                console.log('Share dialog was closed');
            }
        }, 500);
    };

    const handleShare = (event) => {
        const shareUrl = `http://34.124.217.226:5173`;
        const quote = `Check out this event: ${event.name} of ${event.enterprise_name}\nStart time at ${event.start_time} and End time at ${event.end_time}`;

        return (
            <Button
                variant="contained"
                color="primary"
                startIcon={<span className="fb-share-button"></span>}
                sx={{ mt: 2, mr: 1 }}
                onClick={() => {
                    setIsDialogOpen(true);
                    FB.ui({
                        method: 'share',
                        href: shareUrl,
                        quote: quote,
                        hashtag: `#${event.name}`,
                    }, function (response) {
                        setIsDialogOpen(false);
                        if (response && !response.error_message) {
                            console.log('Shared successfully');
                        } else {
                            console.log('Share cancelled');
                        }
                    });
                    checkDialogStatus(event.id);
                }}
            >
                Share on Facebook
            </Button>
        );
    };

    const handleOpenVoucherDialog = async (eventId) => {
        try {
            const response = await getVouchers(eventId);
            if (!response.data.data) {
                response.data.data = []
            }
            setVouchers(response.data.data);
            setSelectedEventId(eventId);
            setOpenVoucherDialog(true);
        } catch (error) {
            console.error('Failed to fetch vouchers:', error);
            showSnackbar('Failed to fetch vouchers', 'error');
        }
    };

    const handleCloseVoucherDialog = () => {
        setOpenVoucherDialog(false);
        setSelectedEventId(null);
    };

    const handleTradeVoucher = async (voucherId, gameId) => {
        try {
            setIsExchangingVoucher(true);
            const response = await tradeVoucherGacha({ "voucher_id": voucherId, "game_id": gameId });
            setQrCodeImage(response.data.data);
            handleCloseVoucherDialog();
            setOpenQrCodeModal(true);
        } catch (error) {
            console.error('Failed to trade voucher:', error);
            showSnackbar('Bạn chưa sưu tầm đủ danh sách vật phẩm của game, hãy cày tiếp nhé !!');
        } finally {
            setIsExchangingVoucher(false);
        }
    };

    const handleCloseQrCodeModal = () => {
        setOpenQrCodeModal(false);
        setQrCodeImage(null);
    };

    return (
        <Layout isLoggedIn={true} username={userNameStore}>
            <Container maxWidth="lg" sx={{ mt: 4, mb: 16 }}>
                <Typography variant="h2" align="center" gutterBottom sx={gradientText}>
                    Attended Events
                </Typography>
                {loading ? (
                    <Grid container justifyContent="center">
                        <CircularProgress />
                    </Grid>
                ) : (
                    <Grid container spacing={4}>
                        {events.map((event) => (
                            <Grid item key={event.id} xs={12} sm={6} md={3}>
                                <EventCategory event={event} showLearnMore={false} />
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    {handleShare(event)}
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => handleOpenVoucherDialog(event.id)}
                                        sx={{ mt: 2, mr: 1 }}
                                    >
                                        Đổi voucher
                                    </Button>
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
            <Dialog open={openVoucherDialog} onClose={handleCloseVoucherDialog}>
                <DialogTitle>Danh sách Voucher</DialogTitle>
                <DialogContent>
                    <List>
                        {vouchers.map((voucher) => (
                            <ListItem key={voucher.id}>
                                <ListItemText primary={voucher.name} secondary={voucher.description} />
                                <CardMedia
                                    component="img"
                                    height="20"
                                    image={`${BackEndAddress}/image/voucherimage/${voucher.images}`}
                                    alt={name}
                                    sx={{
                                        transition: 'transform 0.3s ease-in-out',
                                        '&:hover': {
                                            transform: 'scale(1.05)',
                                        },
                                    }}
                                />
                                <Button
                                    onClick={() => handleTradeVoucher(voucher.id, '90b738ae-8733-4d65-8cfe-305c922722e4')}
                                    disabled={isExchangingVoucher}
                                >
                                    {isExchangingVoucher ? <CircularProgress size={24} /> : 'Đổi'}
                                </Button>
                            </ListItem>
                        ))}
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseVoucherDialog} disabled={isExchangingVoucher}>Đóng</Button>
                </DialogActions>
            </Dialog>
            <Modal
                open={openQrCodeModal}
                onClose={handleCloseQrCodeModal}
                aria-labelledby="qr-code-modal-title"
                aria-describedby="qr-code-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                    textAlign: 'center',
                }}>
                    <Typography id="qr-code-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
                        Chúc mừng bạn đã đổi voucher thành công!
                    </Typography>
                    <Typography id="qr-code-modal-description" sx={{ mt: 2, mb: 2 }}>
                        Hãy sử dụng mã QR code này để nhận phần thưởng của bạn.
                    </Typography>
                    {qrCodeImage && (
                        <img src={`${BackEndAddress}/image/vouchercode/${qrCodeImage}`} alt="QR Code" style={{ maxWidth: '100%', height: 'auto' }} />
                    )}
                    <Button onClick={handleCloseQrCodeModal} sx={{ mt: 2 }}>Đóng</Button>
                </Box>
            </Modal>
        </Layout>
    );
};

export default AttendedEvents;