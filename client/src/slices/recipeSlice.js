import { createSlice } from '@reduxjs/toolkit';

// Initialisation de l'état initial pour le slice Redux
const initialState = {
  recipeInfo: {
    _id: "",
    name: "",
    country:"",
    category: "",
    regime: "",
    ingredients: [],
    instructions: "",
    makingTime: "",
    cookingTime: "",
    comments: "",
    pseudo: "",
    imageUrl: "",
    userId: window.localStorage.getItem("id"),
  }
};

const recipeSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {
    // Définir les infos de la recette + mise à jour et stock dans le local storage
    setRecipe: (state, action) => {
      state.recipeInfo = action.payload;
      localStorage.setItem('recipeInfo', JSON.stringify(action.payload));
    },

    // Réinitialiser RecipeInfo
    resetRecipeInfo: (state) => {
      state.recipeInfo = initialState.recipeInfo;
      localStorage.removeItem('recipeInfo');
    },
  },
});

export const { setRecipe, resetRecipeInfo } = recipeSlice.actions;

export default recipeSlice.reducer;
