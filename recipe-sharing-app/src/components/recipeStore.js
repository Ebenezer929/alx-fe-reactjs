// src/components/recipeStore.js

export const saveRecipe = (key, recipe) => {
  localStorage.setItem(key, JSON.stringify(recipe));
};

export const getRecipe = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};