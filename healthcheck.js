#!/usr/bin/env node

/**
 * Simple healthcheck script to verify if the API server is running
 * Run with: node healthcheck.js
 */

const http = require('http');

const API_URL = process.env.API_URL || 'http://localhost:3001';
const HEALTHCHECK_ENDPOINT = '/api';

console.log(`Checking API server at: ${API_URL}${HEALTHCHECK_ENDPOINT}`);

const url = new URL(HEALTHCHECK_ENDPOINT, API_URL);

// Make a GET request to the API
http.get(url.toString(), (res) => {
  const { statusCode } = res;
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    if (statusCode === 200) {
      console.log('✅ API server is running!');
      console.log('Response:', data);
      process.exit(0);
    } else {
      console.error(`❌ API server returned status: ${statusCode}`);
      console.error('Response:', data);
      process.exit(1);
    }
  });
}).on('error', (err) => {
  console.error('❌ Failed to connect to API server:');
  console.error(err.message);
  process.exit(1);
}); 