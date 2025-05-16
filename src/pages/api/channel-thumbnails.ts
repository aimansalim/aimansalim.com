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
    
    // Call the server-side API
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
