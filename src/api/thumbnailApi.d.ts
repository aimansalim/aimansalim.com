export interface ThumbnailData {
  id: string;
  title: string;
  imageUrl: string;
  quality?: string;
}

export function downloadThumbnails(
  channelUrl: string,
  startDate?: string,
  endDate?: string
): Promise<ThumbnailData[]>;

export function createCollage(): Promise<string>; 