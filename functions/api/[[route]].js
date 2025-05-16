// Cloudflare Pages Functions handler for API routes

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  
  // Handle API routes by forwarding to our Express server
  if (url.pathname.startsWith('/api/')) {
    try {
      // Set up headers for CORS
      const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      };
      
      // Handle preflight OPTIONS request
      if (request.method === "OPTIONS") {
        return new Response(null, { 
          status: 204,
          headers 
        });
      }
      
      // We'll use an API URL from environment or fallback to running the API locally
      const API_URL = env.API_URL || "http://localhost:3001";
      
      // Create the API URL we want to forward to
      const apiUrl = new URL(url.pathname, API_URL);
      
      // Copy query parameters
      url.searchParams.forEach((value, key) => {
        apiUrl.searchParams.append(key, value);
      });
      
      // Create a new request to forward
      const apiRequest = new Request(apiUrl, {
        method: request.method,
        headers: request.headers,
        body: request.method !== "GET" ? await request.arrayBuffer() : undefined,
      });
      
      // Forward the request to our API
      const response = await fetch(apiRequest);
      
      // Return the response with CORS headers
      const responseHeaders = new Headers(response.headers);
      Object.entries(headers).forEach(([key, value]) => {
        responseHeaders.set(key, value);
      });
      
      return new Response(response.body, {
        status: response.status,
        headers: responseHeaders
      });
    } catch (error) {
      return new Response(JSON.stringify({
        error: "Failed to reach API server",
        message: error.message,
      }), {
        status: 500,
        headers: { 
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      });
    }
  }
  
  // For non-API routes, let normal Pages handling continue
  return context.next();
} 