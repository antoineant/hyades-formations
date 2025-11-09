// API configuration for different environments

const API_CONFIG = {
  development: {
    baseURL: 'http://localhost:3003/api'
  },
  production: {
    baseURL: 'https://hyades-formations-backend.onrender.com/api'
  }
}

// Detect environment
const ENV = import.meta.env.MODE || 'development'

// Export the appropriate config
export const API_BASE_URL = API_CONFIG[ENV].baseURL

// Helper function to build full API URLs
export const getApiUrl = (endpoint) => {
  return `${API_BASE_URL}${endpoint}`
}
