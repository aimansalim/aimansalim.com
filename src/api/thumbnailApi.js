/**
 * ThumbnailApi - Modulo che gestisce le chiamate API per scaricare le copertine di YouTube
 * 
 * Questo modulo fa da bridge tra il frontend React e lo strumento Python di backend
 * per scaricare le thumbnail di YouTube e creare collage.
 */

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Script paths
const THUMBNAIL_DIR = '/Users/aiman/Biz/Aiman/Coding/thumbnail-download';
const SCRIPT_PATH = path.join(THUMBNAIL_DIR, 'scarica_copertine_yt.py');
const COLLAGE_SCRIPT_PATH = path.join(THUMBNAIL_DIR, 'collage_thumbnails.py');
const THUMBNAILS_DIR = path.join(THUMBNAIL_DIR, 'thumbnails');
const PUBLIC_THUMBNAILS_DIR = path.join(process.cwd(), 'public/thumbnails');
const PUBLIC_COLLAGES_DIR = path.join(process.cwd(), 'public/collages');

// Path to Python executable - use the .venv which has aiohttp installed
let PYTHON_VENV = path.join(THUMBNAIL_DIR, '.venv/bin/python');

// Maximum videos to fetch when no date range is specified
const MAX_VIDEOS_DEFAULT = 20;
// For date range queries, don't use a video limit, rely on the date range
const MAX_VIDEOS_WITH_DATE_RANGE = 0; // 0 means no limit, use date range for filtering

// Increase timeout to 30 seconds instead of 8
const PYTHON_TIMEOUT = 30000;

// Assicurati che le directory esistano
try {
  fs.mkdirSync(PUBLIC_THUMBNAILS_DIR, { recursive: true });
  fs.mkdirSync(PUBLIC_COLLAGES_DIR, { recursive: true });
} catch (error) {
  console.error('Errore nella creazione delle directory:', error);
}

/**
 * Esegue lo script Python per scaricare le thumbnail da un canale YouTube
 * @param {string} channelUrl - URL del canale YouTube
 * @param {string} startDate - Data di inizio nel formato AAAAMMGG
 * @param {string} endDate - Data di fine nel formato AAAAMMGG
 * @returns {Promise<Array>} - Array di oggetti thumbnail
 */
async function downloadThumbnails(channelUrl, startDate, endDate) {
  console.log(`[API] Starting downloadThumbnails with: ${channelUrl}, ${startDate || 'no start date'}, ${endDate || 'no end date'}`);
  
  const hasDateRange = startDate && endDate;
  
  if (hasDateRange) {
    console.log(`[API] Date range specified: ${startDate} to ${endDate}`);
    console.log(`[API] Using date range for filtering instead of video limit`);
  } else {
    console.log(`[API] No date range specified, using default limit of ${MAX_VIDEOS_DEFAULT} videos`);
  }
  
  return new Promise((resolve, reject) => {
    // Verifica che lo script Python esista
    if (!fs.existsSync(SCRIPT_PATH)) {
      console.error(`[API] Python script not found: ${SCRIPT_PATH}`);
      return reject(new Error(`Script Python non trovato: ${SCRIPT_PATH}`));
    }
    
    // Verifica che la directory del thumbnail esista
    if (!fs.existsSync(THUMBNAIL_DIR)) {
      console.error(`[API] Thumbnail directory not found: ${THUMBNAIL_DIR}`);
      return reject(new Error(`Directory not found: ${THUMBNAIL_DIR}`));
    }
    
    // Build the arguments based on what's available
    const pythonArgs = [SCRIPT_PATH, channelUrl];
    
    // Use a higher video limit if date range is specified (0 means use date range only)
    const maxVideos = hasDateRange ? MAX_VIDEOS_WITH_DATE_RANGE : MAX_VIDEOS_DEFAULT;
    
    // Only add dates if they're provided - NOTE: The script expects positional arguments
    if (hasDateRange) {
      pythonArgs.push(startDate, endDate);
    }
    
    // Full command for logging
    console.log(`[API] Executing Python script from ${THUMBNAIL_DIR}: ${path.basename(SCRIPT_PATH)} ${channelUrl} ${startDate || ''} ${endDate || ''}`);
    console.log(`[API] Using video limit: ${maxVideos === 0 ? 'No limit (using date range)' : maxVideos}`);
    
    const options = {
      cwd: THUMBNAIL_DIR,  // Run from the thumbnail-download directory
      env: { 
        ...process.env, 
        PYTHONPATH: THUMBNAIL_DIR,
        PYTHONUNBUFFERED: '1',  // Ensure Python output isn't buffered
        MAX_VIDEOS: String(maxVideos),  // Send the limit as an environment variable
        USE_DATE_RANGE: hasDateRange ? '1' : '0'  // Tell Python script to prioritize date range
      }
    };
    
    // Use the Python executable from the virtual environment
    console.log(`[API] Using Python executable: ${PYTHON_VENV}`);
    const pythonProcess = spawn(PYTHON_VENV, pythonArgs, options);
    
    const thumbnails = [];
    let errorMessage = '';
    
    // No timeout - let the process run as long as needed
    
    // Gestione dell'output dello script
    pythonProcess.stdout.on('data', (data) => {
      console.log(`[Python stdout] ${data}`);
      try {
        const lines = data.toString().trim().split('\n');
        
        for (const line of lines) {
          if (!line) continue;
          
          try {
            // Check if this is a video ID directly from yt-dlp output
            if (line.trim().match(/^[a-zA-Z0-9_-]{11}$/)) {
              const videoId = line.trim();
              console.log(`[API] Found direct video ID: ${videoId}`);
              
              // Add as thumbnail
              thumbnails.push({
                id: videoId,
                title: `YouTube Video (${videoId})`,
                imageUrl: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
                quality: 'Standard'
              });
              
              continue;
            }
            
            const message = JSON.parse(line);
            
            if (message.type === 'thumbnail') {
              const { videoId, title, url, quality } = message;
              
              // Scarica la thumbnail e salvala nella directory pubblica
              const filename = `${videoId}.jpg`;
              const publicUrl = `/thumbnails/${filename}`;
              
              // Update existing thumbnail or add new one
              const existingIndex = thumbnails.findIndex(t => t.id === videoId);
              
              if (existingIndex >= 0) {
                thumbnails[existingIndex] = {
                  id: videoId,
                  title, // Update the title in case it was initially "Loading..."
                  imageUrl: url || publicUrl,
                  quality
                };
              } else {
              thumbnails.push({
                id: videoId,
                title,
                  imageUrl: url || publicUrl,
                quality
              });
              }
              
              // In una vera implementazione, qui dovresti salvare l'immagine dalla URL originale
              // nel tuo filesystem pubblico. Per ora, simuliamo questo passaggio.
              // Es: downloadImage(url, path.join(PUBLIC_THUMBNAILS_DIR, filename));
            } else if (message.type === 'error') {
              errorMessage = message.message;
              console.error(`[Python error] ${errorMessage}`);
            } else if (message.type === 'debug') {
              console.log(`[Python debug] ${message.message}`);
            } else if (message.type === 'status') {
              console.log(`[Python status] ${message.message}`);
              
              // If the script found videos but isn't processing them, extract the count
              const videoFoundMatch = message.message.match(/Found (\d+) videos/);
              if (videoFoundMatch && parseInt(videoFoundMatch[1]) > 0) {
                console.log(`[API] Python script found ${videoFoundMatch[1]} videos but isn't processing them`);
              }
            }
          } catch (parseError) {
            // This might be direct output from yt-dlp with video IDs
            console.log(`[API] Non-JSON output: ${line}`);
          }
        }
      } catch (error) {
        console.error('[API] Error parsing Python output:', error);
      }
    });
    
    // Gestione degli errori
    pythonProcess.stderr.on('data', (data) => {
      console.error(`[Python stderr] ${data}`);
      errorMessage += data.toString();
    });
    
    // Gestione completamento
    pythonProcess.on('close', (code) => {
      console.log(`[API] Python process exited with code ${code}`);
      
      if (code !== 0) {
        console.error(`[API] Process terminated with code ${code}: ${errorMessage}`);
        
        // If we have thumbnails despite the error, return them anyway
        if (thumbnails.length > 0) {
          console.log(`[API] Returning ${thumbnails.length} thumbnails despite process error`);
          return resolve(thumbnails);
        }
        
        return reject(new Error(`Process terminated with code ${code}: ${errorMessage}`));
      }
      
      if (thumbnails.length === 0) {
        console.warn("[API] No thumbnails found from the Python script");
        
        // Try to get video IDs directly using yt-dlp
        console.log("[API] Attempting to get video IDs directly with yt-dlp");
        
        const ytDlpArgs = [
          '--get-id',
          '--no-download',
          '--no-warnings',
          '--flat-playlist',
          '--playlist-end', '40',
          '--match-filter', '!is_shorts & duration > 60',  // Exclude shorts and videos shorter than 60 seconds
          `https://www.youtube.com/@${channelUrl.replace(/^.*@/, '')}`
        ];
        
        if (startDate && endDate) {
          ytDlpArgs.push('--dateafter', startDate);
          ytDlpArgs.push('--datebefore', endDate);
        }
        
        const ytDlpProcess = spawn('yt-dlp', ytDlpArgs, {
          cwd: THUMBNAIL_DIR
        });
        
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
          if (ytDlpCode !== 0) {
            console.error(`[API] yt-dlp process exited with code ${ytDlpCode}`);
            return reject(new Error("No thumbnails found for this channel"));
          }
          
          if (videoIds.length === 0) {
            return reject(new Error("No thumbnails found for this channel"));
          }
          
          // Create thumbnails from video IDs
          const directThumbnails = videoIds.map(videoId => ({
            id: videoId,
            title: `YouTube Video (${videoId})`,
            imageUrl: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
            quality: 'Standard'
          }));
          
          console.log(`[API] Found ${directThumbnails.length} video IDs directly with yt-dlp`);
          resolve(directThumbnails);
        });
        
        return;
      }
      
      console.log(`[API] Successfully found ${thumbnails.length} thumbnails`);
      resolve(thumbnails);
    });
    
    pythonProcess.on('error', (err) => {
      console.error('[API] Failed to start Python process:', err);
      reject(new Error(`Failed to start Python process: ${err.message}`));
    });
  });
}

/**
 * Crea un collage dalle thumbnail scaricate
 * @returns {Promise<string>} - Path del collage generato
 */
async function createCollage() {
  return new Promise((resolve, reject) => {
    // Verifica che lo script Python esista
    if (!fs.existsSync(COLLAGE_SCRIPT_PATH)) {
      return reject(new Error(`Script collage non trovato: ${COLLAGE_SCRIPT_PATH}`));
    }
    
    // Use only the script name, and run it from the thumbnail directory
    const scriptName = path.basename(COLLAGE_SCRIPT_PATH);
    console.log(`[API] Executing collage script from ${THUMBNAIL_DIR} using virtual env Python at ${PYTHON_VENV}`);
    console.log(`[API] Command: ${PYTHON_VENV} ${scriptName}`);
    
    // Esegui lo script Python per il collage
    const options = {
      cwd: THUMBNAIL_DIR,  // Run from the thumbnail-download directory
      env: { 
        ...process.env, 
        PYTHONPATH: THUMBNAIL_DIR,
        PYTHONUNBUFFERED: '1'  // Ensure Python output isn't buffered
      }
    };
    
    // Use the virtual environment Python instead of system Python
    const pythonProcess = spawn(PYTHON_VENV, [COLLAGE_SCRIPT_PATH], options);
    
    let collageFilePath = '';
    let errorMessage = '';
    
    // Gestione dell'output dello script
    pythonProcess.stdout.on('data', (data) => {
      console.log(`[Python stdout] ${data}`);
      try {
        const lines = data.toString().trim().split('\n');
        
        for (const line of lines) {
          if (!line) continue;
          
          try {
            const message = JSON.parse(line);
            
            if (message.type === 'completed' && message.filePath) {
              collageFilePath = message.filePath;
            }
          } catch (parseError) {
            console.error(`[API] JSON parse error for line: ${line}`, parseError);
          }
        }
      } catch (error) {
        console.error('Errore nel parsing dell\'output Python:', error);
      }
    });
    
    // Gestione degli errori
    pythonProcess.stderr.on('data', (data) => {
      console.error(`[Python stderr] ${data}`);
      errorMessage += data.toString();
    });
    
    // Gestione completamento
    pythonProcess.on('close', (code) => {
      console.log(`[API] Python collage process exited with code ${code}`);
      
      if (code !== 0) {
        return reject(new Error(`Processo collage terminato con codice ${code}: ${errorMessage}`));
      }
      
      if (!collageFilePath) {
        return reject(new Error('Lo script non ha restituito alcun path per il collage'));
      }
      
      const publicPath = `/collages/${path.basename(collageFilePath)}`;
      resolve(publicPath);
    });
    
    pythonProcess.on('error', (err) => {
      console.error('[API] Failed to start Python collage process:', err);
      reject(new Error(`Failed to start Python collage process: ${err.message}`));
    });
  });
}

module.exports = {
  downloadThumbnails,
  createCollage
};