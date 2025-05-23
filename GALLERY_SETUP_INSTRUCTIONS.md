
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
- https://aimansalim.com
- https://aimansalim.com/projects
- https://aimansalim.com/about
- https://aimansalim.com/quotes
- https://aimansalim.com/thumbnails
- https://aimansalim.com/portfolio
- https://aimansalim.com/business-card
- https://aimansalim.com/projects/unispot
- https://aimansalim.com/projects/design

#### Boold.it Website:
- https://boold.it

### File Naming Convention:
- Use descriptive names: `aiman-homepage.jpg`, `aiman-projects.jpg`
- Save to: `./public/screenshots/`

## 🎬 YouTube Thumbnails

### Channel: https://www.youtube.com/aledellagiusta
### Period: Since 2021-05-01

### Methods:

#### Method 1: Manual Collection
1. Go to the channel's videos page
2. Right-click on each thumbnail
3. Select "Save image as..."
4. Save to: `./public/thumbnails/`

#### Method 2: YouTube API (Advanced)
```javascript
// You'll need a YouTube API key
const API_KEY = 'your-youtube-api-key';
const CHANNEL_ID = 'channel-id-for-aledellagiusta';

// Fetch videos since May 2021
const url = `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet&order=date&publishedAfter=2021-05-01T00:00:00Z&maxResults=50`;
```

#### Method 3: yt-dlp (Command Line)
```bash
# Install yt-dlp
pip install yt-dlp

# Extract thumbnails
yt-dlp --write-thumbnail --skip-download "https://www.youtube.com/aledellagiusta/videos"
```

## 🎨 Design Work

### Collect:
- Business cards
- Logo designs
- UI/UX mockups
- Branding materials
- Any other creative work

### Save to: `./public/designs/`

## 📝 Data Entry

After collecting images, update the data in:
`src/data/galleryData.ts`

### Example Entry:
```typescript
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
```

## 🚀 Automation Scripts

### Puppeteer Screenshot Script (Advanced)
Create `scripts/take-screenshots.js`:

```javascript
const puppeteer = require('puppeteer');

async function takeScreenshots() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.setViewport({ width: 1200, height: 800 });
  
  for (const url of urls) {
    await page.goto(url);
    await page.screenshot({ 
      path: `screenshots/${getFilename(url)}.png`,
      fullPage: true 
    });
  }
  
  await browser.close();
}
```

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
