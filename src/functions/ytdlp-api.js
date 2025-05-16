/**
 * Serverless function to run yt-dlp in the cloud
 * This file would be deployed to a serverless platform like Vercel, Netlify, or AWS Lambda
 * 
 * It provides an API endpoint that accepts a YouTube channel URL and returns thumbnails
 */

const { spawn } = require('child_process');
const path = require('path');
const os = require('os');
const fs = require('fs');

// Configure CORS headers for browser access
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};

// Main handler function
exports.handler = async (event, context) => {
  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers,
      body: ''
    };
  }

  // Only accept POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    // Parse the request body
    const body = JSON.parse(event.body || '{}');
    const { channelUrl, startDate, endDate, maxResults = 10 } = body;

    // Validate input
    if (!channelUrl) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Channel URL is required' })
      };
    }

    // Run yt-dlp to get channel videos
    const videos = await getChannelThumbnails(channelUrl, startDate, endDate, maxResults);

    // Return the response
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ videos })
    };
  } catch (error) {
    console.error('Error processing request:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: `Error processing request: ${error.message || 'Unknown error'}` 
      })
    };
  }
};

/**
 * Get channel thumbnails using yt-dlp
 */
async function getChannelThumbnails(channelUrl, startDate, endDate, maxResults) {
  // Temporary directory for yt-dlp files
  const tmpDir = path.join(os.tmpdir(), 'yt-dlp-' + Date.now());
  fs.mkdirSync(tmpDir, { recursive: true });

  try {
    // Build yt-dlp command
    const args = [
      '--dump-json',
      '--flat-playlist',
      '--no-download',
      '--max-downloads', String(maxResults),
      '--skip-download'
    ];

    // Add date filters if provided
    if (startDate) {
      args.push('--dateafter', formatDateForYtDlp(startDate));
    }
    if (endDate) {
      args.push('--datebefore', formatDateForYtDlp(endDate));
    }

    // Add the URL
    args.push(channelUrl);

    console.log('Running yt-dlp with args:', args.join(' '));

    // Run yt-dlp command
    const result = await runYtDlp(args, tmpDir);
    console.log(`yt-dlp completed with ${result.videos.length} videos`);

    return result.videos;
  } finally {
    // Clean up temporary directory
    try {
      fs.rmSync(tmpDir, { recursive: true, force: true });
    } catch (error) {
      console.error('Error cleaning up temp directory:', error);
    }
  }
}

/**
 * Format date for yt-dlp (YYYYMMDD)
 */
function formatDateForYtDlp(dateStr) {
  // If already in YYYYMMDD format
  if (/^\d{8}$/.test(dateStr)) {
    return dateStr;
  }

  // Convert from YYYY-MM-DD to YYYYMMDD
  return dateStr.replace(/-/g, '');
}

/**
 * Run yt-dlp command and parse output
 */
async function runYtDlp(args, cwd) {
  return new Promise((resolve, reject) => {
    // In serverless environment, yt-dlp would be installed as a layer or dependency
    const ytDlpPath = process.env.YT_DLP_PATH || 'yt-dlp';
    const ytDlpProcess = spawn(ytDlpPath, args, { cwd });

    let stdout = '';
    let stderr = '';
    const videos = [];

    ytDlpProcess.stdout.on('data', (data) => {
      stdout += data.toString();
      
      // Try to parse each line as JSON
      const lines = stdout.split('\n');
      stdout = lines.pop() || ''; // Keep any incomplete line
      
      for (const line of lines) {
        if (!line.trim()) continue;
        
        try {
          const videoData = JSON.parse(line);
          videos.push({
            id: videoData.id,
            title: videoData.title,
            thumbnailUrl: videoData.thumbnail,
            quality: videoData.resolution && videoData.resolution.includes('1280') ? 'hd' : 'sd',
            uploadDate: videoData.upload_date
          });
        } catch (e) {
          console.warn('Failed to parse line:', line, e);
        }
      }
    });

    ytDlpProcess.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    ytDlpProcess.on('close', (code) => {
      if (code !== 0) {
        console.error(`yt-dlp exited with code ${code}: ${stderr}`);
        return reject(new Error(`yt-dlp failed with code ${code}: ${stderr}`));
      }

      resolve({ videos });
    });

    ytDlpProcess.on('error', (err) => {
      reject(new Error(`Failed to start yt-dlp: ${err.message}`));
    });
  });
}

// For local testing
if (require.main === module) {
  // Test the function
  const testEvent = {
    httpMethod: 'POST',
    body: JSON.stringify({
      channelUrl: 'https://www.youtube.com/@MKBHD',
      maxResults: 5
    })
  };

  exports.handler(testEvent, {}).then(result => {
    console.log('Result:', JSON.stringify(result, null, 2));
  }).catch(err => {
    console.error('Error:', err);
  });
} 