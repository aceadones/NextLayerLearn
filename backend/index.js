require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const axios = require('axios');
const multer = require('multer');
const FormData = require('form-data');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ ok: true });
});

const SARVAM_API_KEY = process.env.SARVAM_API_KEY;
const SARVAM_BASE_URL = 'https://api.sarvam.ai';
const CHAT_MODEL = process.env.SARVAM_CHAT_MODEL || 'sarvam-30b';

if (!SARVAM_API_KEY) {
  console.error('Missing SARVAM_API_KEY in environment (.env)');
  process.exit(1);
}

// Multer setup for audio file uploads
const upload = multer({ storage: multer.memoryStorage() });

// 1. STT (Speech to Text)
app.post('/stt', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No audio file provided' });
    }

    const language = req.body.language || req.body.language_code || 'hi-IN';

    const formData = new FormData();
    formData.append('file', req.file.buffer, {
      filename: req.file.originalname || 'audio.wav',
      contentType: req.file.mimetype || 'audio/wav',
    });
    formData.append('model', 'saarika:v2.5');
    formData.append('language_code', language);

    const response = await axios.post(`${SARVAM_BASE_URL}/speech-to-text`, formData, {
      headers: {
        'api-subscription-key': SARVAM_API_KEY,
        ...formData.getHeaders(),
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('STT Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'STT failed', details: error.response?.data || error.message });
  }
});

// 2. Chat / Teaching
app.post('/chat', async (req, res) => {
  try {
    const { message, language, history = [] } = req.body;

    const systemPrompt = `You are a helpful and patient teacher for Indian regional users. 
You must respond in the user's selected language (${language}).
Use very simple words, short sentences, and step-by-step teaching.
Assume the user is a beginner.`;

    const safeHistory = (history || []).filter(
      (m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string'
    );

    const messages = [
      { role: 'system', content: systemPrompt },
      ...safeHistory,
      { role: 'user', content: message },
    ];

    const response = await axios.post(
      `${SARVAM_BASE_URL}/v1/chat/completions`,
      {
        model: CHAT_MODEL,
        messages,
        temperature: 0.7,
        max_tokens: 400,
        reasoning_effort: null,
      },
      {
        headers: {
          Authorization: `Bearer ${SARVAM_API_KEY}`,
          'api-subscription-key': SARVAM_API_KEY,
          'Content-Type': 'application/json',
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Chat Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Chat failed', details: error.response?.data || error.message });
  }
});

// 3. TTS (Text to Speech)
app.post('/tts', async (req, res) => {
  try {
    const { text, language = 'hi-IN', speaker = 'shubh' } = req.body;

    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Missing text' });
    }

    const response = await axios.post(`${SARVAM_BASE_URL}/text-to-speech`, {
      text,
      target_language_code: language,
      speaker,
      model: 'bulbul:v3',
      output_audio_codec: 'wav',
    }, {
      headers: {
        'api-subscription-key': SARVAM_API_KEY,
        'Content-Type': 'application/json',
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('TTS Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'TTS failed', details: error.response?.data || error.message });
  }
});

app.listen(port, () => {
  console.log(`Backend proxy running on port ${port}`);
});
