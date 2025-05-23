#!/usr/bin/env node

/**
 * YouTube Video Fetcher (No API Required)
 * 
 * This script fetches video IDs from the aledellagiusta YouTube channel
 * since May 2021 by scraping the channel page and extracting video data.
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Configuration
const config = {
  channelUrl: 'https://www.youtube.com/@aledellagiusta',
  channelId: 'aledellagiusta', // You'll need to find this
  startDate: new Date('2021-05-01'),
  outputFile: './src/data/youtubeVideos.ts',
  maxVideos: 200
};

// Function to fetch page content
function fetchPage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

// Extract video IDs from YouTube page HTML
function extractVideoIds(html) {
  const videoIds = [];
  
  // Method 1: Look for video IDs in script tags
  const scriptRegex = /"videoId":"([a-zA-Z0-9_-]{11})"/g;
  let match;
  while ((match = scriptRegex.exec(html)) !== null) {
    if (!videoIds.includes(match[1])) {
      videoIds.push(match[1]);
    }
  }
  
  // Method 2: Look for watch URLs
  const watchRegex = /\/watch\?v=([a-zA-Z0-9_-]{11})/g;
  while ((match = watchRegex.exec(html)) !== null) {
    if (!videoIds.includes(match[1])) {
      videoIds.push(match[1]);
    }
  }
  
  // Method 3: Look for thumbnail URLs
  const thumbnailRegex = /https:\/\/i\.ytimg\.com\/vi\/([a-zA-Z0-9_-]{11})/g;
  while ((match = thumbnailRegex.exec(html)) !== null) {
    if (!videoIds.includes(match[1])) {
      videoIds.push(match[1]);
    }
  }
  
  return videoIds;
}

// Get video metadata (title, upload date) from individual video page
async function getVideoMetadata(videoId) {
  try {
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    const html = await fetchPage(videoUrl);
    
    // Extract title
    const titleMatch = html.match(/<title>([^<]+)<\/title>/);
    const title = titleMatch ? titleMatch[1].replace(' - YouTube', '') : `Video ${videoId}`;
    
    // Extract upload date from meta tags
    const dateMatch = html.match(/"uploadDate":"([^"]+)"/);
    const uploadDate = dateMatch ? new Date(dateMatch[1]) : new Date();
    
    // Extract view count
    const viewMatch = html.match(/"viewCount":"(\d+)"/);
    const viewCount = viewMatch ? parseInt(viewMatch[1]) : 0;
    
    return {
      id: videoId,
      title: title.trim(),
      uploadDate,
      viewCount,
      thumbnailUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      videoUrl: `https://youtube.com/watch?v=${videoId}`
    };
  } catch (error) {
    console.error(`Error fetching metadata for ${videoId}:`, error.message);
    return {
      id: videoId,
      title: `Video ${videoId}`,
      uploadDate: new Date(),
      viewCount: 0,
      thumbnailUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      videoUrl: `https://youtube.com/watch?v=${videoId}`
    };
  }
}

// Alternative method: Use RSS feed
async function fetchFromRSS() {
  try {
    // YouTube RSS feed URL (you need to replace with actual channel ID)
    const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${config.channelId}`;
    const rssData = await fetchPage(rssUrl);
    
    const videoIds = [];
    const entryRegex = /<yt:videoId>([a-zA-Z0-9_-]{11})<\/yt:videoId>/g;
    let match;
    
    while ((match = entryRegex.exec(rssData)) !== null) {
      videoIds.push(match[1]);
    }
    
    return videoIds;
  } catch (error) {
    console.error('RSS fetch failed:', error.message);
    return [];
  }
}

// Manual list of known video IDs (as backup)
const knownVideoIds = [
  'P5k2u9DlCho',
  'WQBHdqJTRbE', 
  'bniJeerctfo',
  't1ruNmcNCpU',
  'E3dZFmpyIao',
  'iDZRDU73ax4',
  '-kXlPk9cikM',
  // Add more video IDs manually if needed
];

// Generate TypeScript file with video data
function generateVideoDataFile(videos) {
  const content = `// Auto-generated YouTube video data
// Generated on: ${new Date().toISOString()}

export interface YouTubeVideo {
  id: string;
  title: string;
  uploadDate: string;
  viewCount: number;
  thumbnailUrl: string;
  videoUrl: string;
}

export const youtubeVideos: YouTubeVideo[] = [
${videos.map(video => `  {
    id: '${video.id}',
    title: '${video.title.replace(/'/g, "\\'")}',
    uploadDate: '${video.uploadDate.toISOString().split('T')[0]}',
    viewCount: ${video.viewCount},
    thumbnailUrl: '${video.thumbnailUrl}',
    videoUrl: '${video.videoUrl}'
  }`).join(',\n')}
];

// Filter videos since May 2021
export const videosSince2021 = youtubeVideos.filter(video => 
  new Date(video.uploadDate) >= new Date('2021-05-01')
);

// Convert to gallery items format
export const youtubeGalleryItems = videosSince2021.map(video => ({
  id: \`youtube-\${video.id}\`,
  type: 'thumbnail' as const,
  title: video.title,
  description: 'YouTube thumbnail design',
  imageUrl: video.thumbnailUrl,
  sourceUrl: video.videoUrl,
  aspectRatio: 1.78 // 16:9
}));
`;

  fs.writeFileSync(config.outputFile, content);
  console.log(`✅ Generated ${config.outputFile} with ${videos.length} videos`);
}

// Main execution
async function main() {
  console.log('🎬 Fetching YouTube videos from aledellagiusta channel...\n');
  
  try {
    let videoIds = [];
    
    // Method 1: Try to fetch from channel page
    console.log('📡 Fetching from channel page...');
    try {
      const channelHtml = await fetchPage(config.channelUrl + '/videos');
      const extractedIds = extractVideoIds(channelHtml);
      videoIds = [...videoIds, ...extractedIds];
      console.log(`Found ${extractedIds.length} video IDs from channel page`);
    } catch (error) {
      console.log('❌ Channel page fetch failed:', error.message);
    }
    
    // Method 2: Try RSS feed (if channel ID is available)
    if (config.channelId && config.channelId !== 'UCYourChannelIdHere') {
      console.log('📡 Fetching from RSS feed...');
      try {
        const rssIds = await fetchFromRSS();
        videoIds = [...videoIds, ...rssIds];
        console.log(`Found ${rssIds.length} video IDs from RSS feed`);
      } catch (error) {
        console.log('❌ RSS fetch failed:', error.message);
      }
    }
    
    // Method 3: Use known video IDs as backup
    videoIds = [...videoIds, ...knownVideoIds];
    
    // Remove duplicates
    videoIds = [...new Set(videoIds)];
    console.log(`\n📊 Total unique video IDs found: ${videoIds.length}`);
    
    if (videoIds.length === 0) {
      console.log('❌ No video IDs found. Please check the channel URL or add manual IDs.');
      return;
    }
    
    // Fetch metadata for each video
    console.log('📝 Fetching video metadata...');
    const videos = [];
    
    for (let i = 0; i < Math.min(videoIds.length, config.maxVideos); i++) {
      const videoId = videoIds[i];
      console.log(`Processing ${i + 1}/${Math.min(videoIds.length, config.maxVideos)}: ${videoId}`);
      
      const metadata = await getVideoMetadata(videoId);
      
      // Filter by date
      if (metadata.uploadDate >= config.startDate) {
        videos.push(metadata);
      }
      
      // Rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    // Sort by upload date (newest first)
    videos.sort((a, b) => b.uploadDate - a.uploadDate);
    
    console.log(`\n✅ Found ${videos.length} videos since May 2021`);
    
    // Generate TypeScript file
    generateVideoDataFile(videos);
    
    console.log('\n📋 Next steps:');
    console.log('1. Import the generated file in your gallery component');
    console.log('2. Add the youtubeGalleryItems to your gallery data');
    console.log('3. The thumbnails will be automatically fetched from YouTube');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Helper function to find channel ID
function findChannelId() {
  console.log(`
🔍 To find the channel ID for ${config.channelUrl}:

1. Go to the channel page
2. View page source (Ctrl+U)
3. Search for "channelId" or "externalId"
4. Copy the ID (format: UC followed by 22 characters)
5. Update the channelId in this script

Alternative methods:
- Use online tools like "YouTube Channel ID Finder"
- Check the channel's RSS feed URL
- Use browser developer tools to inspect network requests
`);
}

// Run if called directly
if (require.main === module) {
  if (process.argv.includes('--find-id')) {
    findChannelId();
  } else {
    main();
  }
}

module.exports = {
  fetchPage,
  extractVideoIds,
  getVideoMetadata,
  generateVideoDataFile
}; 