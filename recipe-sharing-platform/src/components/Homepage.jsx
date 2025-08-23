import React, { useState, useEffect } from 'react';
import recipeData from '../data.json';

const HomePage = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Load recipe data from the JSON file
    setRecipes(recipeData);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Delicious Recipes</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover amazing recipes from around the world. Cook, share, and enjoy!
          </p>
        </div>

        {/* Recipes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 hover:scale-105 transform transition-transform"
            >
              {/* Recipe Image */}
              <div className="h-48 overflow-hidden">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Recipe Content */}
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  {recipe.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {recipe.summary}
                </p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200">
                  View Recipe
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty part or state */}
        {recipes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No recipes found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;