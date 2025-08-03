import { create } from 'zustand';

const useRecipeStore = create((set) => ({
  recipes: [],
  
  // CRUD Actions
  addRecipe: (newRecipe) => 
    set((state) => ({ recipes: [...state.recipes, newRecipe] })),
    
  setRecipes: (recipes) => 
    set({ recipes }),
    
  updateRecipe: (updatedRecipe) =>
    set((state) => ({
      recipes: state.recipes.map(recipe =>
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
      )
    })),
    
  deleteRecipe: (id) =>
    set((state) => ({
      recipes: state.recipes.filter(recipe => recipe.id !== id)
    })),
    
  // Helper to find single recipe
  getRecipeById: (id) => {
    return useRecipeStore.getState().recipes.find(recipe => recipe.id === id);
  }
}));

export default useRecipeStore;