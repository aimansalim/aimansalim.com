#!/usr/bin/env node

/**
 * Gallery Content Collection Script
 * 
 * This script helps automate the collection of screenshots and thumbnails
 * for the Pinterest-style gallery page.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Configuration
const config = {
  outputDir: './public',
  screenshotsDir: './public/screenshots',
  thumbnailsDir: './public/thumbnails',
  designsDir: './public/designs',
  
  // URLs to screenshot
  urls: {
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
      // Add more boold.it pages as needed
    ]
  },
  
  // YouTube channel info
  youtube: {
    channelUrl: 'https://www.youtube.com/aledellagiusta',
    startDate: '2021-05-01', // Since May 2021
  }
};

// Create necessary directories
function createDirectories() {
  const dirs = [
    config.screenshotsDir,
    config.thumbnailsDir,
    config.designsDir
  ];
  
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`✅ Created directory: ${dir}`);
    }
  });
}

// Generate instructions for manual screenshot collection
function generateInstructions() {
  const instructions = `
# Gallery Content Collection Instructions

## 📸 Website Screenshots

### Recommended Tools:
1. **Browser Extension**: "Full Page Screen Capture" or "GoFullPage"
2. **Desktop App**: Cleanshot X (Mac) or Greenshot (Windows)
3. **Online Tool**: web-capture.net

### Screenshot Settings:
- **Width**: 1200px (desktop view)
- **Format**: PNG for quality, JPG for smaller file size
- **Quality**: High (90%+)

### Pages to Screenshot:

#### Aiman Salim Website:
${config.urls.aimansalim.map(url => `- ${url}`).join('\n')}

#### Boold.it Website:
${config.urls.boold.map(url => `- ${url}`).join('\n')}

### File Naming Convention:
- Use descriptive names: \`aiman-homepage.jpg\`, \`aiman-projects.jpg\`
- Save to: \`${config.screenshotsDir}/\`

## 🎬 YouTube Thumbnails

### Channel: ${config.youtube.channelUrl}
### Period: Since ${config.youtube.startDate}

### Methods:

#### Method 1: Manual Collection
1. Go to the channel's videos page
2. Right-click on each thumbnail
3. Select "Save image as..."
4. Save to: \`${config.thumbnailsDir}/\`

#### Method 2: YouTube API (Advanced)
\`\`\`javascript
// You'll need a YouTube API key
const API_KEY = 'your-youtube-api-key';
const CHANNEL_ID = 'channel-id-for-aledellagiusta';

// Fetch videos since May 2021
const url = \`https://www.googleapis.com/youtube/v3/search?key=\${API_KEY}&channelId=\${CHANNEL_ID}&part=snippet&order=date&publishedAfter=2021-05-01T00:00:00Z&maxResults=50\`;
\`\`\`

#### Method 3: yt-dlp (Command Line)
\`\`\`bash
# Install yt-dlp
pip install yt-dlp

# Extract thumbnails
yt-dlp --write-thumbnail --skip-download "${config.youtube.channelUrl}/videos"
\`\`\`

## 🎨 Design Work

### Collect:
- Business cards
- Logo designs
- UI/UX mockups
- Branding materials
- Any other creative work

### Save to: \`${config.designsDir}/\`

## 📝 Data Entry

After collecting images, update the data in:
\`src/data/galleryData.ts\`

### Example Entry:
\`\`\`typescript
{
  id: 'unique-id',
  type: 'website', // or 'thumbnail', 'design', etc.
  title: 'Page Title',
  description: 'Brief description',
  imageUrl: '/screenshots/filename.jpg',
  sourceUrl: 'https://original-url.com',
  category: 'Website Design',
  tags: ['tag1', 'tag2'],
  createdAt: '2024-01-01',
  tools: ['React', 'Tailwind CSS']
}
\`\`\`

## 🚀 Automation Scripts

### Puppeteer Screenshot Script (Advanced)
Create \`scripts/take-screenshots.js\`:

\`\`\`javascript
const puppeteer = require('puppeteer');

async function takeScreenshots() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1200, height: 800 });
  
  for (const url of urls) {
    await page.goto(url);
    await page.screenshot({ 
      path: \`screenshots/\${getFilename(url)}.png\`,
      fullPage: true 
    });
  }
  
  await browser.close();
}
\`\`\`

## ✅ Checklist

- [ ] Install screenshot tool
- [ ] Create directory structure
- [ ] Screenshot all Aiman Salim pages
- [ ] Screenshot all Boold.it pages
- [ ] Collect YouTube thumbnails (since May 2021)
- [ ] Gather design work images
- [ ] Optimize images for web
- [ ] Update galleryData.ts with real data
- [ ] Test gallery page functionality

## 📊 Expected Results

You should have:
- ~10-15 website screenshots
- ~100+ YouTube thumbnails (depending on upload frequency)
- ~20+ design work images
- Total: 130+ gallery items

This will create a rich, comprehensive gallery showcasing all your creative work!
`;

  fs.writeFileSync('./GALLERY_SETUP_INSTRUCTIONS.md', instructions);
  console.log('📝 Instructions written to GALLERY_SETUP_INSTRUCTIONS.md');
}

// Generate a sample data file with placeholders
function generateSampleData() {
  const sampleData = `// Sample gallery data - replace with your actual content

export const sampleGalleryItems = [
  // Website Screenshots
  ${config.urls.aimansalim.map((url, index) => `
  {
    id: 'aiman-${index + 1}',
    type: 'website',
    title: '${url.split('/').pop() || 'Homepage'} - Aiman Salim',
    description: 'Website page design',
    imageUrl: '/screenshots/aiman-${url.split('/').pop() || 'home'}.jpg',
    sourceUrl: '${url}',
    category: 'Website Design',
    tags: ['website', 'portfolio', 'design'],
    createdAt: '2024-01-01',
    tools: ['React', 'Tailwind CSS']
  }`).join(',')},
  
  ${config.urls.boold.map((url, index) => `
  {
    id: 'boold-${index + 1}',
    type: 'website',
    title: '${url.split('/').pop() || 'Homepage'} - Boold.it',
    description: 'Business website design',
    imageUrl: '/screenshots/boold-${url.split('/').pop() || 'home'}.jpg',
    sourceUrl: '${url}',
    category: 'Website Design',
    tags: ['website', 'business', 'design'],
    createdAt: '2023-06-01',
    tools: ['HTML', 'CSS', 'JavaScript']
  }`).join(',')},
  
  // YouTube Thumbnails (sample structure)
  ...Array.from({ length: 50 }, (_, i) => ({
    id: \`yt-thumb-\${i + 1}\`,
    type: 'thumbnail',
    title: \`YouTube Thumbnail \${i + 1}\`,
    description: 'Engaging thumbnail design for YouTube video',
    imageUrl: \`/thumbnails/thumb-\${i + 1}.jpg\`,
    sourceUrl: 'https://youtube.com/watch?v=example',
    category: 'YouTube Thumbnails',
    tags: ['youtube', 'thumbnail', 'design'],
    createdAt: new Date(2021, 4 + Math.floor(i / 10), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
    client: 'Ale della Giusta',
    tools: ['Photoshop', 'After Effects']
  }))
];
`;

  fs.writeFileSync('./src/data/sampleGalleryData.ts', sampleData);
  console.log('📄 Sample data written to src/data/sampleGalleryData.ts');
}

// Main execution
function main() {
  console.log('🎨 Gallery Content Collection Setup\n');
  
  createDirectories();
  generateInstructions();
  generateSampleData();
  
  console.log('\n✅ Setup complete!');
  console.log('\n📖 Next steps:');
  console.log('1. Read GALLERY_SETUP_INSTRUCTIONS.md');
  console.log('2. Collect screenshots and thumbnails');
  console.log('3. Update src/data/galleryData.ts with real data');
  console.log('4. Test the gallery page at /gallery');
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = {
  createDirectories,
  generateInstructions,
  generateSampleData,
  config
}; 