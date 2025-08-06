import axios from 'axios';

const BASE_URL = 'https://api.github.com';

/**
 * Basic user fetch by username
 */
export const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/${username}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error('User not found');
    }
    throw new Error('Failed to fetch user data');
  }
};

/**
 * Advanced user search with multiple parameters
 */
export const searchUsers = async (params) => {
  try {
    // Construct query string with all parameters
    const queryParts = [];
    if (params.username) queryParts.push(`${params.username} in:login`);
    if (params.location) queryParts.push(`location:${params.location}`);
    if (params.minRepos) queryParts.push(`repos:>${params.minRepos}`);

    const queryString = queryParts.join('+');
    const apiUrl = `https://api.github.com/search/users?q=${encodeURIComponent(queryString)}`;

    // Make API request
    const response = await axios.get(apiUrl);
    
    // Fetch detailed data for each user
    const usersWithDetails = await Promise.all(
      response.data.items.map(user => 
        fetchUserData(user.login).catch(() => null)
      )
    );

    return usersWithDetails.filter(Boolean);
  } catch (error) {
    console.error('Search error:', error);
    throw new Error('Failed to search users');
  }
};