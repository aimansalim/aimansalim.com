import axios, { AxiosError } from 'axios';

export interface ThumbnailData {
  id: string;
  title: string;
  imageUrl: string;
  quality?: string;
}

/**
 * Downloads thumbnails from a YouTube channel
 * @param channelUrl - URL of the YouTube channel
 * @param startDate - Optional start date in YYYYMMDD format
 * @param endDate - Optional end date in YYYYMMDD format
 * @returns Promise containing an array of thumbnail data
 */
export async function downloadThumbnails(
  channelUrl: string,
  startDate?: string,
  endDate?: string
): Promise<ThumbnailData[]> {
  try {
    // Build query params
    const params: Record<string, string> = { 
      channelUrl 
    };
    
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    
    console.log('Requesting thumbnails from API with params:', params);
    
    // Make the API request to the Express backend
    const response = await axios.get<ThumbnailData[]>('/api/channel-thumbnails', {
      params,
      timeout: 30000 // 30 second timeout
    });
    
    console.log(`API returned ${response.data.length} thumbnails`);
    return response.data;
  } catch (error: unknown) {
    console.error('Error downloading thumbnails:', error);
    
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNREFUSED') {
        console.error('Connection refused. Make sure the API server is running on port 3001');
      }
      
      if (error.response) {
        console.error('API error response:', error.response.data);
      }
    }
    
    // Return empty array on error
    throw new Error(`Failed to download thumbnails: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Creates a collage from downloaded thumbnails
 * @returns Promise containing the path to the generated collage
 */
export async function createCollage(): Promise<string> {
  try {
    const response = await axios.post<{ collagePath: string }>('/api/thumbnails/collage');
    return response.data.collagePath;
  } catch (error: unknown) {
    console.error('Error creating collage:', error);
    throw new Error(`Failed to create collage: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
} 