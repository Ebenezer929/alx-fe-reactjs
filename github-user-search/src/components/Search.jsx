import { useState } from 'react';
import { advancedSearchUsers } from '../services/githubService';

const Search = () => {
  const [searchParams, setSearchParams] = useState({
    username: '',
    location: '',
    minRepos: '',
    language: ''
  });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const results = await advancedSearchUsers(searchParams);
      setUsers(results);
    } catch (err) {
      setError(err.message || "An error occurred during search");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">GitHub User Search</h1>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 mb-2">Username</label>
            <input
              type="text"
              name="username"
              value={searchParams.username}
              onChange={handleInputChange}
              placeholder="e.g. octocat"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Location</label>
            <input
              type="text"
              name="location"
              value={searchParams.location}
              onChange={handleInputChange}
              placeholder="e.g. San Francisco"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Min Repositories</label>
            <input
              type="number"
              name="minRepos"
              value={searchParams.minRepos}
              onChange={handleInputChange}
              placeholder="e.g. 10"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Language</label>
            <input
              type="text"
              name="language"
              value={searchParams.language}
              onChange={handleInputChange}
              placeholder="e.g. JavaScript"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 rounded text-white ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-2 text-gray-600">Loading results...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
          <p>{error.includes('API rate limit exceeded') 
              ? 'API rate limit exceeded. Please try again later.' 
              : "Looks like we can't find any matching users"}</p>
        </div>
      )}

      {users.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-700">Search Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {users.map(user => (
              <div key={user.id} className="bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-4 mb-3">
                  <img 
                    src={user.avatar_url} 
                    alt={`${user.login}'s avatar`} 
                    className="w-16 h-16 rounded-full"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">{user.login}</h3>
                    {user.location && (
                      <p className="text-sm text-gray-500">
                        <svg className="inline mr-1 w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {user.location}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mb-3">
                  <span>Repos: {user.public_repos || 'N/A'}</span>
                  <span>Followers: {user.followers || 'N/A'}</span>
                </div>
                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center bg-gray-100 hover:bg-gray-200 text-gray-800 py-1 px-3 rounded text-sm transition-colors"
                >
                  View Profile
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;