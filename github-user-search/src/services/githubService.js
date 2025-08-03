import axios from 'axios';

const API_URL = 'https://api.github.com';

export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`${API_URL}/users/${username}`);
    return {
      data: response.data,
      error: null
    };
  } catch (error) {
    return {
      data: null,
      error: error.response?.status === 404 
        ? 'User not found' 
        : 'An error occurred'
    };
  }
};