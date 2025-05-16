// This interface should align with ThumbnailData in thumbnailApi.d.ts
export interface ApiThumbnail {
  id: string;
  title: string;
  imageUrl: string;
  quality?: string;
}

// Get API base URL from environment or use relative path for production
const getApiBaseUrl = (): string => {
  // Use window.location.origin which will work in both dev and production
  return '';
};

/**
 * Direct implementation that doesn't rely on backend Python scripts
 * This will work in both development and production
 */
export async function fetchChannelThumbnails(
  channelUrl: string,
  startDate?: string,
  endDate?: string
): Promise<ApiThumbnail[]> {
  try {
    console.log(`Fetching thumbnails for channel: ${channelUrl}`);
    
    // Extract channel ID from URL
    const channelId = extractChannelIdFromUrl(channelUrl);
    if (!channelId) {
      throw new Error('Could not extract channel ID from URL');
    }
    
    // Use YouTube's oEmbed API to get video information directly
    // This doesn't require API keys and works for public videos
    const videoIds = await fetchRecentVideoIds(channelId);
    
    if (!videoIds || videoIds.length === 0) {
      throw new Error('No videos found for this channel');
    }
    
    // Get thumbnail data for each video
    const thumbnails = await Promise.all(
      videoIds.map(async (videoId) => {
        try {
          const response = await fetch(
            `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
          );
          
          if (response.ok) {
            const data = await response.json();
            return {
              id: videoId,
              title: data.title,
              imageUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
              quality: 'HD'
            };
          } else {
            console.error(`Failed to get info for video ${videoId}`);
            return {
              id: videoId,
              title: `YouTube Video (${videoId})`,
              imageUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
              quality: 'unknown'
            };
          }
        } catch (error) {
          console.error(`Error processing video ${videoId}:`, error);
          return {
            id: videoId,
            title: `YouTube Video (${videoId})`,
            imageUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
            quality: 'unknown'
          };
        }
      })
    );
    
    return thumbnails.filter(t => t !== null);
  } catch (error: unknown) {
    console.error("Error fetching channel thumbnails:", error);
    throw error; // Let the caller handle the error
  }
}

/**
 * Extract channel ID from various YouTube URL formats
 */
function extractChannelIdFromUrl(url: string): string | null {
  try {
    // Handle @username format
    if (url.includes('@')) {
      const match = url.match(/@([^/\s]+)/);
      if (match && match[1]) {
        return '@' + match[1]; // Return with @ prefix
      }
    }
    
    // Handle /c/channelname format
    if (url.includes('/c/')) {
      const match = url.match(/\/c\/([^/\s]+)/);
      if (match && match[1]) {
        return 'c/' + match[1];
      }
    }
    
    // Handle /channel/ID format
    if (url.includes('/channel/')) {
      const match = url.match(/\/channel\/([^/\s]+)/);
      if (match && match[1]) {
        return match[1];
      }
    }
    
    return null;
  } catch (e) {
    console.error('Error extracting channel ID:', e);
    return null;
  }
}

/**
 * Fetch recent video IDs from a channel using RSS feed
 * This is a public API that doesn't require API keys
 */
async function fetchRecentVideoIds(channelId: string): Promise<string[]> {
  try {
    let feedUrl: string;
    
    // Construct feed URL based on channel ID format
    if (channelId.startsWith('@')) {
      // Handle @username format
      feedUrl = `https://www.youtube.com/feeds/videos.xml?user=${channelId.substring(1)}`;
    } else if (channelId.startsWith('c/')) {
      // Handle c/channelname format
      feedUrl = `https://www.youtube.com/feeds/videos.xml?user=${channelId.substring(2)}`;
    } else {
      // Handle channel ID format
      feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
    }
    
    // Use a CORS proxy for production
    const corsProxy = 'https://corsproxy.io/?';
    const response = await fetch(corsProxy + encodeURIComponent(feedUrl));
    
    if (!response.ok) {
      throw new Error(`Failed to fetch RSS feed: ${response.status}`);
    }
    
    const text = await response.text();
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(text, 'text/xml');
    
    // Extract video IDs from entry elements
    const entries = xmlDoc.querySelectorAll('entry');
    const videoIds: string[] = [];
    
    entries.forEach((entry) => {
      // Get video ID from the yt:videoId element
      const videoIdElement = entry.querySelector('yt\\:videoId, videoId');
      if (videoIdElement && videoIdElement.textContent) {
        videoIds.push(videoIdElement.textContent);
      }
    });
    
    return videoIds.slice(0, 20); // Limit to 20 videos
  } catch (error) {
    console.error('Error fetching video IDs:', error);
    return [];
  }
}

/**
 * Extract channel name from URL
 */
function extractChannelName(url: string): string {
  try {
    // Try to extract the channel name from the URL
    if (url.includes('@')) {
      const match = url.match(/@([^/]+)/);
      if (match && match[1]) {
        return match[1];
      }
    }
    
    if (url.includes('/c/')) {
      const match = url.match(/\/c\/([^/]+)/);
      if (match && match[1]) {
        return match[1];
      }
    }
    
    if (url.includes('/channel/')) {
      const match = url.match(/\/channel\/([^/]+)/);
      if (match && match[1]) {
        return match[1];
      }
    }
    
    // Default fallback
    return "YouTube Channel";
  } catch (e) {
    return "YouTube Channel";
  }
}
