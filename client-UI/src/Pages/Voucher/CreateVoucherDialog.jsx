import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box, Typography } from '@mui/material';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createVoucher, uploadVoucherImage } from '../../api';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const CreateVoucherDialog = ({ open, onClose, eventId, onVoucherCreated }) => {
  const [formData, setFormData] = useState({
    code: '',
    images: '',
    value: '',
    description: '',
    expired_time: new Date(),
    status: 'active',
    voucher_num: '',
  });
  const [selectedFile, setSelectedFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleDateChange = (date) => {
    setFormData(prevData => ({ ...prevData, expired_time: date }));
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageName = '';
      if (selectedFile) {
        const response = await uploadVoucherImage(selectedFile);
        imageName = response.data.data;
      }

      const payload = {
        ...formData,
        images: imageName,
        expired_time: formData.expired_time.toISOString(),
        value: Number(formData.value),
        voucher_num: Number(formData.voucher_num),
      };

      await createVoucher(eventId, payload);
      onVoucherCreated();
      onClose();
    } catch (error) {
      console.error('Error creating voucher:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ backgroundColor: '#1976d2', color: 'white', fontWeight: 'bold' }}>
        Create New Voucher
      </DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <TextField
            name="code"
            label="Voucher Code"
            value={formData.code}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            name="value"
            label="Value"
            type="number"
            value={formData.value}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            name="description"
            label="Description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={3}
            margin="normal"
            variant="outlined"
          />
          <Box sx={{ mt: 2, mb: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Expiry Date and Time
            </Typography>
            <DatePicker
              selected={formData.expired_time}
              onChange={handleDateChange}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              customInput={<TextField fullWidth variant="outlined" />}
            />
          </Box>
          <TextField
            name="voucher_num"
            label="Number of Vouchers"
            type="number"
            value={formData.voucher_num}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <Box sx={{ mt: 2, mb: 2 }}>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="raised-button-file"
              type="file"
              onChange={handleFileChange}
            />
            <label htmlFor="raised-button-file">
              <Button
                variant="outlined"
                component="span"
                startIcon={<CloudUploadIcon />}
                fullWidth
              >
                Upload Voucher Image
              </Button>
            </label>
            {selectedFile && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                Selected file: {selectedFile.name}
              </Typography>
            )}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ padding: '16px 24px' }}>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Create Voucher
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateVoucherDialog;