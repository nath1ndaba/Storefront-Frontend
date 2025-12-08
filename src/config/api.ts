// API Configuration
// Change this to switch between local and production environments

// For local development:
// export const API_BASE_URL = '';  // Empty string uses Vite proxy

// For production:
// export const API_BASE_URL = 'https://storefrontapi.onrender.com';

// Current setting:
export const API_BASE_URL = ''; // Using Vite proxy for local development

// Helper function to build API URLs
export const getApiUrl = (path: string): string => {
  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  
  if (API_BASE_URL) {
    return `${API_BASE_URL}/${cleanPath}`;
  }
  
  // When using proxy, ensure path starts with /api
  return cleanPath.startsWith('api') ? `/${cleanPath}` : `/api/${cleanPath}`;
};