import { useState } from 'react';
import { searchUsers } from '../services/githubService';

export default function Search() {
  const [params, setParams] = useState({
    username: '',
    location: '',
    minRepos: ''
  });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const results = await searchUsers(params);
      setUsers(results);
    } catch (err) {
      setError(err.message);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="flex flex-col space-y-2">
          <input
            type="text"
            value={params.username}
            onChange={(e) => setParams({...params, username: e.target.value})}
            placeholder="Username"
            className="p-2 border rounded"
          />
          <input
            type="text"
            value={params.location}
            onChange={(e) => setParams({...params, location: e.target.value})}
            placeholder="Location"
            className="p-2 border rounded"
          />
          <input
            type="number"
            value={params.minRepos}
            onChange={(e) => setParams({...params, minRepos: e.target.value})}
            placeholder="Min Repositories"
            className="p-2 border rounded"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {error && <div className="text-red-500 p-2">{error}</div>}

      <div className="mt-6 space-y-4">
        {users.map(user => (
          <div key={user.id} className="border p-4 rounded-lg">
            <div className="flex items-center space-x-4">
              <img 
                src={user.avatar_url} 
                alt={`${user.login}'s avatar`} 
                className="w-16 h-16 rounded-full"
              />
              <div>
                <h3 className="font-bold">{user.login}</h3>
                <a 
                  href={user.html_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  View Profile
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}