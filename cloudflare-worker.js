// Cloudflare Worker to handle API requests when deployed to Cloudflare Pages
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  const url = new URL(request.url)
  
  // Check if the request is for the API
  if (url.pathname.startsWith('/api/')) {
    // Determine the API endpoint to proxy to
    // In production, replace with your actual backend API URL
    const backendUrl = "https://your-express-backend.example.com"
    
    // Forward the request to the backend API
    const targetUrl = new URL(url.pathname + url.search, backendUrl)
    
    // Create a new request with the same method, headers, and body
    const newRequest = new Request(targetUrl, {
      method: request.method,
      headers: request.headers,
      body: request.body,
      redirect: 'follow'
    })
    
    try {
      // Fetch the API response
      const response = await fetch(newRequest)
      
      // Return the response with CORS headers
      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }
      })
    } catch (error) {
      // Return an error response
      return new Response(JSON.stringify({ error: 'Failed to fetch API' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })
    }
  }
  
  // For non-API requests, let Cloudflare Pages handle it
  return fetch(request)
} 