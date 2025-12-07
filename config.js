// Environment Configuration
// Use this to switch between local development and production APIs

const CONFIG = {
  // Detect if we're in development (localhost) or production (Vercel/Railway)
  isDevelopment: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1',
  
  // API Base URL - automatically switches between environments
  get apiUrl() {
    if (this.isDevelopment) {
      // Local development: use localhost backend
      return 'http://localhost:3000';
    } else {
      // Production: For Vercel serverless functions, use same origin
      // For Railway or external API, set via environment variable
      // Check in order: environment variable → localStorage → current origin
      const externalApi = window.__API_URL__ || localStorage.getItem('apiUrl');
      
      if (externalApi) {
        // Use external API if configured
        return externalApi;
      } else {
        // Default: Use Vercel serverless functions on same domain
        // This works because vercel.json routes /api/* to serverless functions
        return window.location.origin;
      }
    }
  }
};

// Log configuration for debugging
console.log('Config:', {
  hostname: window.location.hostname,
  isDevelopment: CONFIG.isDevelopment,
  apiUrl: CONFIG.apiUrl,
  timestamp: new Date().toISOString()
});
