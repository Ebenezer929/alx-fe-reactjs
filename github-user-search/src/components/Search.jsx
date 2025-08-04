import axios from 'axios';

const API_URL = 'https://api.github.com';

// Basic user fetch function (required)
const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`${API_URL}/users/${username}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error("Looks like we can't find the user");
    }
    throw new Error('An error occurred while fetching user data');
  }
};

// Advanced search function
const advancedSearchUsers = async (params) => {
  try {
    // Build query string based on provided parameters
    let query = '';
    if (params.username) query += `${params.username} in:login`;
    if (params.location) query += ` location:${params.location}`;
    if (params.minRepos) query += ` repos:>${params.minRepos}`;
    if (params.language) query += ` language:${params.language}`;

    const response = await axios.get(`${API_URL}/search/users`, {
      params: {
        q: query,
        per_page: 30
      }
    });

    // Get detailed info for each user
    const usersWithDetails = await Promise.all(
      response.data.items.map(async (user) => {
        try {
          const userDetails = await fetchUserData(user.login); // Reusing fetchUserData
          return userDetails;
        } catch {
          return { 
            ...user, 
            public_repos: null, 
            followers: null, 
            location: null 
          };
        }
      })
    );

    return usersWithDetails;
  } catch (error) {
    if (error.response?.status === 403) {
      throw new Error('API rate limit exceeded');
    }
    throw new Error("Looks like we can't find any matching users");
  }
};

export { fetchUserData, advancedSearchUsers };