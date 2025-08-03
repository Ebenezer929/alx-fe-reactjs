import { useRecipeStore } from '../stores/recipeStore';

const SearchBar = () => {
  const setSearchTerm = useRecipeStore((state) => state.setSearchTerm);

  return (
    <input
      type="text"
      placeholder="🔎 Search recipes..."
      onChange={(e) => setSearchTerm(e.target.value)}
      style={{ padding: '0.5rem', width: '100%', marginBottom: '1rem' }}
    />
  );
};

export default SearchBar;