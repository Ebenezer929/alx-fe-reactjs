import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import recipeData from '../data.json';

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    setRecipes(recipeData);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Add Recipe Button */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Delicious Recipes
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Discover amazing recipes from around the world. Cook, share, and enjoy!
          </p>
          <Link
            to="/add-recipe"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
          >
            + Add New Recipe
          </Link>
        </div>

        {/* Recipes Grid with responsive breakpoints */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 hover:scale-105 transform transition-transform"
            >
              {/* Recipe Image */}
              <div className="h-40 sm:h-48 overflow-hidden">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Recipe Content */}
              <div className="p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3">
                  {recipe.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3 text-sm sm:text-base">
                  {recipe.summary}
                </p>
                
                {/* Recipe Meta Info */}
                <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                  <span>⏱️ {recipe.prepTime}</span>
                  <span>👥 {recipe.servings} servings</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    recipe.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                    recipe.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {recipe.difficulty}
                  </span>
                </div>
                
                <Link 
                  to={`/recipe/${recipe.id}`}
                  className="inline-block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 text-sm sm:text-base text-center"
                >
                  View Recipe
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {recipes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">No recipes found.</p>
            <Link
              to="/add-recipe"
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
            >
              Add Your First Recipe
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;