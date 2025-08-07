export const searchUsers = async (params) => {
  const query = [
    params.username && `${params.username} in:login`,
    params.location && `location:${params.location}`,
    params.minRepos && `repos:>${params.minRepos}`
  ].filter(Boolean).join('+');

  try {
    const response = await axios.get(
      `https://api.github.com/search/users?q=${encodeURIComponent(query)}`
    );
    return response.data.items;
  } catch (error) {
    throw new Error('Failed to search users');
  }
};