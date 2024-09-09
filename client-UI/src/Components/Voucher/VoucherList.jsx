import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, IconButton, Typography, Box, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageIcon from '@mui/icons-material/Image';
import { getVoucherByEvent, BackEndAddress, deleteVoucher } from '../../api';

const VoucherList = ({ eventId }) => {
  const [vouchers, setVouchers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVouchers();
  }, [eventId]);

  const fetchVouchers = async () => {
    setLoading(true);
    try {
      const response = await getVoucherByEvent(eventId);
      let voucherResponse = response.data.data
      if (!voucherResponse) {
        voucherResponse = []
      }
      setVouchers(voucherResponse);
    } catch (error) {
      console.error('Error fetching vouchers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteVoucher = async (voucherId) => {
    // Implement delete functionality here
    console.log('Delete voucher:', voucherId);
    try {
       await deleteVoucher(voucherId);
      fetchVouchers()
    } catch (error) {
      console.error('Error delete vouchers:', error);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <List sx={{ pl: 4 }}>
      {vouchers.map((voucher) => (
        <ListItem
          key={voucher.id}
          secondaryAction={
            <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteVoucher(voucher.id)}>
              <DeleteIcon />
            </IconButton>
          }
          sx={{ bgcolor: 'background.paper', mb: 1, borderRadius: 1 }}
        >
          <ListItemAvatar>
            <Avatar
              alt={voucher.name}
              src={`${BackEndAddress}/image/voucherimage/${voucher.images}`}
              sx={{ width: 60, height: 60 }}
            >
              <ImageIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={voucher.name}
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: 'inline' }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {voucher.description}
                </Typography>
              </React.Fragment>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

export default VoucherList;