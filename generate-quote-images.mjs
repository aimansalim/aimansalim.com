import puppeteer from 'puppeteer';
import fs from 'fs/promises';
import path from 'path';
import { parse } from 'csv-parse/sync';

// Path to the quotes database file (JSON)
const QUOTES_DB_PATH = path.join(process.cwd(), 'src', 'data', 'phrase-bank.json');
const TWITTER_CSV_PATH = process.argv[2] || '/Users/aiman/Downloads/TwExportly_newmentalities_tweets_2025_05_20.csv';
const outputDir = path.join(process.cwd(), 'output', 'quote_images');

// Sample default quotes as fallback
const DEFAULT_QUOTES = [
  "TAKE ACTION.",
  "THAT'S HOW YOU LEARN."
];

/**
 * Load all quotes from the phrase bank JSON file
 * If the file doesn't exist, it will be created with default quotes
 */
async function loadQuotesFromBank() {
  try {
    const fileExists = await fs.access(QUOTES_DB_PATH).then(() => true).catch(() => false);
    
    if (!fileExists) {
      // Create initial phrase bank file with default quotes
      await fs.mkdir(path.dirname(QUOTES_DB_PATH), { recursive: true });
      await fs.writeFile(QUOTES_DB_PATH, JSON.stringify(DEFAULT_QUOTES, null, 2), 'utf8');
      console.log(`Created new phrase bank at ${QUOTES_DB_PATH}`);
      return DEFAULT_QUOTES;
    }
    
    // Load existing quotes
    const data = await fs.readFile(QUOTES_DB_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading quotes from phrase bank:', error);
    return DEFAULT_QUOTES; // Fallback to defaults
  }
}

/**
 * Add a new quote to the phrase bank
 */
async function addQuoteToBank(quote) {
  try {
    const quotes = await loadQuotesFromBank();
    if (!quotes.includes(quote)) {
      quotes.push(quote);
      await fs.writeFile(QUOTES_DB_PATH, JSON.stringify(quotes, null, 2), 'utf8');
      console.log(`Added new quote to phrase bank: "${quote}"`);
      return true;
    } else {
      console.log(`Quote already exists in phrase bank: "${quote}"`);
      return false;
    }
  } catch (error) {
    console.error('Error adding quote to phrase bank:', error);
    return false;
  }
}

/**
 * Extract quotes from Twitter CSV export
 */
async function loadQuotesFromTwitterCSV(csvPath) {
  try {
    const fileExists = await fs.access(csvPath).then(() => true).catch(() => false);
    if (!fileExists) {
      console.error(`Twitter CSV file not found: ${csvPath}`);
      return [];
    }
    
    const csvContent = await fs.readFile(csvPath, 'utf8');
    const records = parse(csvContent, {
      columns: true,
      skip_empty_lines: true
    });
    
    // Extract tweet text from the CSV
    // The column name might vary depending on the export format
    // Common column names are "text", "tweet", "content", etc.
    const tweets = records.map(record => {
      // Try different possible column names for tweet content
      return record.text || record.tweet || record.content || record.Tweet || record.Text || record.Content;
    }).filter(text => !!text);
    
    console.log(`Loaded ${tweets.length} tweets from CSV`);
    return tweets;
  } catch (error) {
    console.error('Error loading quotes from Twitter CSV:', error);
    return [];
  }
}

async function generateImageForQuote(quoteText, index) {
  let browser;
  try {
    browser = await puppeteer.launch({ headless: true }); // Or { headless: 'new' } for newer versions
    const page = await browser.newPage();

    // Clean quote text - remove URLs, hashtags, and mentions
    const cleanedQuote = quoteText
      .replace(/https?:\/\/\S+/g, '') // Remove URLs
      .replace(/@\w+/g, '')          // Remove mentions
      .replace(/#\w+/g, '')          // Remove hashtags
      .trim()
      .toUpperCase();                // Make uppercase for aesthetic
    
    // Skip if the cleaned quote is too short
    if (cleanedQuote.length < 5) {
      console.log(`Skipping quote ${index} - too short after cleaning`);
      return;
    }

    // HTML content for the quote image, mimicking the minimal style in the example
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Quote Image</title>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js" integrity="sha512-BNaRQnYJYiPSqHHDb58B0yaPfCu+Wgds8Gp/gU33kqBtgNS4tSPHuGibyoVXM5JTtnlV4sqQRjKVAX+ZmmeYcQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
        <style>
          @font-face {
            font-family: 'Monospace';
            src: local('Courier New');
            font-weight: normal;
            font-style: normal;
          }
          
          body, html { 
            margin: 0; 
            padding: 0; 
            width: 1200px; 
            height: 1600px; 
            background-color: black;
          }
          
          #quote-container {
            width: 1200px;
            height: 1600px;
            background-color: black;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            color: white;
            box-sizing: border-box;
            padding: 200px;
          }
          
          .quote-text {
            font-family: 'Courier New', monospace;
            font-size: 48px;
            text-align: center;
            line-height: 1.25;
            letter-spacing: 0.05em; 
            margin: 0;
            width: 100%;
            word-wrap: break-word;
            text-transform: uppercase;
          }
        </style>
      </head>
      <body>
        <div id="quote-container">
          <p class="quote-text">${cleanedQuote.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
        </div>
        <script>
          async function capture() {
            await new Promise(resolve => setTimeout(resolve, 100)); 
            const element = document.getElementById('quote-container');
            const canvas = await html2canvas(element, {
              backgroundColor: '#000000',
              scale: 1,
              logging: false,
              allowTaint: true,
              useCORS: true,
              width: 1200,
              height: 1600
            });
            return canvas.toDataURL('image/jpeg', 0.95);
          }
        </script>
      </body>
      </html>
    `;

    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    await page.setViewport({ width: 1200, height: 1600 });

    const imageBase64 = await page.evaluate(async () => {
      // @ts-ignore
      return await capture();
    });
    
    await browser.close();

    // Create a safe filename from the first few words of the quote
    const safeQuote = cleanedQuote.slice(0, 30)
      .replace(/[^a-zA-Z0-9]/g, '_')
      .replace(/_+/g, '_')
      .toLowerCase();
    
    const filePath = path.join(outputDir, `quote_${index}_${safeQuote}.jpg`);
    const imageBuffer = Buffer.from(imageBase64.split(',')[1], 'base64');
    await fs.writeFile(filePath, imageBuffer);
    console.log(`Successfully generated: ${filePath}`);

    // Add this quote to our phrase bank for future use
    await addQuoteToBank(cleanedQuote);

  } catch (error) {
    console.error(`Error generating image for quote ${index}:`, error);
    if (browser) {
      await browser.close();
    }
  }
}

/**
 * Command-line interface for adding a new quote
 */
async function addQuoteFromCommandLine() {
  if (process.argv.includes('--add-quote') && process.argv.length > 3) {
    const quoteIndex = process.argv.indexOf('--add-quote');
    if (process.argv.length > quoteIndex + 1) {
      const quote = process.argv[quoteIndex + 1];
      await addQuoteToBank(quote);
      console.log('You can generate images for all quotes using: node generate-quote-images.mjs');
      process.exit(0);
    }
  }
}

/**
 * Process a single quote (used by Raycast integration)
 */
async function processSingleQuote() {
  const runSingleIndex = process.argv.indexOf('--run-single');
  if (runSingleIndex !== -1 && process.argv.length > runSingleIndex + 1) {
    const singleQuote = process.argv[runSingleIndex + 1];
    console.log(`Processing single quote: "${singleQuote}"`);
    await generateImageForQuote(singleQuote, 0);
    process.exit(0);
  }
}

async function main() {
  try {
    // Handle command line options
    if (process.argv.includes('--help')) {
      console.log(`
Quote Image Generator - Usage:
  
  # Generate images from phrase bank
  node generate-quote-images.mjs
  
  # Add a new quote to the phrase bank
  node generate-quote-images.mjs --add-quote "YOUR QUOTE HERE"
  
  # Generate images from Twitter export CSV
  node generate-quote-images.mjs /path/to/twitter/export.csv
  
  # Generate a single quote image (used by Raycast)
  node generate-quote-images.mjs --run-single "YOUR QUOTE HERE"
  
  # Help
  node generate-quote-images.mjs --help
      `);
      return;
    }
    
    // Check for add quote command
    await addQuoteFromCommandLine();
    
    // Check for single quote processing (Raycast integration)
    await processSingleQuote();
    
    // Create output directory
    await fs.mkdir(outputDir, { recursive: true });
    console.log(`Output directory created/ensured at: ${outputDir}`);
    
    // Load quotes from phrase bank
    const bankQuotes = await loadQuotesFromBank();
    console.log(`Loaded ${bankQuotes.length} quotes from phrase bank`);
    
    // Load quotes from Twitter CSV if provided
    let twitterQuotes = [];
    if (process.argv.length > 2 && !process.argv[2].startsWith('--')) {
      twitterQuotes = await loadQuotesFromTwitterCSV(process.argv[2]);
    }
    
    // Combine all quotes (removing duplicates)
    const allQuotes = [...new Set([...bankQuotes, ...twitterQuotes])];
    
    if (allQuotes.length === 0) {
      console.log('No quotes found. Please add quotes or provide a Twitter CSV file.');
      return;
    }
    
    console.log(`Processing ${allQuotes.length} quotes in total...`);
    
    for (let i = 0; i < allQuotes.length; i++) {
      console.log(`Processing quote ${i + 1}/${allQuotes.length}...`);
      await generateImageForQuote(allQuotes[i], i);
    }
    
    console.log('All quotes processed.');
    console.log(`Images saved to: ${outputDir}`);
    
  } catch (error) {
    console.error('Error in main function:', error);
  }
}

main(); 