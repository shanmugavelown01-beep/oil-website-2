// Environment Configuration
// Handles both local and production deployments

const CONFIG = {
  // API URL configuration
  get apiUrl() {
    const isDev = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    
    if (isDev) {
      // Local development: use localhost backend
      return 'http://localhost:3000';
    } else {
      // Production: Check for environment variable or use default
      // To use external backend, set in localStorage: localStorage.setItem('apiUrl', 'https://your-railway-url');
      const externalUrl = window.__API_URL__ || localStorage.getItem('apiUrl');
      
      if (externalUrl) {
        return externalUrl;
      }
      
      // Default: Show helpful message
      console.warn('⚠️ No backend configured for production!');
      console.warn('To fix 404 errors:');
      console.warn('1. Deploy backend to Railway/Render/Heroku');
      console.warn('2. Update config.js with production backend URL');
      console.warn('3. Or set via: localStorage.setItem("apiUrl", "https://your-backend.com")');
      
      return null;
    }
  }
};

// Diagnostic info
console.log('🔧 Config Debug:', {
  hostname: window.location.hostname,
  isDevelopment: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1',
  apiUrl: CONFIG.apiUrl
});
