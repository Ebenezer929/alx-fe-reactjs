import { useState } from 'react';
import { fetchUserData, searchUsers } from '../services/githubService';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchType, setSearchType] = useState('basic'); // 'basic' or 'advanced'

  const handleBasicSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchUserData(searchTerm);
      setUsers([data]);
    } catch (err) {
      setError('Looks like we cant find the user');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAdvancedSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const query = [
        searchTerm && `${searchTerm} in:login`,
        location && `location:${location}`,
        minRepos && `repos:>${minRepos}`
      ].filter(Boolean).join('+');
      
      const data = await searchUsers(query);
      setUsers(data.items);
    } catch (err) {
      setError('Error searching users. Please try again.');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">GitHub User Search</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex mb-6">
          <button
            onClick={() => setSearchType('basic')}
            className={`px-4 py-2 rounded-l-lg ${searchType === 'basic' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Basic Search
          </button>
          <button
            onClick={() => setSearchType('advanced')}
            className={`px-4 py-2 rounded-r-lg ${searchType === 'advanced' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          >
            Advanced Search
          </button>
        </div>

        {searchType === 'basic' ? (
          <form onSubmit={handleBasicSearch} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                GitHub Username
              </label>
              <input
                type="text"
                id="username"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter GitHub username"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
            >
              Search
            </button>
          </form>
        ) : (
          <form onSubmit={handleAdvancedSearch} className="space-y-4">
            <div>
              <label htmlFor="searchTerm" className="block text-sm font-medium text-gray-700 mb-1">
                Username (optional)
              </label>
              <input
                type="text"
                id="searchTerm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search in usernames"
              />
            </div>
            
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location (optional)
              </label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Filter by location"
              />
            </div>
            
            <div>
              <label htmlFor="minRepos" className="block text-sm font-medium text-gray-700 mb-1">
                Minimum Repositories (optional)
              </label>
              <input
                type="number"
                id="minRepos"
                value={minRepos}
                onChange={(e) => setMinRepos(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                placeholder="Minimum number of repositories"
                min="0"
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
            >
              Advanced Search
            </button>
          </form>
        )}
      </div>

      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Loading...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {users.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Search Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {users.map((user) => (
              <div key={user.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={user.avatar_url}
                    alt={`${user.login}'s avatar`}
                    className="w-16 h-16 rounded-full"
                  />
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">
                      {user.name || user.login}
                    </h3>
                    <p className="text-gray-600">@{user.login}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  {user.location && (
                    <p className="flex items-center text-gray-700">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {user.location}
                    </p>
                  )}
                  
                  <p className="flex items-center text-gray-700">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Repositories: {user.public_repos || 'N/A'}
                  </p>
                  
                  <a
                    href={user.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 mt-2"
                  >
                    View full profile
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;