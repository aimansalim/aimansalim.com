# YouTube Thumbnail Downloader - Serverless Deployment

This guide explains how to deploy the yt-dlp serverless function to various cloud platforms.

## Overview

The YouTube Thumbnail Downloader uses a serverless function (`src/functions/ytdlp-api.js`) to run yt-dlp in the cloud. This approach has several advantages:

1. No need to run a local server
2. No YouTube API key required
3. Leverages the power of yt-dlp for high-quality thumbnail extraction
4. Scales automatically

## Deployment Options

### Option 1: Netlify Functions

1. **Install Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

2. **Create a `netlify.toml` file in your project root**:
   ```toml
   [build]
     functions = "netlify/functions"

   [[redirects]]
     from = "/api/thumbnails"
     to = "/.netlify/functions/ytdlp-api"
     status = 200
   ```

3. **Create the functions directory**:
   ```bash
   mkdir -p netlify/functions
   ```

4. **Copy the function file**:
   ```bash
   cp src/functions/ytdlp-api.js netlify/functions/
   ```

5. **Create a package.json in the functions directory**:
   ```bash
   {
     "name": "ytdlp-api",
     "version": "1.0.0",
     "dependencies": {
       "yt-dlp-exec": "^1.0.0"
     }
   }
   ```

6. **Deploy to Netlify**:
   ```bash
   netlify deploy --prod
   ```

### Option 2: Vercel Serverless Functions

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Create an `api` directory in your project root**:
   ```bash
   mkdir -p api
   ```

3. **Copy the function file as thumbnails.js**:
   ```bash
   cp src/functions/ytdlp-api.js api/thumbnails.js
   ```

4. **Modify the function file to work with Vercel**:
   The `handler` function should be renamed to `default` and accept (req, res) instead of (event, context).

5. **Create a vercel.json file**:
   ```json
   {
     "functions": {
       "api/thumbnails.js": {
         "memory": 1024,
         "maxDuration": 60
       }
     }
   }
   ```

6. **Deploy to Vercel**:
   ```bash
   vercel --prod
   ```

### Option 3: AWS Lambda

For AWS Lambda, you'll need to package yt-dlp as a layer:

1. **Create a Lambda function using the AWS Console**

2. **Create a Lambda Layer with yt-dlp**:
   - Download the latest yt-dlp binary
   - Create a ZIP file with the structure: `bin/yt-dlp`
   - Upload this as a Lambda Layer
   - Attach the layer to your function

3. **Set the environment variable**:
   - `YT_DLP_PATH=/opt/bin/yt-dlp`

4. **Upload your function code**:
   - ZIP your function code and upload it
   - Set the handler to `ytdlp-api.handler`

5. **Configure API Gateway**:
   - Create a new API Gateway
   - Add a POST method to your function
   - Enable CORS
   - Deploy the API

## Using the Deployed Function

Once deployed, update the `YTDLP_API_ENDPOINT` in `src/pages/api/channel-thumbnails.ts` with your deployed function URL:

```typescript
// Update this with your deployed function URL
const YTDLP_API_ENDPOINT = 'https://your-deployment-url.netlify.app/api/thumbnails';
```

## Local Testing

You can test the function locally with:

```bash
node src/functions/ytdlp-api.js
```

This will run a test against the MKBHD channel and print the results.

## Troubleshooting

### Common Issues

1. **Function timeout**: Increase the function timeout in your serverless platform settings.
2. **Memory issues**: Increase the function memory allocation.
3. **yt-dlp not found**: Ensure the yt-dlp binary is properly included and executable.
4. **CORS errors**: Make sure the CORS headers are properly set.

### Debugging

The function includes extensive logging. Check your serverless platform's logs for detailed information about any errors. 