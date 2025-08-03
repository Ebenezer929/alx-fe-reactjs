import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';
import AddRecipeForm from './components/AddRecipeForm';
import SearchBar from './components/SearchBar';
import FavoritesList from './components/FavoritesList';
import RecommendationsList from './components/RecommendationsList';
import { useEffect } from 'react';
import useRecipeStore from './components/recipeStore';

function App() {
  const initialize = useRecipeStore(state => state.initialize);

  // Initialize with sample data
  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <Router>
      <div className="app">
        <header>
          <h1>Recipe Sharing App</h1>
          <SearchBar />
        </header>
        <main>
          <Routes>
            <Route path="/" element={
              <>
                <RecommendationsList />
                <RecipeList />
              </>
            } />
            <Route path="/recipes/:id" element={<RecipeDetails />} />
            <Route path="/add" element={<AddRecipeForm />} />
            <Route path="/favorites" element={<FavoritesList />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;