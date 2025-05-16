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
    'https://aimansalim.com',
    'https://*.aimansalim.com',
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
      
      // Try direct yt-dlp approach as a last resort
      try {
        console.log('Attempting direct yt-dlp approach');
        const { spawn } = require('child_process');
        
        // Extract channel handle from URL
        let channelHandle = decodedUrl;
        if (decodedUrl.includes('@')) {
          const match = decodedUrl.match(/@([^/\s?&]+)/);
          if (match && match[1]) {
            channelHandle = match[1];
          } else {
            channelHandle = decodedUrl.replace('https://www.youtube.com/@', '');
          }
        }
        
        const ytDlpArgs = [
          '--get-id',
          '--no-download',
          '--no-warnings',
          '--flat-playlist',
          '--playlist-end', '40',
          '--match-filter', '!is_shorts & duration > 60',  // Exclude shorts and videos shorter than 60 seconds
          `https://www.youtube.com/@${channelHandle}`
        ];
        
        if (startDate && endDate) {
          ytDlpArgs.push('--dateafter', startDate);
          ytDlpArgs.push('--datebefore', endDate);
        }
        
        const directThumbnails = await new Promise((resolve, reject) => {
          const ytDlpProcess = spawn('yt-dlp', ytDlpArgs);
          const videoIds = [];
          
          ytDlpProcess.stdout.on('data', (data) => {
            const lines = data.toString().trim().split('\n');
            for (const line of lines) {
              if (line.trim().match(/^[a-zA-Z0-9_-]{11}$/)) {
                videoIds.push(line.trim());
              }
            }
          });
          
          ytDlpProcess.stderr.on('data', (data) => {
            console.error(`[yt-dlp stderr] ${data}`);
          });
          
          ytDlpProcess.on('close', (ytDlpCode) => {
            if (ytDlpCode !== 0 || videoIds.length === 0) {
              reject(new Error("No videos found for this channel"));
              return;
            }
            
            // Create thumbnails from video IDs
            const thumbnails = videoIds.map(videoId => ({
              id: videoId,
              title: `YouTube Video (${videoId})`,
              imageUrl: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
              quality: 'Standard'
            }));
            
            console.log(`Found ${thumbnails.length} video IDs directly with yt-dlp`);
            resolve(thumbnails);
          });
        });
        
        return res.json(directThumbnails);
      } catch (directError) {
        console.error('Error in direct yt-dlp approach:', directError);
        return res.status(500).json({ error: downloadError.message || 'Failed to download thumbnails' });
      }
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