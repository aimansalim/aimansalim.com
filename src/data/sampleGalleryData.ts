// Sample gallery data - replace with your actual content

export const sampleGalleryItems = [
  // Website Screenshots
  
  {
    id: 'aiman-1',
    type: 'website',
    title: 'aimansalim.com - Aiman Salim',
    description: 'Website page design',
    imageUrl: '/screenshots/aiman-aimansalim.com.jpg',
    sourceUrl: 'https://aimansalim.com',
    category: 'Website Design',
    tags: ['website', 'portfolio', 'design'],
    createdAt: '2024-01-01',
    tools: ['React', 'Tailwind CSS']
  },
  {
    id: 'aiman-2',
    type: 'website',
    title: 'projects - Aiman Salim',
    description: 'Website page design',
    imageUrl: '/screenshots/aiman-projects.jpg',
    sourceUrl: 'https://aimansalim.com/projects',
    category: 'Website Design',
    tags: ['website', 'portfolio', 'design'],
    createdAt: '2024-01-01',
    tools: ['React', 'Tailwind CSS']
  },
  {
    id: 'aiman-3',
    type: 'website',
    title: 'about - Aiman Salim',
    description: 'Website page design',
    imageUrl: '/screenshots/aiman-about.jpg',
    sourceUrl: 'https://aimansalim.com/about',
    category: 'Website Design',
    tags: ['website', 'portfolio', 'design'],
    createdAt: '2024-01-01',
    tools: ['React', 'Tailwind CSS']
  },
  {
    id: 'aiman-4',
    type: 'website',
    title: 'quotes - Aiman Salim',
    description: 'Website page design',
    imageUrl: '/screenshots/aiman-quotes.jpg',
    sourceUrl: 'https://aimansalim.com/quotes',
    category: 'Website Design',
    tags: ['website', 'portfolio', 'design'],
    createdAt: '2024-01-01',
    tools: ['React', 'Tailwind CSS']
  },
  {
    id: 'aiman-5',
    type: 'website',
    title: 'thumbnails - Aiman Salim',
    description: 'Website page design',
    imageUrl: '/screenshots/aiman-thumbnails.jpg',
    sourceUrl: 'https://aimansalim.com/thumbnails',
    category: 'Website Design',
    tags: ['website', 'portfolio', 'design'],
    createdAt: '2024-01-01',
    tools: ['React', 'Tailwind CSS']
  },
  {
    id: 'aiman-6',
    type: 'website',
    title: 'portfolio - Aiman Salim',
    description: 'Website page design',
    imageUrl: '/screenshots/aiman-portfolio.jpg',
    sourceUrl: 'https://aimansalim.com/portfolio',
    category: 'Website Design',
    tags: ['website', 'portfolio', 'design'],
    createdAt: '2024-01-01',
    tools: ['React', 'Tailwind CSS']
  },
  {
    id: 'aiman-7',
    type: 'website',
    title: 'business-card - Aiman Salim',
    description: 'Website page design',
    imageUrl: '/screenshots/aiman-business-card.jpg',
    sourceUrl: 'https://aimansalim.com/business-card',
    category: 'Website Design',
    tags: ['website', 'portfolio', 'design'],
    createdAt: '2024-01-01',
    tools: ['React', 'Tailwind CSS']
  },
  {
    id: 'aiman-8',
    type: 'website',
    title: 'unispot - Aiman Salim',
    description: 'Website page design',
    imageUrl: '/screenshots/aiman-unispot.jpg',
    sourceUrl: 'https://aimansalim.com/projects/unispot',
    category: 'Website Design',
    tags: ['website', 'portfolio', 'design'],
    createdAt: '2024-01-01',
    tools: ['React', 'Tailwind CSS']
  },
  {
    id: 'aiman-9',
    type: 'website',
    title: 'design - Aiman Salim',
    description: 'Website page design',
    imageUrl: '/screenshots/aiman-design.jpg',
    sourceUrl: 'https://aimansalim.com/projects/design',
    category: 'Website Design',
    tags: ['website', 'portfolio', 'design'],
    createdAt: '2024-01-01',
    tools: ['React', 'Tailwind CSS']
  },
  
  
  {
    id: 'boold-1',
    type: 'website',
    title: 'boold.it - Boold.it',
    description: 'Business website design',
    imageUrl: '/screenshots/boold-boold.it.jpg',
    sourceUrl: 'https://boold.it',
    category: 'Website Design',
    tags: ['website', 'business', 'design'],
    createdAt: '2023-06-01',
    tools: ['HTML', 'CSS', 'JavaScript']
  },
  
  // YouTube Thumbnails (sample structure)
  ...Array.from({ length: 50 }, (_, i) => ({
    id: `yt-thumb-${i + 1}`,
    type: 'thumbnail',
    title: `YouTube Thumbnail ${i + 1}`,
    description: 'Engaging thumbnail design for YouTube video',
    imageUrl: `/thumbnails/thumb-${i + 1}.jpg`,
    sourceUrl: 'https://youtube.com/watch?v=example',
    category: 'YouTube Thumbnails',
    tags: ['youtube', 'thumbnail', 'design'],
    createdAt: new Date(2021, 4 + Math.floor(i / 10), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
    client: 'Ale della Giusta',
    tools: ['Photoshop', 'After Effects']
  }))
];
