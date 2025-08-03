import { useState } from 'react';
import { fetchUserData } from '../services/githubService';

const Search = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);
    setError(null);
    setUserData(null);
    
    const { data, error } = await fetchUserData(username);
    
    setLoading(false);
    if (error) {
      setError(error === 'User not found' 
        ? "Looks like we can't find the user" 
        : "An error occurred. Please try again.");
    } else {
      setUserData(data);
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
          className="search-input"
        />
        <button 
          type="submit" 
          className="search-button"
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {loading && <p className="status-message">Loading...</p>}
      
      {error && (
        <p className="status-message error">
          {error}
        </p>
      )}

      {userData && (
        <div className="user-card">
          <img 
            src={userData.avatar_url} 
            alt={userData.login} 
            className="avatar"
          />
          <div className="user-info">
            <h2>{userData.name || userData.login}</h2>
            <p>{userData.bio || 'No bio available'}</p>
            <a 
              href={userData.html_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="profile-link"
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