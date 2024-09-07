import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Collapse, IconButton, Typography, Box, CircularProgress, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import AddIcon from '@mui/icons-material/Add';
import { getAllEventsForEnterPrise } from '../../api';
import VoucherList from '../../Components/Voucher/VoucherList';
import CreateVoucherDialog from './CreateVoucherDialog';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [expandedEvent, setExpandedEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await getAllEventsForEnterPrise();
      setEvents(response.data.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEventClick = (eventId) => {
    setExpandedEvent(expandedEvent === eventId ? null : eventId);
  };

  const handleCreateVoucher = (eventId) => {
    setSelectedEventId(eventId);
    setOpenCreateDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenCreateDialog(false);
    setSelectedEventId(null);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <List sx={{ width: '100%' }}>
      {events.map((event) => (
        <Box key={event.id} sx={{ mb: 2 }}>
          <ListItem
            sx={{
              bgcolor: 'background.paper',
              borderRadius: '4px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
              '&:hover': {
                bgcolor: '#f5f5f5',
              },
            }}
          >
            <ListItemText 
              primary={
                <Typography variant="h6" sx={{ color: '#333', fontWeight: 'bold' }}>
                  {event.name}
                </Typography>
              } 
            />
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => handleCreateVoucher(event.id)}
              sx={{ mr: 2 }}
            >
              Create Voucher
            </Button>
            <IconButton edge="end" onClick={() => handleEventClick(event.id)}>
              {expandedEvent === event.id ? <ExpandLessIcon color="primary" /> : <ExpandMoreIcon color="primary" />}
            </IconButton>
          </ListItem>
          <Collapse in={expandedEvent === event.id} timeout="auto" unmountOnExit>
            <VoucherList eventId={event.id} />
          </Collapse>
        </Box>
      ))}
      <CreateVoucherDialog
        open={openCreateDialog}
        onClose={handleCloseDialog}
        eventId={selectedEventId}
        onVoucherCreated={fetchEvents}
      />
    </List>
  );
};

export default EventList;