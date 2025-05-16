#!/bin/bash

# Get the directory where this script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Print a helpful header
echo "========================================================="
echo "YouTube Thumbnail Downloader - Backend Server Starter"
echo "========================================================="
echo

# Check if the thumbnail-download directory exists
THUMBNAIL_DIR="../thumbnail-download"
if [ ! -d "$THUMBNAIL_DIR" ]; then
  echo "Error: The thumbnail-download directory doesn't exist at $THUMBNAIL_DIR"
  echo "Please make sure the directory exists and try again."
  exit 1
fi

# Navigate to the thumbnail-download directory
cd "$THUMBNAIL_DIR" || exit 1
echo "✓ Found thumbnail-download directory"

# Check if Python virtual environment exists
if [ ! -d ".venv" ] && [ ! -d "venv" ]; then
  echo "Python virtual environment (.venv or venv) not found."
  echo "Creating a new virtual environment..."
  python3 -m venv .venv
  
  if [ $? -ne 0 ]; then
    echo "Failed to create Python virtual environment. Please install Python 3 and try again."
    exit 1
  fi
  
  echo "✓ Created virtual environment"
fi

# Determine which venv directory to use
VENV_DIR=".venv"
if [ ! -d "$VENV_DIR" ]; then
  VENV_DIR="venv"
fi

# Activate the virtual environment
echo "Activating Python virtual environment..."
source "$VENV_DIR/bin/activate"
echo "✓ Activated virtual environment"

# Install dependencies if requirements.txt exists
if [ -f "requirements.txt" ]; then
  echo "Installing Python dependencies..."
  pip install -r requirements.txt
  echo "✓ Installed Python dependencies"
fi

# Check if yt-dlp is installed
if ! command -v yt-dlp &> /dev/null; then
  echo "Installing yt-dlp..."
  pip install -U yt-dlp
  echo "✓ Installed yt-dlp"
fi

# Start the server
echo
echo "Starting the thumbnail-download server at port 3001..."
echo "Press Ctrl+C to stop the server"
echo "==========================================================="
echo

# Use npm start if a package.json exists, otherwise use Python
if [ -f "package.json" ]; then
  # Use npm or yarn to start the server
  if [ -f "yarn.lock" ]; then
    yarn dev
  else
    npm run dev
  fi
else
  # Fall back to starting with Python directly
  python app.py
fi 