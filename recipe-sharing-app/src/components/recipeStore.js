import { create } from 'zustand';

const useRecipeStore = create((set, get) => ({
  recipes: [],
  searchTerm: '',
  filteredRecipes: [],
  
  // Basic CRUD actions
  addRecipe: (newRecipe) => 
    set((state) => ({ 
      recipes: [...state.recipes, newRecipe],
      filteredRecipes: [...state.filteredRecipes, newRecipe]
    })),
    
  setRecipes: (recipes) => 
    set({ 
      recipes,
      filteredRecipes: recipes 
    }),
    
  // Search functionality
  setSearchTerm: (term) => {
    set({ searchTerm: term });
    get().filterRecipes();
  },
  
  filterRecipes: () => {
    const { recipes, searchTerm } = get();
    set({
      filteredRecipes: recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        recipe.ingredients.toLowerCase().includes(searchTerm.toLowerCase())
      )
    });
  },
  
  // Other existing actions...
  updateRecipe: (updatedRecipe) => set((state) => ({
    recipes: state.recipes.map(recipe =>
      recipe.id === updatedRecipe.id ? updatedRecipe : recipe
    ),
    filteredRecipes: state.filteredRecipes.map(recipe =>
      recipe.id === updatedRecipe.id ? updatedRecipe : recipe
    )
  })),
  
  deleteRecipe: (id) => set((state) => ({
    recipes: state.recipes.filter(recipe => recipe.id !== id),
    filteredRecipes: state.filteredRecipes.filter(recipe => recipe.id !== id)
  }))
}));

export default useRecipeStore;