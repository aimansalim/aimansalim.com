const express = require('express');
const path = require('path');
const cors = require('cors');
const { downloadThumbnails, createCollage } = require('./src/api/thumbnailApi');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware per parsing JSON e CORS
app.use(express.json());
app.use(cors({
  origin: [
    'http://localhost:5173', 
    'http://127.0.0.1:5173',
    'https://thumbnail-downloader.pages.dev',
    'https://staging.thumbnail-downloader.pages.dev',
    process.env.API_URL || '',
    new URL(process.env.API_URL || 'http://localhost').origin
  ].filter(Boolean),
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Accesso ai file statici
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint base per controllo disponibilità API
app.get('/api', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'API disponibile' });
});

// API per ottenere thumbnail dal canale (GET)
app.get('/api/channel-thumbnails', async (req, res) => {
  try {
    console.log('Received GET request to /api/channel-thumbnails');
    const { channelUrl, startDate, endDate } = req.query;
    
    // Validazione base
    if (!channelUrl) {
      return res.status(400).json({ error: 'channelUrl parameter is required' });
    }
    
    console.log(`Fetching thumbnails for channel: ${decodeURIComponent(channelUrl)}`);
    
    // Ensure we have a properly decoded URL
    const decodedUrl = decodeURIComponent(channelUrl);
    
    // Download thumbnail tramite lo script Python
    try {
      const thumbnails = await downloadThumbnails(decodedUrl, startDate, endDate);
      
      // Log response details
      console.log(`Returning ${thumbnails.length} thumbnails`);
      return res.json(thumbnails);
    } catch (downloadError) {
      console.error('Error in downloadThumbnails:', downloadError);
      return res.status(500).json({ error: downloadError.message || 'Failed to download thumbnails' });
    }
  } catch (error) {
    console.error('Uncaught error in GET /api/channel-thumbnails:', error);
    return res.status(500).json({ error: error.message || 'Server error' });
  }
});

// API per download thumbnail
app.post('/api/thumbnails/download', async (req, res) => {
  try {
    const { channelUrl, startDate, endDate } = req.body;
    
    // Validazione base
    if (!channelUrl || !startDate || !endDate) {
      return res.status(400).json({ 
        error: 'Parametri mancanti. Richiesti: channelUrl, startDate, endDate' 
      });
    }
    
    // Download thumbnail tramite lo script Python
    const thumbnails = await downloadThumbnails(channelUrl, startDate, endDate);
    
    res.json({ thumbnails });
  } catch (error) {
    console.error('Errore API /api/thumbnails/download:', error);
    res.status(500).json({ error: error.message });
  }
});

// API per creare un collage
app.post('/api/thumbnails/collage', async (req, res) => {
  try {
    // Creazione collage tramite lo script Python
    const collagePath = await createCollage();
    
    res.json({ collagePath });
  } catch (error) {
    console.error('Errore API /api/thumbnails/collage:', error);
    res.status(500).json({ error: error.message });
  }
});

// Fallback per client-side routing (React)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Avvio server
app.listen(PORT, () => {
  console.log(`Server API thumbnail avviato sulla porta ${PORT}`);
  console.log(`API disponibili:`);
  console.log(`- GET /api (Health check)`);
  console.log(`- GET /api/channel-thumbnails (Get channel thumbnails)`);
  console.log(`- POST /api/thumbnails/download`);
  console.log(`- POST /api/thumbnails/collage`);
}); 