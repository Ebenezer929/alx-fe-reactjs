import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import recipeData from '../data.json';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find the recipe by ID
    const foundRecipe = recipeData.find(recipe => recipe.id === parseInt(id));
    setRecipe(foundRecipe);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading recipe...</div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Recipe not found</h2>
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // Use actual recipe data instead of mock data
  const ingredients = recipe.ingredients || [];
  const steps = recipe.steps || [];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link 
          to="/" 
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 text-sm sm:text-base"
        >
          ← Back to Recipes
        </Link>

        {/* Recipe Header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="h-64 sm:h-80 lg:h-96 overflow-hidden">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="p-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              {recipe.title}
            </h1>
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              {recipe.summary}
            </p>
            
            {/* Recipe Meta Info - Using actual recipe data */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <span className="block text-2xl font-bold text-blue-600">{recipe.prepTime}</span>
                <span className="text-sm text-gray-600">Prep Time</span>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <span className="block text-2xl font-bold text-green-600">{recipe.cookTime}</span>
                <span className="text-sm text-gray-600">Cook Time</span>
              </div>
              <div className="text-center p-3 bg-yellow-50 rounded-lg">
                <span className="block text-2xl font-bold text-yellow-600">{recipe.servings}</span>
                <span className="text-sm text-gray-600">Servings</span>
              </div>
              <div className="text-center p-3 bg-red-50 rounded-lg">
                <span className="block text-2xl font-bold text-red-600">{recipe.difficulty}</span>
                <span className="text-sm text-gray-600">Difficulty</span>
              </div>
            </div>
          </div>
        </div>

        {/* Ingredients and Steps Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Ingredients Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="w-2 h-6 bg-blue-600 mr-3 rounded"></span>
              Ingredients
            </h2>
            <ul className="space-y-3">
              {ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-start">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                  <span className="text-gray-700">{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Steps Card */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="w-2 h-6 bg-green-600 mr-3 rounded"></span>
              Cooking Steps
            </h2>
            <ol className="space-y-4">
              {steps.map((step, index) => (
                <li key={index} className="flex items-start">
                  <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-3 flex-shrink-0 text-sm font-bold">
                    {index + 1}
                  </span>
                  <span className="text-gray-700 leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Additional Info */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Chef's Notes</h2>
          <p className="text-gray-600 leading-relaxed">
            {recipe.chefsNotes || "This recipe can be easily customized with your favorite ingredients. Feel free to experiment and make it your own. Store any leftovers in an airtight container and enjoy within a few days."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;