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
      // Wrap single result in array to demonstrate map usage
      setUserData([data]);
    } catch (err) {
      setError('Looks like we cant find the user');
      setUserData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
          required
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      
      {error && <p>{error}</p>}
      
      {userData && (
        <div className="users-list">
          {userData.map((user) => (
            <div key={user.id} className="user-info">
              <img 
                src={user.avatar_url} 
                alt={`${user.login}'s avatar`} 
                width="100" 
              />
              <h2>{user.name || user.login}</h2>
              <p>{user.bio}</p>
              <p>Followers: {user.followers} | Following: {user.following}</p>
              <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                View GitHub Profile
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;