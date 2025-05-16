#!/bin/bash

# Create directory for screenshots
OUTPUT_DIR="$HOME/Biz/Aiman/Coding/coding/time-lapse-recordings/screenshots_$(date +%Y%m%d_%H%M%S)"
mkdir -p "$OUTPUT_DIR"

# Set interval between screenshots (in seconds)
INTERVAL=5

# Counter for screenshots
COUNTER=1

echo "🎬 Starting timelapse recording..."
echo "📁 Saving screenshots to: $OUTPUT_DIR"
echo "⏱️ Taking screenshots every $INTERVAL seconds"
echo "⛔ Press Ctrl+C to stop recording and generate video"

# Function to create video from screenshots
create_video() {
  echo "🔄 Creating timelapse video..."
  
  # Add timestamp overlay to images if ImageMagick is available
  if command -v convert >/dev/null 2>&1; then
    echo "Adding timestamps to screenshots..."
    for img in "$OUTPUT_DIR"/*.png; do
      convert "$img" -gravity SouthEast -pointsize 20 -fill white -annotate +10+10 "$(basename "$img" | sed 's/screenshot_//' | sed 's/\.png//')" "$img"
    done
  fi
  
  VIDEO_FILE="$HOME/Biz/Aiman/Coding/coding/time-lapse-recordings/timelapse_$(date +%Y%m%d_%H%M%S).mp4"
  
  # Check if ffmpeg is available, otherwise use QuickTime Player's image sequence feature
  if command -v ffmpeg >/dev/null 2>&1; then
    ffmpeg -framerate 24 -pattern_type glob -i "$OUTPUT_DIR/screenshot_*.png" -c:v libx264 -pix_fmt yuv420p "$VIDEO_FILE"
    echo "✅ Video created: $VIDEO_FILE"
    open "$VIDEO_FILE"
  else
    echo "ℹ️ ffmpeg not found. To create a video:"
    echo "1. Open QuickTime Player"
    echo "2. Go to File > Open Image Sequence..."
    echo "3. Navigate to: $OUTPUT_DIR"
    echo "4. Select the first image and click 'Open'"
    echo "5. Choose frame rate (24 recommended for smooth timelapse)"
    echo "6. Save the video"
    open "$OUTPUT_DIR"
  fi
  
  echo "📊 Total screenshots taken: $((COUNTER-1))"
  echo "⏱️ Total recording time: $(( (COUNTER-1) * INTERVAL )) seconds"
}

# Trap Ctrl+C and call create_video
trap create_video INT

# Take screenshots until stopped
while true; do
  filename="$OUTPUT_DIR/screenshot_$(printf "%04d" $COUNTER).png"
  screencapture -x "$filename"
  echo "📸 Captured frame $COUNTER"
  COUNTER=$((COUNTER+1))
  sleep $INTERVAL
done 