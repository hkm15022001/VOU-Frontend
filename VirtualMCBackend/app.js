const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const FPT_API_URL = 'https://api.fpt.ai/hmi/tts/v5';
const FPT_API_KEY = 'Zi9SpaKvHBgrAmnLpR8ZgPMBUHck8rCe';

app.post('/api/tts', async (req, res) => {
  try {
    const { text } = req.body;
    const response = await axios({
      method: 'post',
      url: FPT_API_URL,
      headers: {
        'api-key': FPT_API_KEY,
        'speed': '',
        'voice': 'banmai',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: text
    });

    if (response.data && response.data.async) {
      const audioUrl = response.data.async;
      res.json({ audioUrl });
    } else {
      throw new Error('Không nhận được URL audio từ API FPT');
    }
  } catch (error) {
    console.error('Error calling FPT TTS API:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 5175;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});