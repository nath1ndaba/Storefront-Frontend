// API Configuration using environment variables
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

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