// This middleware handles routing for the entire site on Cloudflare Pages

export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  
  // Handle API requests through the [[route]].js handler
  if (url.pathname.startsWith('/api/')) {
    // Let the API route handler in functions/api/[[route]].js handle this
    return context.next();
  }
  
  // For regular page routes, let Cloudflare Pages handle the static assets
  return context.next();
} 