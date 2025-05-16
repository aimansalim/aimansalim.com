# aimansalim.com

Personal portfolio website implementing modern web development practices.

## Core Features

- Responsive design optimized for all viewport sizes
- Server-side rendering for improved performance
- Type-safe development with TypeScript
- Modular component architecture
- Efficient build system using Vite
- 3D graphics integration with Three.js
- CSS optimization with Tailwind
- YouTube Thumbnail Downloader tool

## Technology Stack

- React 18.x
- TypeScript 5.x
- Vite
- Tailwind CSS
- Three.js
- GSAP for animations
- Express.js for API endpoints
- Python scripts for thumbnail processing
- Cloudflare Pages for deployment

## Development Setup

### Requirements

- Node.js version 16.0 or higher
- npm or yarn package manager
- Python 3.x (for thumbnail tool functionality)

### Local Development

1. Clone the repository
```bash
git clone https://github.com/aimansalim/aimansalim.com.git
cd aimansalim.com
```

2. Install dependencies
```bash
npm install
```

3. Set up the Python environment for the thumbnail tool:
```bash
cd /path/to/thumbnail-download
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install aiohttp yt-dlp
```

4. Start the complete development environment (frontend + API)
```bash
npm run start
```

This will start both:
- The Vite development server at http://localhost:5173
- The Express API server at http://localhost:3001

5. Access development server at `http://localhost:5173`

## Deployment to Cloudflare Pages

This site is automatically deployed via Cloudflare Pages. Any push to the `main` branch triggers a new deployment.

### Complete Deployment Process

1. Install Wrangler CLI if you haven't already:
   ```bash
   npm install -g wrangler
   ```

2. Login to Cloudflare:
   ```bash
   wrangler login
   ```

3. Build and deploy the complete site:
   ```bash
   npm run deploy
   ```

4. Set up environment variables in the Cloudflare Pages dashboard:
   - `API_URL`: URL where your Express API is hosted
   - Any other environment-specific variables

### API Server Deployment

The thumbnail tool requires the Express API server to be hosted separately. Options include:

1. **VPS/Dedicated Server**:
   - Deploy the server.js and Python scripts to a VPS
   - Use the start-server.sh script to run it with proper Python environment
   - Set up a process manager like PM2: `pm2 start start-server.sh`

2. **Cloud Functions (like AWS Lambda)**:
   - Adapt the code to run in a serverless environment
   - Set up API Gateway to handle the routes

3. **Platform as a Service (like Heroku)**:
   - Deploy the server.js and associated files
   - Set up Python buildpack to ensure dependencies are available

After deploying your API server, update the `API_URL` in your Cloudflare Pages environment variables to point to your API server URL.

## Project Structure

```
aimansalim.com/
├── src/                    # Source files
│   ├── components/         # React components
│   ├── pages/              # Page components
│   │   └── api/            # API interfaces for client
│   ├── api/                # API implementation
│   ├── assets/             # Static assets
│   └── styles/             # Global styles
├── functions/              # Cloudflare Pages Functions
├── public/                 # Public assets
├── server.js               # Express API server
└── package.json            # Project dependencies
```

## Checking if everything works

1. Start the development environment: `npm run start`
2. Verify the API is running with the healthcheck script: `node healthcheck.js`
3. Open http://localhost:5173 in your browser
4. Test the thumbnail tool and other portfolio features

## Troubleshooting

### API Connection Issues

If the thumbnail tool isn't working:

1. Check that the Express server is running: `node healthcheck.js`
2. Verify the API URL in the browser's Network tab
3. Check for CORS errors in the console
4. Make sure your Python environment is set up correctly

### Deployment Issues

If CloudFlare Pages deployment fails:

1. Check the Cloudflare Pages logs
2. Verify your wrangler.toml configuration
3. Make sure paths and routes are correctly configured

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

- Website: [aimansalim.com](https://aimansalim.com)
- GitHub: [@aimansalim](https://github.com/aimansalim)

---

Made with ❤️ by Aiman Salim

# YouTube Thumbnail Downloader

A web application to download thumbnails from YouTube videos and channels.

## Features

- Download thumbnails from individual YouTube videos
- Download thumbnails from YouTube channels
- Filter channel thumbnails by date range
- Download all thumbnails as a ZIP file

## Setup

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the Python environment:
   ```bash
   cd /path/to/thumbnail-download
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   pip install aiohttp yt-dlp
   ```

## Development

### Local Development

To run the application locally:

```bash
npm run start
```

This will start both:
- The Vite development server at http://localhost:5173
- The Express API server at http://localhost:3001

### Checking if it's working

1. Open your browser to http://localhost:5173
2. Try downloading a thumbnail by entering a YouTube URL or channel name
3. Check for any error messages in the browser console
4. Check the terminal for API server logs

## API Endpoints

- `GET /api/channel-thumbnails`: Get thumbnails from a YouTube channel
- `POST /api/thumbnails/download`: Download thumbnails with specific date range
- `POST /api/thumbnails/collage`: Create a collage of thumbnails

## Deployment to Cloudflare Pages

### First-time setup

1. Install Wrangler CLI:
   ```bash
   npm install -g wrangler
   ```
2. Login to Cloudflare:
   ```bash
   wrangler login
   ```

### Deploy

To deploy to Cloudflare Pages:

```bash
npm run deploy
```

### Environment Variables

Set the following environment variables in the Cloudflare Pages dashboard:

- `API_URL`: The URL where your API is hosted

## Troubleshooting

### API Connection Issues

If you're having trouble connecting to the API:

1. Check that both servers are running
2. Verify the API URL in your browser's Network tab
3. Check for CORS errors in the console
4. Make sure your Python environment is correctly set up

### Deployment Issues

If deployment fails:

1. Check the Cloudflare Pages logs
2. Verify your wrangler.toml configuration
3. Make sure your API server is accessible from Cloudflare Pages functions
