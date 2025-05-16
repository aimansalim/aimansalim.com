#!/bin/bash

# Directory paths - update these to match your setup
THUMBNAIL_DIR="/Users/aiman/Biz/Aiman/Coding/thumbnail-download"
VENV_PATH="$THUMBNAIL_DIR/.venv"
ACTIVATE_PATH="$VENV_PATH/bin/activate"

# Check if the virtual environment exists
if [ ! -d "$VENV_PATH" ]; then
    echo "ERROR: Python virtual environment not found at $VENV_PATH"
    echo "Please create it with the following commands:"
    echo "cd $THUMBNAIL_DIR"
    echo "python -m venv .venv"
    echo "source .venv/bin/activate"
    echo "pip install aiohttp yt-dlp"
    exit 1
fi

# Source the virtual environment
echo "Activating Python virtual environment..."
source "$ACTIVATE_PATH"

# Check if required packages are installed
python -c "import aiohttp" 2>/dev/null
if [ $? -ne 0 ]; then
    echo "ERROR: aiohttp package not found in the Python environment"
    echo "Please install it with: pip install aiohttp"
    exit 1
fi

python -c "import yt_dlp" 2>/dev/null
if [ $? -ne 0 ]; then
    echo "ERROR: yt-dlp package not found in the Python environment"
    echo "Please install it with: pip install yt-dlp"
    exit 1
fi

# Start the Node.js server with PYTHONPATH set correctly
echo "Starting server with proper Python environment..."
PYTHONPATH="$THUMBNAIL_DIR" node server.js 