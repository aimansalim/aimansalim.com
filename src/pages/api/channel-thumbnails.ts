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

// Sample data for production environment where the Python backend isn't available
const SAMPLE_THUMBNAILS: ApiThumbnail[] = [
  {
    id: 'dQw4w9WgXcQ',
    title: 'Rick Astley - Never Gonna Give You Up (Official Music Video)',
    imageUrl: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    quality: 'HD'
  },
  {
    id: '9bZkp7q19f0',
    title: 'PSY - GANGNAM STYLE(강남스타일) M/V',
    imageUrl: 'https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg',
    quality: 'HD'
  },
  {
    id: 'JGwWNGJdvx8',
    title: 'Ed Sheeran - Shape of You (Official Music Video)',
    imageUrl: 'https://img.youtube.com/vi/JGwWNGJdvx8/maxresdefault.jpg',
    quality: 'HD'
  },
  {
    id: 'kJQP7kiw5Fk',
    title: 'Luis Fonsi - Despacito ft. Daddy Yankee',
    imageUrl: 'https://img.youtube.com/vi/kJQP7kiw5Fk/maxresdefault.jpg',
    quality: 'HD'
  },
  {
    id: 'RgKAFK5djSk',
    title: 'Wiz Khalifa - See You Again ft. Charlie Puth [Official Video]',
    imageUrl: 'https://img.youtube.com/vi/RgKAFK5djSk/maxresdefault.jpg',
    quality: 'HD'
  }
];

// Check if we're in a production environment (Cloudflare Pages)
const isProduction = (): boolean => {
  return window.location.hostname.includes('pages.dev') || 
         window.location.hostname === 'aimansalim.com' ||
         !window.location.hostname.includes('localhost');
};

/**
 * SERVER-SIDE IMPLEMENTATION
 * This uses the Node.js API to fetch real thumbnails from YouTube
 */
export async function fetchChannelThumbnails(
  channelUrl: string,
  startDate?: string,
  endDate?: string
): Promise<ApiThumbnail[]> {
  try {
    console.log(`Fetching thumbnails for channel: ${channelUrl}`);
    
    // In production, return sample data
    if (isProduction()) {
      console.log('Running in production environment, returning sample thumbnails');
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      return SAMPLE_THUMBNAILS;
    }
    
    // Call the server-side API for development environment
    const apiUrl = new URL('/api/channel-thumbnails', window.location.origin);
    apiUrl.searchParams.append('channelUrl', channelUrl);
    
    if (startDate) apiUrl.searchParams.append('startDate', startDate);
    if (endDate) apiUrl.searchParams.append('endDate', endDate);
    
    console.log(`Sending request to: ${apiUrl.toString()}`);
    
    const response = await fetch(apiUrl.toString(), {
      // Add cache control to avoid stale data
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API error response: ${errorText}`);
      throw new Error(`API responded with status: ${response.status}`);
    }
    
    const thumbnails = await response.json();
    console.log(`Successfully fetched ${thumbnails.length} thumbnails`);
    return thumbnails;
  } catch (error: unknown) {
    console.error("Error fetching channel thumbnails:", error);
    throw error; // Let the caller handle the error
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
