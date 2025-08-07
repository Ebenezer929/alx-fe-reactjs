import axios from 'axios';

const BASE_URL = 'https://api.github.com';

// Configure axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Accept': 'application/vnd.github.v3+json',
    ...(import.meta.env.VITE_GITHUB_TOKEN && {
      'Authorization': `token ${import.meta.env.VITE_GITHUB_TOKEN}`
    })
  }
});

/**
 * Fetches detailed user data by username
 * @param {string} username - GitHub username
 * @returns {Promise<Object>} User data
 * @throws {Error} If user not found or API fails
 */
export const fetchUserData = async (username) => {
  try {
    const { data } = await api.get(`/users/${username}`);
    return data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error('User not found');
    }
    throw new Error(error.response?.data?.message || 'Failed to fetch user data');
  }
};

/**
 * Searches users with advanced filters
 * @param {Object} params - Search parameters
 * @param {string} [params.username] - Username filter
 * @param {string} [params.location] - Location filter
 * @param {number} [params.minRepos] - Minimum repositories
 * @returns {Promise<Array>} Array of user objects
 * @throws {Error} If search fails
 */
export const searchUsers = async (params) => {
  const query = [
    params.username && `${params.username} in:login`,
    params.location && `location:${params.location}`,
    params.minRepos && `repos:>${params.minRepos}`
  ].filter(Boolean).join('+');

  try {
    const { data } = await api.get(`/search/users?q=${encodeURIComponent(query)}`);
    
    // Fetch detailed data for each user in parallel
    const usersWithDetails = await Promise.all(
      data.items.map(user => 
        fetchUserData(user.login).catch(() => null)
    );
    
    return usersWithDetails.filter(Boolean);
  } catch (error) {
    if (error.response?.status === 403) {
      throw new Error('API rate limit exceeded. Try again later.');
    }
    throw new Error(error.response?.data?.message || 'Failed to search users');
  }
};