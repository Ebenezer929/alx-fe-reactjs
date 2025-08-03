import { useState } from 'react';
import { searchUsers } from './services/githubService';
import SearchBar from './components/SearchBar';
import UserList from './components/UserList';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query) => {
    if (!query.trim()) return;
    
    setLoading(true);
    const results = await searchUsers(query);
    setUsers(results);
    setLoading(false);
  };

  return (
    <div className="app">
      <h1>GitHub User Search</h1>
      <SearchBar onSearch={handleSearch} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <UserList users={users} />
      )}
    </div>
  );
}

export default App;
