import { useEffect } from 'react';
import useRecipeStore from './recipeStore';

const RecommendationsList = () => {
  const recommendations = useRecipeStore(state => state.recommendations);
  const generateRecommendations = useRecipeStore(state => state.generateRecommendations);
  const addFavorite = useRecipeStore(state => state.addFavorite);

  // Generate recommendations when component mounts
  useEffect(() => {
    generateRecommendations();
  }, [generateRecommendations]);

  return (
    <div className="recommendations-container">
      <h2>⭐ Recommended For You</h2>
      {recommendations.length === 0 ? (
        <p>No recommendations available yet. Add some favorites first!</p>
      ) : (
        <div className="recommendations-grid">
          {recommendations.map(recipe => (
            <div key={recipe.id} className="recipe-card">
              <h3>{recipe.title}</h3>
              <p>{recipe.description}</p>
              <button 
                onClick={() => addFavorite(recipe.id)}
                className="add-favorite-btn"
              >
                Add to Favorites
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecommendationsList;