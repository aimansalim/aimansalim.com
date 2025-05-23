// Gallery data structure for organizing all creative work

export interface GalleryItem {
  id: string;
  type: 'thumbnail' | 'website' | 'design' | 'business-card' | 'ui-ux' | 'branding';
  title: string;
  description: string;
  imageUrl: string;
  sourceUrl?: string;
  category: string;
  tags: string[];
  createdAt: string;
  featured?: boolean;
  client?: string;
  tools?: string[];
}

// YouTube Thumbnails Data
// You'll need to extract these from your YouTube channel
export const youtubeThumbnails: GalleryItem[] = [
  // Example structure - replace with your actual thumbnails
  {
    id: 'yt-thumb-1',
    type: 'thumbnail',
    title: 'YouTube Thumbnail - Episode 1',
    description: 'Engaging thumbnail design for YouTube video',
    imageUrl: '/thumbnails/thumb-1.jpg', // You'll need to save these locally
    sourceUrl: 'https://youtube.com/watch?v=example',
    category: 'YouTube Thumbnails',
    tags: ['youtube', 'thumbnail', 'design', 'video'],
    createdAt: '2021-05-01',
    client: 'Ale della Giusta',
    tools: ['Photoshop', 'After Effects']
  },
  // Add more thumbnails here...
];

// Website Screenshots Data
// Screenshots from aimansalim.com and boold.it
export const websiteScreenshots: GalleryItem[] = [
  // aimansalim.com pages
  {
    id: 'web-aiman-home',
    type: 'website',
    title: 'Aiman Salim - Homepage',
    description: 'Personal portfolio homepage design',
    imageUrl: '/screenshots/aiman-home.jpg',
    sourceUrl: 'https://aimansalim.com',
    category: 'Website Design',
    tags: ['portfolio', 'homepage', 'personal-brand', 'dark-theme'],
    createdAt: '2024-01-01',
    featured: true,
    tools: ['React', 'Tailwind CSS', 'Framer Motion']
  },
  {
    id: 'web-aiman-projects',
    type: 'website',
    title: 'Aiman Salim - Projects Page',
    description: 'Portfolio projects showcase page',
    imageUrl: '/screenshots/aiman-projects.jpg',
    sourceUrl: 'https://aimansalim.com/projects',
    category: 'Website Design',
    tags: ['portfolio', 'projects', 'showcase'],
    createdAt: '2024-01-01',
    tools: ['React', 'Tailwind CSS']
  },
  {
    id: 'web-aiman-quotes',
    type: 'website',
    title: 'Aiman Salim - Quotes Page',
    description: 'Interactive quotes experience',
    imageUrl: '/screenshots/aiman-quotes.jpg',
    sourceUrl: 'https://aimansalim.com/quotes',
    category: 'Website Design',
    tags: ['interactive', 'quotes', 'typography', 'animation'],
    createdAt: '2024-01-01',
    tools: ['React', 'Tailwind CSS', 'Framer Motion']
  },
  
  // boold.it pages
  {
    id: 'web-boold-home',
    type: 'website',
    title: 'Boold.it - Homepage',
    description: 'Business website homepage design',
    imageUrl: '/screenshots/boold-home.jpg',
    sourceUrl: 'https://boold.it',
    category: 'Website Design',
    tags: ['business', 'homepage', 'corporate'],
    createdAt: '2023-06-01',
    featured: true,
    tools: ['HTML', 'CSS', 'JavaScript']
  },
  // Add more website pages...
];

// Design Work Data
export const designWork: GalleryItem[] = [
  {
    id: 'design-business-card-1',
    type: 'business-card',
    title: 'Modern Business Card Design',
    description: 'Minimalist business card with clean typography',
    imageUrl: '/designs/business-card-1.jpg',
    category: 'Branding',
    tags: ['business-card', 'branding', 'minimalist', 'typography'],
    createdAt: '2023-08-15',
    tools: ['Adobe Illustrator', 'Photoshop']
  },
  // Add more design work...
];

// Combined gallery data
export const getAllGalleryItems = (): GalleryItem[] => {
  return [
    ...youtubeThumbnails,
    ...websiteScreenshots,
    ...designWork,
  ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

// Filter functions
export const getItemsByType = (type: GalleryItem['type']): GalleryItem[] => {
  return getAllGalleryItems().filter(item => item.type === type);
};

export const getItemsByCategory = (category: string): GalleryItem[] => {
  return getAllGalleryItems().filter(item => item.category === category);
};

export const getFeaturedItems = (): GalleryItem[] => {
  return getAllGalleryItems().filter(item => item.featured);
};

export const searchItems = (query: string): GalleryItem[] => {
  const lowercaseQuery = query.toLowerCase();
  return getAllGalleryItems().filter(item => 
    item.title.toLowerCase().includes(lowercaseQuery) ||
    item.description.toLowerCase().includes(lowercaseQuery) ||
    item.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    item.category.toLowerCase().includes(lowercaseQuery)
  );
};

// Utility functions for data collection
export const generateScreenshotInstructions = () => {
  return {
    aimansalim: [
      'https://aimansalim.com',
      'https://aimansalim.com/projects',
      'https://aimansalim.com/about',
      'https://aimansalim.com/quotes',
      'https://aimansalim.com/thumbnails',
      'https://aimansalim.com/portfolio',
      'https://aimansalim.com/business-card',
      'https://aimansalim.com/projects/unispot',
      'https://aimansalim.com/projects/design',
    ],
    boold: [
      'https://boold.it',
      // Add other boold.it pages as needed
    ],
    youtube: {
      channel: 'https://www.youtube.com/aledellagiusta',
      note: 'Extract thumbnails from videos since May 2021',
      method: 'Use YouTube API or manual screenshot of thumbnail grid'
    }
  };
};

// Instructions for setting up the gallery
export const setupInstructions = `
# Gallery Setup Instructions

## 1. Collect Screenshots
Use the URLs from generateScreenshotInstructions() to take screenshots of:
- All pages from aimansalim.com
- All pages from boold.it
- YouTube thumbnails from aledellagiusta channel (since May 2021)

## 2. Organize Files
Create these folders in your public directory:
- /public/screenshots/ (for website screenshots)
- /public/thumbnails/ (for YouTube thumbnails)
- /public/designs/ (for other design work)

## 3. Update Data
Replace the mock data in this file with your actual content:
- Update youtubeThumbnails array with real thumbnail data
- Update websiteScreenshots array with actual screenshots
- Update designWork array with your design projects

## 4. Screenshot Tools
Recommended tools for taking screenshots:
- Full page screenshots: Use browser extensions like "Full Page Screen Capture"
- Consistent sizing: Aim for 1200px width for website screenshots
- High quality: Use PNG format for crisp images
- Mobile views: Consider taking mobile screenshots too

## 5. YouTube Thumbnail Extraction
Options for getting YouTube thumbnails:
- Manual: Right-click on video thumbnails and save
- Automated: Use YouTube API to get thumbnail URLs
- Bulk: Use tools like youtube-dl or yt-dlp to extract thumbnails

## 6. Optimization
- Compress images for web (use tools like TinyPNG)
- Consider WebP format for better performance
- Add lazy loading for better performance
`; 