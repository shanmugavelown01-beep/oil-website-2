// Environment Configuration
// Use this to switch between local development and production APIs

const CONFIG = {
  // Detect if we're in development (localhost) or production (Vercel/Railway)
  isDevelopment: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1',
  
  // API Base URL - automatically switches between environments
  get apiUrl() {
    if (this.isDevelopment) {
      return 'http://localhost:3000';
    } else {
      // For production: use environment variable or fallback to Vercel/Railway domain
      // This will be set via environment variables during deployment
      const railwayUrl = window.__API_URL__ || localStorage.getItem('apiUrl');
      return railwayUrl || window.location.origin;
    }
  }
};

// Log configuration for debugging
console.log('Config:', {
  hostname: window.location.hostname,
  isDevelopment: CONFIG.isDevelopment,
  apiUrl: CONFIG.apiUrl
});
