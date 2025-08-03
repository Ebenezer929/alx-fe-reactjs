import { useRecipeStore } from './recipeStore';

const SearchBar = () => {
  const setSearchTerm = useRecipeStore(state => state.setSearchTerm);

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by title or ingredients..."
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;