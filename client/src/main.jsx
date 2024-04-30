import React from 'react'
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
// Redux
import store from './store';
import { Provider } from 'react-redux';

import PrivateRoute from './components/PrivateRoute.jsx';
import App from './App.jsx'
// Screens
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import HomeScreen from './screens/HomeScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import CreateRecipeScreen from './screens/CreateRecipeScreen.jsx';
import UpdateRecipeScreen from './screens/UpdateRecipeScreen.jsx';
import SavedRecipeScreen from './screens/SavedRecipeScreen.jsx';
import ReadRecipe from './screens/ReadRecipe.jsx';
import ViewRecipes from './screens/ViewRecipes.jsx';

// Création du routeur
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      {/* Toutes les routes qui doivent être privées */}
      <Route path='' element={<PrivateRoute />}>
        <Route path='/profile' element={<ProfileScreen />} />
        <Route path='/oneRecipeAuth/:id' element={<UpdateRecipeScreen />} />
        <Route path='/createRecipe' element={<CreateRecipeScreen />} />
        <Route path='/allRecipesFavorite' element={<SavedRecipeScreen />} />
        <Route path='/allRecipesAuth' element={<ViewRecipes />} />
        <Route path='/viewRecipeAuth/:id' element={<ReadRecipe />} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
