import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import { apiSlice } from './slices/apiSlice';
import {recipesApiSlice} from './slices/recipesApiSlice';
import recipeReducer from './slices/recipeSlice';
// création du store Redux
const store = configureStore({
 
  reducer: {  
    [apiSlice.reducerPath]: apiSlice.reducer, 
      auth: authReducer,
    [recipesApiSlice.reducerPath]:recipesApiSlice.reducer,
      recipe: recipeReducer,
  },
      
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), 
    devTools: true, 
});

export default store;