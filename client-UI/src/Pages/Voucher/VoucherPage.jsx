import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import EventList from './EventList';
import Navbar from '../../Components/Navbar/Navbar';
import Sidebar from '../../Components/Sidebar/Sidebar';

const VoucherPage = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <div style={{ width: '250px' }}>
        <Sidebar />
      </div>

      <div style={{ flexGrow: 1 }}>
        <Navbar />

        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Box sx={{ 
            backgroundColor: 'white', 
            borderRadius: '8px', 
            padding: '24px',
            boxShadow: '0 3px 10px rgba(0,0,0,0.1)'
          }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ 
              color: '#333', 
              fontWeight: 'bold',
              borderBottom: '2px solid #f50057',
              paddingBottom: '8px',
              marginBottom: '24px'
            }}>
              Voucher List
            </Typography>
            <EventList />
          </Box>
        </Container>
      </div>
    </div>
  );
};

export default VoucherPage;