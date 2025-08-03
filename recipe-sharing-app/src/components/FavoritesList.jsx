import useRecipeStore from './recipeStore';

const FavoritesList = () => {
  const favorites = useRecipeStore(state => 
    state.favorites.map(id => 
      state.recipes.find(recipe => recipe.id === id)
    ).filter(Boolean) // Filter out undefined if recipe not found
  );
  const removeFavorite = useRecipeStore(state => state.removeFavorite);

  return (
    <div className="favorites-container">
      <h2>❤️ My Favorites</h2>
      {favorites.length === 0 ? (
        <p>You haven't favorited any recipes yet!</p>
      ) : (
        <div className="favorites-grid">
          {favorites.map(recipe => (
            <div key={recipe.id} className="recipe-card">
              <h3>{recipe.title}</h3>
              <p>{recipe.description}</p>
              <button 
                onClick={() => removeFavorite(recipe.id)}
                className="remove-favorite-btn"
              >
                Remove from Favorites
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesList;