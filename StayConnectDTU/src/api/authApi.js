import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true, // Important for cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

// Login user
export const loginUser = async (email, password) => {
  try {
    const response = await api.post('/users/login', {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      // Server responded with error status
      return {
        success: false,
        message: error.response.data.message || 'Login failed',
      };
    } else if (error.request) {
      // Network error
      return {
        success: false,
        message: 'Server Error',
      };
    } else {
      // Other error
      return {
        success: false,
        message: error.message || 'Server Error',
      };
    }
  }
};

// Logout user
export const logoutUser = async () => {
  try {
    const response = await api.get('/users/logout');
    return response.data;
  } catch (error) {
    if (error.response) {
      return {
        success: false,
        message: error.response.data.message || 'Logout failed',
      };
    } else if (error.request) {
      return {
        success: false,
        message: 'Server Error',
      };
    } else {
      return {
        success: false,
        message: error.message || 'Server Error',
      };
    }
  }
};

// Get current user
export const getUser = async () => {
  try {
    const response = await api.get('/users/userdata');
    return response.data;
  } catch (error) {
    if (error.response) {
      // Handle 401 (unauthorized) gracefully - this is expected for unauthenticated users
      if (error.response.status === 401) {
        return {
          success: false,
          message: 'Not authenticated',
          isUnauthorized: true
        };
      }
      return {
        success: false,
        message: error.response.data.message || 'Failed to get user',
      };
    } else if (error.request) {
      return {
        success: false,
        message: 'Server Error',
      };
    } else {
      return {
        success: false,
        message: error.message || 'Server Error',
      };
    }
  }
};

// Register user (optional - if you want to add registration)
export const registerUser = async (name, email, password) => {
  try {
    const response = await api.post('/users/register', {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      return {
        success: false,
        message: error.response.data.message || 'Registration failed',
      };
    } else if (error.request) {
      return {
        success: false,
        message: 'Server Error',
      };
    } else {
      return {
        success: false,
        message: error.message || 'Server Error',
      };
    }
  }
}; 