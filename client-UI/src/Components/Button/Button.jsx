import Button from '@mui/material/Button';
import React from 'react';

export default function CustomButton({content, onClickHandle, type}) {
  return (
    <Button  style= {{ marginTop: 20,marginRight: 20}}
      variant="contained" 
      color="primary" 
      size="large" 
      type={type}
      sx={{
        borderRadius: '20px', 
        textTransform: 'none', 
        fontWeight: 'bold',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        padding: '10px 20px',
      }}
      onClick={onClickHandle}
    >
      {content}
    </Button>
  );
}