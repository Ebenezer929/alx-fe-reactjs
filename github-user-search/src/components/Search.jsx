import { useState } from 'react';
import { searchUsers, fetchUserData } from '../services/githubService';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // First search for users
      const searchResults = await searchUsers({ username: searchTerm });
      
      // Then fetch detailed data for each user
      const detailedUsers = await Promise.all(
        searchResults.map(async (user) => {
          try {
            const fullDetails = await fetchUserData(user.login);
            return {
              ...user,
              ...fullDetails
            };
          } catch (err) {
            console.error(`Failed to fetch details for ${user.login}:`, err);
            return null;
          }
        })
      );

      setUsers(detailedUsers.filter(Boolean));
      
      if (detailedUsers.filter(Boolean).length === 0) {
        setError('Looks like we cant find the user');
      }
    } catch (err) {
      setError(err.message || 'Failed to search users');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter GitHub username"
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {loading && <p className="text-center py-4">Loading...</p>}
      
      {error && <p className="text-red-500 text-center py-4">{error}</p>}
      
      <div className="mt-6 space-y-4">
        {users.map((user) => (
          <div key={user.id} className="border rounded-lg p-4">
            <div className="flex items-center space-x-4">
              <img
                src={user.avatar_url}
                alt={`${user.login}'s avatar`}
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h2 className="font-bold">{user.login}</h2>
                {user.location && <p className="text-gray-600">{user.location}</p>}
              </div>
            </div>
            <div className="mt-4">
              <a
                href={user.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View Profile
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;