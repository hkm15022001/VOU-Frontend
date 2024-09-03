import { useState, useEffect } from 'react';

const useFacebookSDK = () => {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);

  useEffect(() => {
    if (!window.FB) {
      window.fbAsyncInit = function() {
        window.FB.init({
          appId: '497873162883439', // Thay thế bằng App ID của bạn
          autoLogAppEvents: true,
          xfbml: true,
          version: 'v11.0'
        });
        setIsSDKLoaded(true);
      };

      // Load the SDK asynchronously
      (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
    } else {
      setIsSDKLoaded(true);
    }
  }, []);

  return isSDKLoaded;
};

export default useFacebookSDK;