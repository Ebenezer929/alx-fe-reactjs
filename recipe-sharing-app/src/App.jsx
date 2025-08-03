import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';
import AddRecipeForm from './components/AddRecipeForm';
import SearchBar from './components/SearchBar';

function App() {
  return (
    <Router>
      <div className="app">
        <header>
          <h1>Recipe Sharing App</h1>
          <SearchBar />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<RecipeList />} />
            <Route path="/recipes/:id" element={<RecipeDetails />} />
            <Route path="/add" element={<AddRecipeForm />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;