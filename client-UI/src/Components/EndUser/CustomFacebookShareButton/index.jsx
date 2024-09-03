import React from 'react';
import { Button } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';

const CustomFacebookShareButton = ({ event, onShareSuccess }) => {
  const handleShare = async () => {
    const shareUrl = `https://google.com`;
    const quote = `Check out this event: ${event.name} of ${event.enterprise_name}\nStart time at ${event.start_time} and End time at ${event.end_time}`;

    if (window.FB) {
      window.FB.ui({
        method: 'share',
        href: shareUrl,
        quote: quote,
      }, function(response) {
        if (response && !response.error_message) {
          onShareSuccess(event.id);
        }
      });
    } else {
      console.error('Facebook SDK not loaded');
    }
  };

  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<FacebookIcon />}
      onClick={handleShare}
      sx={{ mt: 2 }}
    >
      Share on Facebook
    </Button>
  );
};

export default CustomFacebookShareButton;