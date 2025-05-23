#!/bin/bash

# Required parameters:
# @raycast.schemaVersion 1
# @raycast.title Quote Generator
# @raycast.mode fullOutput
# @raycast.packageName Media

# Optional parameters:
# @raycast.icon 💬
# @raycast.argument1 { "type": "text", "placeholder": "Quote or Command", "optional": true }
# @raycast.argument2 { "type": "text", "placeholder": "Options (--add or --single)", "optional": true }
# @raycast.description Generate minimal quote images for social media

# Documentation:
# @raycast.author Aiman Salim
# @raycast.authorURL https://aimansalim.com

# Change to your project directory
cd "$HOME/Biz/Aiman/Coding/landing-page"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
  echo "❌ Node.js is not installed. Please install Node.js to use this script."
  exit 1
fi

# Function to display help
show_help() {
  echo "🖼️ Quote Generator"
  echo ""
  echo "Usage:"
  echo "1. No arguments: Generate images from all quotes in phrase bank"
  echo "2. [quote] --add: Add a new quote to your phrase bank"
  echo "3. [quote] --single: Generate an image from just this quote"
  echo "4. help: Display this help message"
  echo ""
  echo "Examples:"
  echo "- 'help': Show this help"
  echo "- 'TAKE ACTION.' --add: Add this quote to your phrase bank"
  echo "- 'THAT'S HOW YOU LEARN.' --single: Generate image from this single quote"
  echo "- (no input): Generate images from all quotes in phrase bank"
}

# Check if help is requested
if [[ "$1" == "help" ]]; then
  show_help
  exit 0
fi

# Determine what to do based on arguments
if [[ -z "$1" ]]; then
  # No arguments - generate from all quotes
  echo "🖼️ Generating images from all quotes in phrase bank..."
  node generate-quote-images.mjs
  
  # Open the output directory
  open "$(pwd)/output/quote_images"
  
elif [[ "$2" == "--add" ]]; then
  # Add quote to phrase bank
  echo "✍️ Adding quote to phrase bank: $1"
  node generate-quote-images.mjs --add-quote "$1"
  echo "Quote added to phrase bank! ✓"
  
elif [[ "$2" == "--single" ]]; then
  # Generate image from single quote
  echo "🖼️ Generating image for single quote: $1"
  
  # Create a temporary file
  TEMP_FILE=$(mktemp)
  echo "[$1]" > "$TEMP_FILE"
  
  # Use the temp file as the source for the generator
  SINGLE_QUOTE_DIR="$(pwd)/output/quote_images/single"
  mkdir -p "$SINGLE_QUOTE_DIR"
  
  # Run the script with a custom output directory for this single quote
  ORIGINAL_OUTPUT_DIR="$(pwd)/output/quote_images"
  node -e "
    const fs = require('fs');
    const path = require('path');
    
    // Read the original script
    const scriptPath = path.join(process.cwd(), 'generate-quote-images.mjs');
    let scriptContent = fs.readFileSync(scriptPath, 'utf8');
    
    // Modify the output directory for just this run
    scriptContent = scriptContent.replace(
      /const outputDir = path\.join\(process\.cwd\(\), 'output', 'quote_images'\);/,
      \"const outputDir = path.join(process.cwd(), 'output', 'quote_images', 'single');\"
    );
    
    // Execute the modified script with the temp file
    const tempScript = path.join(process.cwd(), 'temp-quote-script.mjs');
    fs.writeFileSync(tempScript, scriptContent);
    
    // Load the content from the temp file
    const quote = fs.readFileSync('$TEMP_FILE', 'utf8').trim().replace(/^\[|\]$/g, '');
    
    // Run the modified script with a subprocess
    const { execSync } = require('child_process');
    try {
      execSync(\`node \${tempScript} --run-single \"\${quote}\"\`, { stdio: 'inherit' });
    } catch (e) {
      console.error('Error running script:', e);
    } finally {
      // Clean up
      fs.unlinkSync(tempScript);
    }
  "
  
  # Clean up the temp file
  rm "$TEMP_FILE"
  
  # Open the output directory
  open "$SINGLE_QUOTE_DIR"

else
  # Unrecognized command or missing second argument
  echo "❓ Not sure what to do with: $1 $2"
  show_help
fi 