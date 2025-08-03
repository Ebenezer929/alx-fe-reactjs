import { create } from 'zustand';

function filterByTerm(recipes, term) {
  if (!term.trim()) return recipes;
  return recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(term.toLowerCase())
  );
}

export const useRecipeStore = create((set, get) => ({
  recipes: [],
  searchTerm: '',
  filteredRecipes: [],
  favorites: [],
  recommendations: [],

  // Recipe CRUD
  addRecipe: (recipe) =>
    set((state) => {
      const updatedRecipes = [...state.recipes, recipe];
      return {
        recipes: updatedRecipes,
        filteredRecipes: filterByTerm(updatedRecipes, state.searchTerm),
      };
    }),

  updateRecipe: (updatedRecipe) =>
    set((state) => {
      const updatedRecipes = state.recipes.map((r) =>
        r.id === updatedRecipe.id ? updatedRecipe : r
      );
      return {
        recipes: updatedRecipes,
        filteredRecipes: filterByTerm(updatedRecipes, state.searchTerm),
      };
    }),

  deleteRecipe: (id) =>
    set((state) => {
      const updatedRecipes = state.recipes.filter((r) => r.id !== id);
      return {
        recipes: updatedRecipes,
        filteredRecipes: filterByTerm(updatedRecipes, state.searchTerm),
        favorites: state.favorites.filter((favId) => favId !== id),
      };
    }),

  // Search
  setSearchTerm: (term) =>
    set((state) => ({
      searchTerm: term,
      filteredRecipes: filterByTerm(state.recipes, term),
    })),

  // Favorites
  addFavorite: (recipeId) =>
    set((state) => ({
      favorites: [...new Set([...state.favorites, recipeId])],
    })),

  removeFavorite: (recipeId) =>
    set((state) => ({
      favorites: state.favorites.filter((id) => id !== recipeId),
    })),

  // Recommendations
  generateRecommendations: () => {
    const { recipes, favorites } = get();
    const recommended = recipes.filter(
      (recipe) =>
        favorites.includes(recipe.id) &&
        Math.random() > 0.3 // Simple randomness for demo
    );
    set({ recommendations: recommended });
  },
}));
