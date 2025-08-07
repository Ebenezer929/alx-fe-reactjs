import { useState } from 'react';
import { fetchUserData } from '../services/githubService';

const Search = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const data = await fetchUserData(username);
      setUserData(data);
    } catch (err) {
      setError('Looks like we cant find the user');
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      {loading && <p className="text-center py-4">Loading...</p>}
      
      {error && <p className="text-red-500 text-center py-4">{error}</p>}
      
      {userData && (
        <div className="mt-6 border rounded-lg p-4">
          <div className="flex items-center space-x-4">
            <img
              src={userData.avatar_url}
              alt={`${userData.login}'s avatar`}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <h2 className="font-bold text-lg">{userData.name || userData.login}</h2>
              {/* Display location if available */}
              {userData.location && (
                <p className="text-gray-600">
                  <svg
                    className="w-4 h-4 inline-block mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {userData.location}
                </p>
              )}
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <p>{userData.bio}</p>
            <p>Followers: {userData.followers} | Following: {userData.following}</p>
            <a
              href={userData.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              View GitHub Profile
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;