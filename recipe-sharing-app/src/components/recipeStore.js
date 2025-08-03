import { create } from 'zustand';

const useRecipeStore = create((set, get) => ({
  recipes: [],
  favorites: [],
  recommendations: [],
  
  // Existing CRUD actions...
  addRecipe: (newRecipe) => set((state) => ({ 
    recipes: [...state.recipes, newRecipe],
    filteredRecipes: [...state.filteredRecipes, newRecipe]
  })),
  
  // Favorites functionality
  addFavorite: (recipeId) => 
    set((state) => ({
      favorites: [...new Set([...state.favorites, recipeId])], // Prevent duplicates
    })),
  
  removeFavorite: (recipeId) => 
    set((state) => ({
      favorites: state.favorites.filter(id => id !== recipeId),
    })),
  
  // Recommendations functionality
  generateRecommendations: () => {
    const { recipes, favorites } = get();
    if (favorites.length === 0) {
      // If no favorites, show random recommendations
      const shuffled = [...recipes].sort(() => 0.5 - Math.random());
      set({ recommendations: shuffled.slice(0, 3) });
    } else {
      // Recommend similar recipes based on favorite ingredients
      const favoriteIngredients = favorites.flatMap(favId => {
        const recipe = recipes.find(r => r.id === favId);
        return recipe ? recipe.ingredients.toLowerCase().split(',') : [];
      });
      
      const recommended = recipes
        .filter(recipe => !favorites.includes(recipe.id))
        .sort((a, b) => {
          const aScore = favoriteIngredients.filter(ing => 
            a.ingredients.toLowerCase().includes(ing.trim())
          ).length;
          const bScore = favoriteIngredients.filter(ing => 
            b.ingredients.toLowerCase().includes(ing.trim())
          ).length;
          return bScore - aScore;
        })
        .slice(0, 3); // Top 3 recommendations
      
      set({ recommendations: recommended });
    }
  },
  
  // Initialize with sample data (optional)
  initialize: () => set({
    recipes: [
      {
        id: '1',
        title: 'Pasta Carbonara',
        description: 'Classic Italian pasta dish',
        ingredients: 'pasta, eggs, pancetta, parmesan, black pepper',
        instructions: 'Mix ingredients and serve hot'
      },
      // Add more sample recipes...
    ],
    filteredRecipes: [
      // Initial filtered recipes...
    ]
  })
}));

export default useRecipeStore;