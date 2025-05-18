#!/bin/bash

# Required parameters:
# @raycast.schemaVersion 1
# @raycast.title Optimize PNG Images
# @raycast.mode fullOutput
# @raycast.packageName Media

# Optional parameters:
# @raycast.icon 🖼️
# @raycast.argument1 { "type": "text", "placeholder": "Source directory", "optional": true }
# @raycast.argument2 { "type": "text", "placeholder": "Max size in MB (default: 2)", "optional": true }
# @raycast.needsConfirmation false

# Documentation:
# @raycast.description Optimize PNG images to be under a specified size while maintaining quality
# @raycast.author Aiman
# @raycast.authorURL github.com/aiman

# Check if pngquant is installed
if ! command -v pngquant &> /dev/null; then
    echo "⚠️ pngquant is not installed"
    echo "Installing pngquant..."
    if command -v brew &> /dev/null; then
        brew install pngquant
    else
        echo "❌ Homebrew not found. Please install pngquant manually."
        exit 1
    fi
fi

# Source directory from argument or prompt user
SOURCE_DIR="${1}"
if [ -z "$SOURCE_DIR" ]; then
    echo "🔍 Select source directory:"
    SOURCE_DIR=$(osascript -e 'tell application "Finder" to set folderPath to POSIX path of (choose folder)')
    if [ -z "$SOURCE_DIR" ]; then
        echo "❌ No directory selected. Exiting."
        exit 1
    fi
fi

# Max size in MB from argument or use default
MAX_SIZE="${2:-2}"
MAX_SIZE_BYTES=$((MAX_SIZE * 1024 * 1024))
SAFE_MAX_SIZE_BYTES=$((MAX_SIZE_BYTES - (MAX_SIZE_BYTES / 20))) # 5% less for safety

# Create output directory
OUTPUT_DIR="${SOURCE_DIR%/}_OPTIMIZED"
mkdir -p "$OUTPUT_DIR"
echo "📂 Output directory: $OUTPUT_DIR"

# Find PNGs in the directory
PNG_FILES=$(find "$SOURCE_DIR" -type f -maxdepth 1 -name "*.png")
PNG_COUNT=$(echo "$PNG_FILES" | grep -c "\.png$")

if [ "$PNG_COUNT" -eq 0 ]; then
    echo "❌ No PNG files found in $SOURCE_DIR"
    exit 1
fi

echo "🔎 Found $PNG_COUNT PNG files to optimize"
echo "⚙️ Target max size: ${MAX_SIZE}MB (${SAFE_MAX_SIZE_BYTES} bytes)"
echo "---------------------------------------"

# Process each image
for IMAGE in $PNG_FILES; do
    FILENAME=$(basename "$IMAGE")
    OUTPUT_PATH="${OUTPUT_DIR}/${FILENAME}"
    ORIGINAL_SIZE=$(stat -f %z "$IMAGE")
    ORIGINAL_SIZE_MB=$(echo "scale=2; $ORIGINAL_SIZE / 1048576" | bc)
    
    echo "🖼️ Processing: $FILENAME (${ORIGINAL_SIZE_MB}MB)"
    
    if [ "$ORIGINAL_SIZE" -le "$SAFE_MAX_SIZE_BYTES" ]; then
        echo "   ✅ Already under ${MAX_SIZE}MB - copying original"
        cp "$IMAGE" "$OUTPUT_PATH"
        continue
    fi
    
    # Try different quality levels until file is under target size
    QUALITY=100
    SUCCESS=false
    
    while [ $QUALITY -ge 50 ]; do
        pngquant --quality=${QUALITY}-100 --force --output="$OUTPUT_PATH" "$IMAGE"
        
        # Check file size
        if [ -f "$OUTPUT_PATH" ]; then
            NEW_SIZE=$(stat -f %z "$OUTPUT_PATH")
            NEW_SIZE_MB=$(echo "scale=2; $NEW_SIZE / 1048576" | bc)
            
            if [ "$NEW_SIZE" -le "$SAFE_MAX_SIZE_BYTES" ]; then
                COMPRESSION=$((100 - (NEW_SIZE * 100 / ORIGINAL_SIZE)))
                echo "   ✅ Success! Size: ${NEW_SIZE_MB}MB (${COMPRESSION}% reduction) with quality ${QUALITY}"
                SUCCESS=true
                break
            fi
        fi
        
        # Reduce quality and try again
        QUALITY=$((QUALITY - 5))
    done
    
    if [ "$SUCCESS" = false ]; then
        echo "   ⚠️ Could not optimize to target size, saved best result: ${NEW_SIZE_MB}MB"
    fi
    
    echo "---------------------------------------"
done

TOTAL_FILES=$(find "$OUTPUT_DIR" -type f -maxdepth 1 -name "*.png" | wc -l | tr -d ' ')
echo "✅ Process complete! Optimized $TOTAL_FILES PNG files to $OUTPUT_DIR"
echo "🌟 Open output directory? (Press Cmd+Click):"
echo "file://${OUTPUT_DIR}" 