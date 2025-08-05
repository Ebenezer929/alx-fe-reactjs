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
    if (error.response && error.response.status === 404) {
      throw new Error('User not found');
    }
    throw new Error('Failed to fetch user data');
  }
};

/**
 * Searches GitHub users with advanced filters
 * @param {string} query - Search query with filters
 * @returns {Promise<Object>} Search results from GitHub API
 * @throws {Error} If the request fails
 */
export const searchUsers = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/search/users?q=${query}`);
    // Fetch additional details for each user
    const usersWithDetails = await Promise.all(
      response.data.items.map(async (user) => {
        const userDetails = await fetchUserData(user.login);
        return {
          ...user,
          ...userDetails
        };
      })
    );
    return { ...response.data, items: usersWithDetails };
  } catch (error) {
    throw new Error('Failed to search users');
  }
};