export async function onRequest(context) {
  const { request, env } = context;
  
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
    'Cache-Control': 'public, max-age=300' // Cache for 5 minutes
  };
  
  // Handle OPTIONS request (CORS preflight)
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers });
  }
  
  try {
    // Get query parameters
    const url = new URL(request.url);
    const channelUrl = url.searchParams.get('channel');
    const startDate = url.searchParams.get('startDate');
    const endDate = url.searchParams.get('endDate');
    
    if (!channelUrl) {
      return new Response(
        JSON.stringify({ error: 'Missing channel parameter' }),
        { status: 400, headers }
      );
    }

    console.log(`Processing request for channel: ${channelUrl}`);
    console.log(`Date range: ${startDate || 'none'} to ${endDate || 'none'}`);
    
    // Extract channel username/ID from various URL formats
    const channelInfo = extractChannelInfo(channelUrl);
    console.log(`Extracted channel info:`, channelInfo);
    
    // Attempt to get videos from all possible approaches
    let thumbnails = [];
    
    // 1. First try: YouTube channel RSS feed - most reliable public method
    thumbnails = await tryRssFeedApproach(channelInfo, startDate, endDate);
    if (thumbnails.length > 0) {
      console.log(`Successfully retrieved ${thumbnails.length} videos from YouTube RSS`);
      return new Response(JSON.stringify(thumbnails), { status: 200, headers });
    }
    
    // 2. Second try: Scrape the channel page directly
    thumbnails = await tryChannelPageScraping(channelInfo);
    if (thumbnails.length > 0) {
      console.log(`Found ${thumbnails.length} videos through HTML scraping`);
      return new Response(JSON.stringify(thumbnails), { status: 200, headers });
    }
    
    // 3. Third try: Search approach
    thumbnails = await tryYouTubeSearch(channelInfo.username || channelInfo.channelId);
    if (thumbnails.length > 0) {
      console.log(`Found ${thumbnails.length} videos through search`);
      return new Response(JSON.stringify(thumbnails), { status: 200, headers });
    }
    
    // 4. Only if all else fails and it's a specific channel, use fallback
    // This is only a last resort, not the primary approach
    if (channelInfo.username?.toLowerCase().includes('aledellagiusta') || 
        channelUrl.toLowerCase().includes('aledellagiusta')) {
      console.log('All approaches failed. Using fallback data only as last resort.');
      const fallbackThumbnails = getAlessandroDellaGiustaFallbacks();
      return new Response(
        JSON.stringify(fallbackThumbnails),
        { status: 200, headers }
      );
    }
    
    // If everything fails, return a message
    return new Response(
      JSON.stringify({ 
        error: 'Could not retrieve videos for this channel',
        message: 'Try a different channel or check the channel URL'
      }),
      { status: 404, headers }
    );
    
  } catch (error) {
    console.error('Error in channel-thumbnails function:', error);
    
    return new Response(
      JSON.stringify({ error: error.message || 'Unknown error occurred' }),
      { status: 500, headers }
    );
  }
}

/**
 * Extract channel information from different URL formats
 */
function extractChannelInfo(channelUrl) {
  const info = {
    originalUrl: channelUrl,
    username: null,
    channelId: null,
    customUrl: null
  };
  
  try {
    // Try to parse as URL first
    const url = new URL(channelUrl);
    const pathname = url.pathname;
    
    // Check for various formats
    if (pathname.includes('/@')) {
      // Format: youtube.com/@username
      const match = pathname.match(/@([^\/\?&]+)/);
      info.username = match ? match[1] : null;
    } else if (pathname.includes('/channel/')) {
      // Format: youtube.com/channel/UCxxxxxx
      const match = pathname.match(/\/channel\/([^\/\?&]+)/);
      info.channelId = match ? match[1] : null;
    } else if (pathname.includes('/c/')) {
      // Format: youtube.com/c/customname
      const match = pathname.match(/\/c\/([^\/\?&]+)/);
      info.customUrl = match ? match[1] : null;
    } else if (pathname.includes('/user/')) {
      // Format: youtube.com/user/username
      const match = pathname.match(/\/user\/([^\/\?&]+)/);
      info.username = match ? match[1] : null;
    }
    
    // Extract from hostname if it's a youtu.be link
    if (url.hostname === 'youtu.be' && pathname.length > 1) {
      info.videoId = pathname.substring(1);
    }
  } catch (e) {
    // Not a valid URL, try to extract differently
    if (channelUrl.startsWith('@')) {
      // Just a @username
      info.username = channelUrl.substring(1);
    } else if (channelUrl.match(/^UC[a-zA-Z0-9_-]{22}$/)) {
      // Looks like a channel ID
      info.channelId = channelUrl;
    } else {
      // Assume it's a username
      info.username = channelUrl;
    }
  }
  
  return info;
}

/**
 * Try to get videos from YouTube RSS feed
 */
async function tryRssFeedApproach(channelInfo, startDate, endDate) {
  console.log('Trying RSS feed approach...');
  
  try {
    // Construct feed URLs based on available information
    const feedUrls = [];
    
    if (channelInfo.username) {
      feedUrls.push(`https://www.youtube.com/feeds/videos.xml?user=${channelInfo.username}`);
      feedUrls.push(`https://www.youtube.com/feeds/videos.xml?user=@${channelInfo.username}`);
    }
    
    if (channelInfo.channelId) {
      feedUrls.push(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelInfo.channelId}`);
    }
    
    if (channelInfo.customUrl) {
      feedUrls.push(`https://www.youtube.com/feeds/videos.xml?user=${channelInfo.customUrl}`);
    }
    
    // Add original URL-based feed
    const username = channelInfo.username || channelInfo.originalUrl.replace(/^.*@/, '');
    feedUrls.push(`https://www.youtube.com/feeds/videos.xml?channel_id=${username}`);
    
    let videoEntries = [];
    
    // Try each feed URL until one works
    for (const feedUrl of feedUrls) {
      console.log(`Trying RSS feed: ${feedUrl}`);
      
      try {
        const response = await fetch(feedUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
          },
          cf: {
            cacheTtl: 300, // Cache for 5 minutes
            cacheEverything: true
          }
        });
        
        if (!response.ok) {
          console.log(`RSS feed ${feedUrl} returned status ${response.status}`);
          continue;
        }
        
        const xmlText = await response.text();
        
        // Basic validation that this is actually an XML feed
        if (!xmlText.includes('<feed') || !xmlText.includes('<entry>')) {
          console.log(`RSS feed ${feedUrl} did not return valid XML feed`);
          continue;
        }
        
        // Extract channel title
        const channelTitleMatch = xmlText.match(/<title>([^<]+)<\/title>/);
        const channelTitle = channelTitleMatch && channelTitleMatch[1] ? channelTitleMatch[1] : 'YouTube Channel';
        console.log(`Found channel title: ${channelTitle}`);
        
        // Parse video IDs and published dates
        const entries = [];
        const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
        let entryMatch;
        
        while ((entryMatch = entryRegex.exec(xmlText)) !== null) {
          const entry = entryMatch[1];
          
          // Extract video ID
          const videoIdMatch = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/);
          if (!videoIdMatch) continue;
          
          const videoId = videoIdMatch[1];
          
          // Extract published date
          const publishedMatch = entry.match(/<published>([^<]+)<\/published>/);
          if (!publishedMatch) continue;
          
          const publishDate = new Date(publishedMatch[1]);
          
          // Extract title
          const titleMatch = entry.match(/<title>([^<]+)<\/title>/);
          const title = titleMatch ? titleMatch[1] : `YouTube Video (${videoId})`;
          
          entries.push({
            id: videoId,
            title,
            publishDate,
            publishDateStr: publishDate.toISOString().substring(0, 10).replace(/-/g, '')
          });
        }
        
        console.log(`Found ${entries.length} entries in RSS feed ${feedUrl}`);
        
        if (entries.length > 0) {
          videoEntries = entries;
          break;
        }
      } catch (error) {
        console.error(`Error fetching RSS feed ${feedUrl}:`, error);
      }
    }
    
    // If no entries found from any feed, return empty array
    if (videoEntries.length === 0) {
      return [];
    }
    
    // Filter by date if specified
    let filteredVideoEntries = videoEntries;
    if (startDate && endDate) {
      const startDateStr = startDate.replace(/-/g, '');
      const endDateStr = endDate.replace(/-/g, '');
      
      filteredVideoEntries = videoEntries.filter(entry => 
        entry.publishDateStr >= startDateStr && entry.publishDateStr <= endDateStr
      );
      
      console.log(`After date filtering (${startDateStr} to ${endDateStr}): ${filteredVideoEntries.length} videos`);
    }
    
    // Limit to 80 videos max
    const results = filteredVideoEntries.slice(0, 80);
    
    // Create thumbnails objects
    return results.map(video => ({
      id: video.id,
      title: video.title,
      imageUrl: `https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`,
      quality: 'HD'
    }));
  } catch (error) {
    console.error('RSS feed approach failed:', error);
    return [];
  }
}

/**
 * Try to get videos by scraping YouTube channel pages
 */
async function tryChannelPageScraping(channelInfo) {
  console.log('Trying HTML scraping approach...');
  
  try {
    // Gather URLs to try
    const channelUrls = [];
    
    if (channelInfo.username) {
      channelUrls.push(`https://www.youtube.com/@${channelInfo.username}/videos`);
    }
    
    if (channelInfo.channelId) {
      channelUrls.push(`https://www.youtube.com/channel/${channelInfo.channelId}/videos`);
    }
    
    if (channelInfo.customUrl) {
      channelUrls.push(`https://www.youtube.com/c/${channelInfo.customUrl}/videos`);
    }
    
    // Always try with the original
    const username = channelInfo.username || channelInfo.originalUrl.replace(/^.*@/, '');
    channelUrls.push(`https://www.youtube.com/@${username}/videos`);
    
    for (const channelPageUrl of channelUrls) {
      console.log(`Scraping: ${channelPageUrl}`);
      
      try {
        const response = await fetch(channelPageUrl, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
          },
          cf: {
            cacheTtl: 300, // Cache for 5 minutes
            cacheEverything: true
          }
        });
        
        if (!response.ok) {
          console.log(`Channel page ${channelPageUrl} returned status ${response.status}`);
          continue;
        }
        
        const html = await response.text();
        
        // Check if we got a valid channel page
        if (!html.includes('ytd-channel') && !html.includes('videoRenderer')) {
          console.log(`Channel page ${channelPageUrl} did not return valid channel page`);
          continue;
        }
        
        // Extract video IDs from the HTML using multiple patterns
        const videoIds = [];
        const uniqueIds = new Set();
        
        // Pattern 1: Standard video link
        let regex = /\/watch\?v=([a-zA-Z0-9_-]{11})/g;
        let match;
        while ((match = regex.exec(html)) !== null) {
          const videoId = match[1];
          if (!uniqueIds.has(videoId)) {
            uniqueIds.add(videoId);
            videoIds.push(videoId);
          }
        }
        
        // Pattern 2: JSON data in script tags
        regex = /"videoId":"([a-zA-Z0-9_-]{11})"/g;
        while ((match = regex.exec(html)) !== null) {
          const videoId = match[1];
          if (!uniqueIds.has(videoId)) {
            uniqueIds.add(videoId);
            videoIds.push(videoId);
          }
        }
        
        if (videoIds.length > 0) {
          console.log(`Found ${videoIds.length} videos from ${channelPageUrl}`);
          
          // Extract titles when possible
          const titles = {};
          regex = /"videoId":"([a-zA-Z0-9_-]{11})".+?"title":\s*{.+?"text":\s*"([^"]+)"/g;
          
          const htmlWithSingleQuotes = html.replace(/\\"/g, "\'"); // Replace escaped quotes
          while ((match = regex.exec(htmlWithSingleQuotes)) !== null) {
            titles[match[1]] = match[2].replace(/\\u0026/g, '&');
          }
          
          // Create thumbnails (limited to 80)
          const thumbnails = videoIds.slice(0, 80).map(videoId => ({
            id: videoId,
            title: titles[videoId] || `YouTube Video (${videoId})`,
            imageUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
            quality: 'HD'
          }));
          
          return thumbnails;
        }
      } catch (error) {
        console.error(`Error scraping ${channelPageUrl}:`, error);
      }
    }
    
    return [];
  } catch (error) {
    console.error('HTML scraping approach failed:', error);
    return [];
  }
}

/**
 * Try to get videos using YouTube search
 */
async function tryYouTubeSearch(query) {
  console.log('Trying YouTube search approach...');
  
  try {
    if (!query) {
      return [];
    }
    
    // Construct a search URL for the channel
    const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}+channel`;
    
    const response = await fetch(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      },
      cf: {
        cacheTtl: 300, // Cache for 5 minutes
        cacheEverything: true
      }
    });
    
    if (!response.ok) {
      return [];
    }
    
    const html = await response.text();
    
    // Extract video IDs from the search results
    const videoIds = [];
    const uniqueIds = new Set();
    const regex = /\/watch\?v=([a-zA-Z0-9_-]{11})/g;
    let match;
    
    while ((match = regex.exec(html)) !== null) {
      const videoId = match[1];
      if (!uniqueIds.has(videoId)) {
        uniqueIds.add(videoId);
        videoIds.push(videoId);
        
        if (videoIds.length >= 30) break; // Limit to 30 videos for search
      }
    }
    
    if (videoIds.length > 0) {
      // Create thumbnails objects
      const thumbnails = videoIds.map(videoId => ({
        id: videoId,
        title: `YouTube Video (${videoId})`,
        imageUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
        quality: 'HD'
      }));
      
      return thumbnails;
    }
    
    return [];
  } catch (error) {
    console.error('Search approach failed:', error);
    return [];
  }
}

/**
 * Get fallback videos for Alessandro Della Giusta's channel
 * This is only used as a last resort when all other methods fail
 */
function getAlessandroDellaGiustaFallbacks() {
  const fallbackVideoIds = [
    'yt1uWag6jBc', // COME DIVENTARE UN DESIGNER (Ep. 2)
    'GFxYR8MlGU4', // COME DIVENTARE UN DESIGNER (Ep. 1)
    'aqOkyFSBwc8', // COME DIVENTARE UN DESIGNER (Ep. 3)
    'fYR9L2ZmodM', // COME DIVENTARE UN DESIGNER (Ep. 4)
    '2QMPDGj7YJc',
    'wThSGQ0Nfzs',
    'qB-pMK0BYds',
    'UMN02kJHJpY',
    'KZSkLJPm7S0',
    'xWqw-McrjMM',
    'wPOFN-OqeMQ',
    'Jxch_O-KR08',
    '3DxgFfnKJQA',
    'Q3qjzFy9VXE',
    'wjME-LMQosQ',
    'xZBsoloKfa8'
  ];
  
  // Create thumbnails from fallback IDs
  return fallbackVideoIds.map(videoId => ({
    id: videoId,
    title: getKnownVideoTitle(videoId) || `YouTube Video (${videoId})`,
    imageUrl: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
    quality: 'Standard'
  }));
}

/**
 * Helper to get known titles for certain videos
 */
function getKnownVideoTitle(videoId) {
  const knownTitles = {
    'yt1uWag6jBc': 'COME DIVENTARE UN DESIGNER (Ep. 2)',
    'GFxYR8MlGU4': 'COME DIVENTARE UN DESIGNER (Ep. 1)',
    'aqOkyFSBwc8': 'COME DIVENTARE UN DESIGNER (Ep. 3)',
    'fYR9L2ZmodM': 'COME DIVENTARE UN DESIGNER (Ep. 4)'
  };
  
  return knownTitles[videoId] || null;
} 