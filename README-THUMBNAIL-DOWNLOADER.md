# YouTube Thumbnail Downloader - User Guide

This tool allows you to download high-quality thumbnails from YouTube videos and channels.

## Setup & Running

### Step 1: Start the Backend Server

The thumbnail downloader requires a backend server to run at port 3001. This server uses yt-dlp to fetch YouTube data and thumbnails.

**Option 1: Use the helper script (recommended)**

```bash
# Make the script executable
chmod +x start-backend.sh

# Run the script
./start-backend.sh
```

This script will:
- Find the thumbnail-download directory
- Set up the Python environment if needed
- Install dependencies
- Start the server on port 3001

**Option 2: Start manually**

```bash
# Navigate to the thumbnail-download directory
cd ../thumbnail-download

# Activate the Python virtual environment
source .venv/bin/activate  # or 'source venv/bin/activate'

# Start the server
npm run dev
```

### Step 2: Start the Frontend

In a different terminal:

```bash
# From the landing-page directory
npm run dev
```

## Using the Thumbnail Downloader

1. Navigate to http://localhost:5173/ (or whatever port your Vite server is using)
2. Go to the YouTube Thumbnail Downloader section
3. Use the tool in one of two ways:
   - **Video URLs**: Enter one or more YouTube video URLs (separated by commas)
   - **Channel**: Enter a YouTube channel URL (@username or channel URL)

## Troubleshooting

### "Connection refused" error

This means the backend server isn't running at port 3001. Make sure to:
1. Run the start-backend.sh script or manually start the server
2. Check if port 3001 is already in use by another application
3. Verify the thumbnail-download directory is in the correct location

### "yt-dlp not found" error

If you see this error, it means yt-dlp is not installed. Run:

```bash
pip install -U yt-dlp
```

### Other issues

If you encounter other problems:
1. Check the terminal where the backend server is running for error messages
2. Ensure you have Python 3.7+ installed
3. Verify all dependencies are installed in the virtual environment 