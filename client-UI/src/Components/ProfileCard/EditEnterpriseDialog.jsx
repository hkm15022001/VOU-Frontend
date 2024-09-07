import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Grid } from '@mui/material';
import LocationMap from '../LocationMap/LocationMap';
import { updateEnterprise } from '../../api';

const EditEnterpriseDialog = ({ open, handleClose, data, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: data.name,
    field: data.field,
    location: data.location,
    gps: data.gps
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLocationSelect = (locationData) => {
    setFormData({
      ...formData,
      location: locationData.location,
      gps: `${locationData.latitude},${locationData.longitude}`
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateEnterprise(formData);
      onUpdate(formData);
      handleClose();
    } catch (error) {
      console.error('Error updating enterprise:', error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>Edit Enterprise</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                margin="normal"
                name="name"
                label="Name"
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                margin="normal"
                name="field"
                label="Field"
                value={formData.field}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <LocationMap onSelect={handleLocationSelect} initialLocation={{
                latitude: formData.latitude,
                longitude: formData.longitude
              }} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                margin="normal"
                name="location"
                label="Location"
                value={formData.location}
                disabled
                helperText="This field is updated automatically when you select a location on the map"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                margin="normal"
                name="latitude"
                label="Latitude"
                value={formData.gps}
                disabled
                helperText="Updated from map selection"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained" color="primary">
            Update
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditEnterpriseDialog;