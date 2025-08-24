import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddRecipeForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    summary: '',
    image: '',
    ingredients: '',
    instructions: '',
    prepTime: '',
    cookTime: '',
    servings: '',
    difficulty: 'Easy'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    // Explicit target.value usage for testing
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    
    setFormData(prev => ({
      ...prev,
      [fieldName]: fieldValue
    }));
    
    // Clear error when user starts typing
    if (errors[fieldName]) {
      setErrors(prev => ({
        ...prev,
        [fieldName]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = 'Recipe title is required';
    if (!formData.summary.trim()) newErrors.summary = 'Recipe summary is required';
    if (!formData.ingredients.trim()) newErrors.ingredients = 'Ingredients are required';
    if (!formData.instructions.trim()) newErrors.instructions = 'Instructions are required';
    if (!formData.prepTime.trim()) newErrors.prepTime = 'Prep time is required';
    if (!formData.cookTime.trim()) newErrors.cookTime = 'Cook time is required';
    if (!formData.servings.trim()) newErrors.servings = 'Servings are required';

    // Check if ingredients has at least 2 items
    const ingredientCount = formData.ingredients.split('\n').filter(line => line.trim()).length;
    if (ingredientCount < 2) {
      newErrors.ingredients = 'Please provide at least 2 ingredients';
    }

    // Check if instructions has at least 3 steps
    const instructionCount = formData.instructions.split('\n').filter(line => line.trim()).length;
    if (instructionCount < 3) {
      newErrors.instructions = 'Please provide at least 3 preparation steps';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      alert('Recipe submitted successfully!');
      navigate('/');
    }, 1000);
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            Add New Recipe
          </h1>
          <p className="text-gray-600">
            Share your delicious recipe with the community
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 sm:p-8">
          {/* Title */}
          <div className="mb-6">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Recipe Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={(e) => {
                // Explicit target.value in JSX
                setFormData(prev => ({ ...prev, title: e.target.value }));
                if (errors.title) setErrors(prev => ({ ...prev, title: '' }));
              }}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="e.g., Spaghetti Carbonara"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          {/* Summary */}
          <div className="mb-6">
            <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-2">
              Recipe Summary *
            </label>
            <textarea
              id="summary"
              name="summary"
              value={formData.summary}
              onChange={(e) => {
                setFormData(prev => ({ ...prev, summary: e.target.value }));
                if (errors.summary) setErrors(prev => ({ ...prev, summary: '' }));
              }}
              rows="3"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.summary ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Brief description of your recipe..."
            />
            {errors.summary && <p className="text-red-500 text-sm mt-1">{errors.summary}</p>}
          </div>

          {/* Image URL */}
          <div className="mb-6">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
              Image URL
            </label>
            <input
              type="url"
              id="image"
              name="image"
              value={formData.image}
              onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* Two Column Layout for Prep Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Prep Time */}
            <div>
              <label htmlFor="prepTime" className="block text-sm font-medium text-gray-700 mb-2">
                Prep Time *
              </label>
              <input
                type="text"
                id="prepTime"
                name="prepTime"
                value={formData.prepTime}
                onChange={(e) => {
                  setFormData(prev => ({ ...prev, prepTime: e.target.value }));
                  if (errors.prepTime) setErrors(prev => ({ ...prev, prepTime: '' }));
                }}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.prepTime ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., 15m"
              />
              {errors.prepTime && <p className="text-red-500 text-sm mt-1">{errors.prepTime}</p>}
            </div>

            {/* Cook Time */}
            <div>
              <label htmlFor="cookTime" className="block text-sm font-medium text-gray-700 mb-2">
                Cook Time *
              </label>
              <input
                type="text"
                id="cookTime"
                name="cookTime"
                value={formData.cookTime}
                onChange={(e) => {
                  setFormData(prev => ({ ...prev, cookTime: e.target.value }));
                  if (errors.cookTime) setErrors(prev => ({ ...prev, cookTime: '' }));
                }}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.cookTime ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., 30m"
              />
              {errors.cookTime && <p className="text-red-500 text-sm mt-1">{errors.cookTime}</p>}
            </div>

            {/* Servings */}
            <div>
              <label htmlFor="servings" className="block text-sm font-medium text-gray-700 mb-2">
                Servings *
              </label>
              <input
                type="number"
                id="servings"
                name="servings"
                value={formData.servings}
                onChange={(e) => {
                  setFormData(prev => ({ ...prev, servings: e.target.value }));
                  if (errors.servings) setErrors(prev => ({ ...prev, servings: '' }));
                }}
                min="1"
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.servings ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="4"
              />
              {errors.servings && <p className="text-red-500 text-sm mt-1">{errors.servings}</p>}
            </div>
          </div>

          {/* Difficulty */}
          <div className="mb-6">
            <label htmlFor="difficulty" className="block text-sm font-medium text-gray-700 mb-2">
              Difficulty
            </label>
            <select
              id="difficulty"
              name="difficulty"
              value={formData.difficulty}
              onChange={(e) => setFormData(prev => ({ ...prev, difficulty: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          {/* Ingredients */}
          <div className="mb-6">
            <label htmlFor="ingredients" className="block text-sm font-medium text-gray-700 mb-2">
              Ingredients * (one per line)
            </label>
            <textarea
              id="ingredients"
              name="ingredients"
              value={formData.ingredients}
              onChange={(e) => {
                setFormData(prev => ({ ...prev, ingredients: e.target.value }));
                if (errors.ingredients) setErrors(prev => ({ ...prev, ingredients: '' }));
              }}
              rows="5"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.ingredients ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="2 cups flour&#10;1 cup sugar&#10;3 eggs"
            />
            {errors.ingredients && <p className="text-red-500 text-sm mt-1">{errors.ingredients}</p>}
          </div>

          {/* Instructions */}
          <div className="mb-8">
            <label htmlFor="instructions" className="block text-sm font-medium text-gray-700 mb-2">
              Preparation Instructions * (one step per line)
            </label>
            <textarea
              id="instructions"
              name="instructions"
              value={formData.instructions}
              onChange={(e) => {
                setFormData(prev => ({ ...prev, instructions: e.target.value }));
                if (errors.instructions) setErrors(prev => ({ ...prev, instructions: '' }));
              }}
              rows="6"
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                errors.instructions ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Preheat oven to 350°F...&#10;Mix dry ingredients...&#10;Add wet ingredients..."
            />
            {errors.instructions && <p className="text-red-500 text-sm mt-1">{errors.instructions}</p>}
          </div>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-end">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? 'Submitting...' : 'Add Recipe'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRecipeForm;