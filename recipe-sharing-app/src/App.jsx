import { Link, Routes, Route } from 'react-router-dom';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeList from './components/RecipeList';
import SearchBar from './components/SearchBar';
import FavoritesList from './components/FavoritesList';
import RecommendationsList from './components/RecommendationsList';
import { saveRecipe, getRecipe } from './components/recipeStore';

function App() {
  return (
    <div style={{
      padding: '2rem',
      maxWidth: '700px',
      margin: 'auto',
      fontFamily: 'Segoe UI, sans-serif',
      backgroundColor: '#fffefc',
      borderRadius: '8px',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)'
    }}>
      <h1 style={{ textAlign: 'center', color: '#ff6f61' }}>🍽️ Recipe Sharing App</h1>

      {/* 🔗 Navigation */}
      <nav style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
        marginBottom: '2rem',
        padding: '0.5rem',
        backgroundColor: '#f8f8f8',
        borderRadius: '6px'
      }}>
        <Link to="/" style={navLinkStyle}>🏠 Home</Link>
        <Link to="/favorites" style={navLinkStyle}>❤️ Favorites</Link>
        <Link to="/recommendations" style={navLinkStyle}>✨ Recommendations</Link>
      </nav>

      {/* 🧭 Route Views */}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <SearchBar />
              <RecipeList />
              <hr style={{ margin: '2rem 0' }} />
              <AddRecipeForm />
            </>
          }
        />
        <Route path="/favorites" element={<FavoritesList />} />
        <Route path="/recommendations" element={<RecommendationsList />} />
      </Routes>
    </div>
  );
}

// 🎨 Link Styling
const navLinkStyle = {
  textDecoration: 'none',
  color: '#333',
  padding: '0.5rem 1rem',
  borderRadius: '4px',
  backgroundColor: '#e0e0e0',
  transition: 'background-color 0.3s',
};

export default App;