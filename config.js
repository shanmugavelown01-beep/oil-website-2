// Environment Configuration
// Always use the local Express server on localhost:3000

const CONFIG = {
  // Always use localhost:3000 for the backend API
  // The Express server handles all data persistence
  apiUrl: 'http://localhost:3000'
};

// Log configuration for debugging
console.log('Config:', {
  apiUrl: CONFIG.apiUrl,
  timestamp: new Date().toISOString()
});
