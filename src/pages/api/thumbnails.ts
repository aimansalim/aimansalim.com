import { NextApiRequest, NextApiResponse } from 'next';
import { downloadThumbnails } from '../../api/thumbnailApi';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { channelUrl, startDate, endDate } = req.body;

    if (!channelUrl) {
      return res.status(400).json({ error: 'Channel URL is required' });
    }

    console.log(`[API] Processing request for channel: ${channelUrl}`);
    
    const thumbnails = await downloadThumbnails(channelUrl, startDate, endDate);
    
    return res.status(200).json({ 
      success: true, 
      thumbnails,
      count: thumbnails.length
    });
  } catch (error: any) {
    console.error('[API] Error processing thumbnail request:', error);
    
    return res.status(500).json({ 
      error: error.message || 'Failed to retrieve thumbnails',
      success: false
    });
  }
} 