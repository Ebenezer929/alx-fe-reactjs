import axios from 'axios';

/**
 * Fetches GitHub user data by username
 * @param {string} username - GitHub username to search for
 * @returns {Promise<Object>} User data from GitHub API
 * @throws {Error} If the request fails or user is not found
 */
const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`https://api.github.com/users/${username}`);
    return response.data;
  } catch (error) {
    // Handle specific error cases if needed
    if (error.response && error.response.status === 404) {
      throw new Error('User not found');
    }
    throw new Error('Failed to fetch user data');
  }
};

// Named export as specified in requirements
export { fetchUserData };