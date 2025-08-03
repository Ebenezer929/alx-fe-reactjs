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
    const { name, value } = e.target; // Using target.value here
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
      setError(err.message || "Looks like we can't find any matching users");
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
              onChange={handleInputChange} // Using target.value through handleInputChange
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
              onChange={handleInputChange} // Using target.value through handleInputChange
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
              onChange={handleInputChange} // Using target.value through handleInputChange
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
              onChange={handleInputChange} // Using target.value through handleInputChange
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

      {/* Rest of the component remains the same */}
    </div>
  );
};

export default Search;