import { Link } from 'react-router-dom';
import useRecipeStore from './recipeStore';
import { useEffect } from 'react';

const RecipeList = () => {
  const filteredRecipes = useRecipeStore(state => state.filteredRecipes);
  const filterRecipes = useRecipeStore(state => state.filterRecipes);

  // Filter recipes whenever component mounts
  useEffect(() => {
    filterRecipes();
  }, [filterRecipes]);

  return (
    <div className="recipe-list">
      <h2>Recipes</h2>
      {filteredRecipes.map(recipe => (
        <div key={recipe.id} className="recipe-card">
          <Link to={`/recipes/${recipe.id}`}>
            <h3>{recipe.title}</h3>
          </Link>
          <p>Ingredients: {recipe.ingredients.substring(0, 50)}...</p>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;