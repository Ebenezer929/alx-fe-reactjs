import axios from 'axios';

const BASE_URL = 'https://api.github.com';

/**
 * Fetches detailed user data by username
 * @param {string} username - GitHub username
 * @returns {Promise<Object>} User data
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
 * @param {Object} params - Search parameters
 * @param {string} [params.username] - Username to search
 * @param {string} [params.location] - Location filter
 * @param {number} [params.minRepos] - Minimum repositories
 * @returns {Promise<Array>} Array of user objects
 */
export const searchUsers = async (params) => {
  const queryParts = [
    params.username && `${params.username} in:login`,
    params.location && `location:${params.location}`,
    params.minRepos && `repos:>${params.minRepos}`
  ].filter(Boolean);

  const searchEndpoint = `https://api.github.com/search/users?q=${encodeURIComponent(queryParts.join('+'))}`;

  try {
    const response = await axios.get(searchEndpoint);

    const usersWithDetails = await Promise.all(
      response.data.items.map(async (user) => {
        try {
          const details = await fetchUserData(user.login);
          return {
            ...user,
            ...details
          };
        } catch {
          return null;
        }
      })
    );

    return usersWithDetails.filter(Boolean);
  } catch (error) {
    if (error.response?.status === 403) {
      throw new Error('API rate limit exceeded. Try again later.');
    }
    throw new Error('Failed to search users');
  }
};