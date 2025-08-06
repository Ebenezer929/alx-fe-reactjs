import axios from 'axios';

const BASE_URL = 'https://api.github.com';

/**
 * Fetches GitHub user data by username
 * @param {string} username - GitHub username to search for
 * @returns {Promise<Object>} User data from GitHub API
 * @throws {Error} If the request fails or user is not found
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
 * Searches GitHub users with advanced filters
 * @param {string} username - Username search term
 * @param {string} location - Location filter
 * @param {number} minRepos - Minimum repositories filter
 * @returns {Promise<Array>} Array of matching users
 * @throws {Error} If the request fails
 */
export const searchUsers = async (username = '', location = '', minRepos = 0) => {
  try {
    // Build query string with filters
    const queryParts = [];
    if (username) queryParts.push(`${username} in:login`);
    if (location) queryParts.push(`location:${location}`);
    if (minRepos) queryParts.push(`repos:>${minRepos}`);
    
    const query = queryParts.join('+');
    const url = `${BASE_URL}/search/users?q=${encodeURIComponent(query)}`;
    
    const response = await axios.get(url);
    
    // Get detailed data for each user
    const usersWithDetails = await Promise.all(
      response.data.items.map(async (user) => {
        const details = await fetchUserData(user.login);
        return {
          ...user,
          ...details,
        };
      })
    );
    
    return usersWithDetails;
  } catch (error) {
    console.error('GitHub API error:', error);
    throw new Error('Failed to search users');
  }
};