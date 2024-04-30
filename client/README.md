# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Procédure 
  **npm create vite@latest**
  y
  react
  javascript

**1/  Premières commandes**

  cd frontend
  npm install
  npm run dev

**2/ vite.config.js**

    import { defineConfig } from 'vite'
    import react from '@vitejs/plugin-react'

    export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
        proxy: {
        '/api': {
            target: 'http://localhost:3001',
            changeOrigin: true,
        },
        },
    },
    })

**Toutes les requêtes commençant par ‘/api’** seront redirigées vers **http://localhost:3001**. 
L’option **changeOrigin** est définie sur true, => **l’origine de la requête sera modifiée pour correspondre à l’origine de la cible**.


**3/  npm i react-bootstrap react-icons :**

**react-bootstrap** : C’est une **bibliothèque de composants d’interface utilisateur pour React basée sur Bootstrap**, un framework populaire pour le développement front-end. Elle vous permet d’utiliser des composants Bootstrap préconstruits dans votre application React.

**react-icons** : C’est une **bibliothèque qui fournit des icônes de plusieurs bibliothèques d’icônes populaires**, comme Font Awesome et Material Design, sous forme de composants React.


**4/ npm install bootstrap**


**5/ Dans le fichier main.jsx**

import 'bootstrap/dist/css/bootstrap.min.css'; => importer le fichier CSS principal de Bootstrap . Cela permet d’**utiliser les styles de Bootstrap** dans l'application Vite React.

**6/ mkdir components**

**7/ touch Header.jsx**

Ensuite faire l'import dans App 

ps: La différence entre Header.jsx et Header.js :
 - Header.js : C’est un fichier **JavaScript standard**. 
 - Header.jsx : C’est un fichier **JavaScript XML (JSX)**. JSX est une extension de la syntaxe JavaScript qui **permet d’écrire des structures ressemblant à du HTML dans votre code JavaScript**.


**8/ mkdir screens puis HomeScreen.jsx**

Ensuite faire l'import dans App


**9/ Hero.jsx dans Components:***

Voir le text de l'écran d'accueil, mise en page : zone de texte btn se connecter ou s'inscrire

**10/ npm install react-router-bootstrap**

Composants Bootstrap  compatibles avec react-router.

**11/ npm install react-router-dom**

Composants de routage nécessaires pour créer une application à page unique avec navigation.

**12/ createBrowserRouter,  createRoutesFromElements,  Route dans main.jsx**

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import {createBrowserRouter,  createRoutesFromElements,  Route, RouterProvider  } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import HomeScreen from './screens/HomeScreen.jsx';


// Création du routeur
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route  path='/login' element={<LoginScreen />} />
      <Route  path='/register' element={<RegisterScreen />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

**13/ Outlet dans App.jsx**

Point de rendu pour les composants de route. 
Lorsqu’une route est activée => le composant correspondant est rendu à l’endroit où se trouve le composant Outle (dans le fichier App.jsx).

**14/ LinkContainer**

Une intégration de react-router avec react-bootstrap. 
LinkContainer est un composant qui enveloppe n’importe quel composant React Bootstrap et le transforme en un lien qui peut être utilisé pour la navigation. 
Il est similaire au composant Link de react-router-dom, mais il est conçu pour fonctionner avec les composants React Bootstrap.

**15/ FormContainer.jsx**

Pour la mise en forme des formulaires.

**16/ redux**

npm i @reduxjs/toolkit react-redux

**@reduxjs/toolkit**  simplifie l’utilisation de la configuration du **store**, la définition des **réducteurs**, la logique de mise à jour immuable puis génère automatiquement les actions et les créateurs d’actions correspondants.

**react-redux** :  Il permet à vos composants React de **lire des données à partir d’un magasin Redux**.

**16/ touch store.js**

//////////////////////////////////////////////////////////////
  import { configureStore } from '@reduxjs/toolkit';

  const store = configureStore({
  
      reducer: {  },

    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware(), 
      devTools: true, 
  });

  export default store;
//////////////////////////////////////////////////////////////
 
Sans main.jsx:

import store from './store';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
</Provider>
)

//////////////////////////////////////////////////////////////

**17/ mkdir slices et touch authSlice.js**

**18/ Pour montrer les erreur** 
npm install  react-toastify

**19/ Loader.jsx**

**20/ quand user connecté, HomeScreen change**
///////////////////////////////////////////////////////////////////////////////////
import React from "react"; // N'oubliez pas d'importer React si vous utilisez JSX
import Hero from "../components/Hero";
import { useSelector } from "react-redux";

const HomeScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <div>
      {!userInfo ? (
        <Hero />
      ) : (
        <h1>Utilisateur connecté</h1> 
      )}
    </div>
  );
};

export default HomeScreen;
///////////////////////////////////////////////////////////////////////////////////

**21/ ProfileScreen, modif main et PrivateRoute**

**22/ CreateRecipeScreen et updateRecipeScreen**

**23/ remove ingredient**

  const removeIngredient = (index) => {
    const newIngredients = [...recipe.ingredients];
    newIngredients.splice(index, 1);
    setRecipe({ ...recipe, ingredients: newIngredients });
  };
///////////////////////////////////////////////////////////
  
        <Form.Group className='my-2' controlId='ingredients'>
          <Form.Label>Les ingrédients :</Form.Label>
          {/* Affichage des champs d'ingrédients avec la possibilité de supprimer */}
          {recipe && recipe.ingredients && recipe.ingredients.map((ingredient, index) => (
            <div key={index} className="d-flex mb-2">
              <input
                className="form-control input-lg"
                type="text"
                value={ingredient}
                onChange={(e) => handleIngredientChange(e, index)}
                placeholder="Ecrire un ingrédient"
              />
              <Button
                className="btn-danger mx-2"
                onClick={() => removeIngredient(index)}
                type="button"
              >
                <RxCross1 />
              </Button>
            </div>
          ))}
          {/* Bouton pour ajouter un ingrédient */}
          <Button
            className="btn-primary w-100 mx-2"
            onClick={addIngredient}
            type="button"
          >
            Ajouter un ingrédient
          </Button>
        </Form.Group>
//////////////////////////////////////

**24/ upload image**
   <Form.Group controlId="imageUrl">
          <Form.Label>Image de la recette :</Form.Label>
          <Form.Control
            type="file"
            name="imageUrl"
            accept="image/*"
            onChange={(e) => handleUpdateImage(e.target.files[0])}
          />
          {file && (
            <img
              src={file}
              alt="Aperçu de l'image"
              style={{
                width: "250px",
                display: "block",
                margin: "auto",
                marginTop: "1rem",
              }}
            />
          )}
        </Form.Group>

**25/ rafraicchir les datas avec  la fonction refetch fournie par RTK Query**

refetch est une fonction asynchrone, elle retourne une promesse.
 
Exemple :

  const { isError, isLoading, isSuccess, **refetch** } = useAllRecipesAuthQuery();

  useEffect(() => {
    console.log('useEffect ran');
    console.log('recipes:', recipes);
    console.log('selectedCategory:', selectedCategory);
    console.log('submittedSearchQuery:', submittedSearchQuery);
    console.log('isSuccess:', isSuccess);
    if (isSuccess) {
      let filtered = recipes;
      if (selectedCategory) {
        filtered = filtered.filter((recipe) => recipe.category === selectedCategory);
      }
      if (submittedSearchQuery) {
        const searchRegex = new RegExp(submittedSearchQuery, "i");
        filtered = filtered.filter(
          (recipe) =>
            searchRegex.test(recipe.name) ||
            searchRegex.test(recipe.pseudo) ||
            searchRegex.test(recipe.comments) ||
            searchRegex.test(recipe.category)
        );
      }
      **refetch();**
      setFilteredRecipes(filtered);
    }
  }, [selectedCategory, submittedSearchQuery, isSuccess, recipes, dispatch, **refetch**]);

**26/ types cuisines**
Régime alimentaire:
tous
végétarien
végan
sans gluten
équilibré

**27/ drapeau et/ou noms pays**



    import { useState } from "react";
import { Form } from "react-bootstrap";

const Flag = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [flagUrl, setFlagUrl] = useState("");

  //code sur https://flagsapi.com
  const countryCodes = {
    // Europe
    France: "fr",
    Allemagne: "de",
    Italie: "it",
    Espagne: "es",
    "Royaume-Uni": "gb",
       Irlande: "ie",
    Portugal: "pt",
    Belgique: "be",
    PaysBas: "nl",
    Danemark: "dk",
    Suède: "se",
    Norvège: "no",
    Finlande: "fi",
    Pologne: "pl",
    Autriche: "at",
    Suisse: "ch",
    Grèce: "gr",
    Roumanie: "ro",
    "République Tchèque": "cz",
    Hongrie: "hu",
    Biélorussie: "by",
    Bulgarie: "bg",
    Slovaquie: "sk",
    Moldavie: "md",
    // Asie
    Russie: "ru",
    Chine: "cn",
    Inde: "in",
    Japon: "jp",
    CoréeDuSud: "kr",
    Indonésie: "id",
    Turquie: "tr",
    Iran: "ir",
    Thaïlande: "th",
    // Amérique du Nord
    ÉtatsUnis: "us",
    Canada: "ca",
    Mexique: "mx",
    // Amérique du Sud
    Brésil: "br",
    Argentine: "ar",
    Colombie: "co",
    Chili: "cl",
    Pérou: "pe",
    Cuba: "cu",
    colombie: "co",
    // Afrique
    AfriqueDuSud: "za",
    Égypte: "eg",
    Nigeria: "ng",
    Algérie: "dz",
    Maroc: "ma",
    "Burkina Faso": "bf",
    Cameroon: "cm",
    Ghana: "gh",
    Mali: "ml",
    Tunésie:"tn",
    Niger:"ne",
 
  };

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    setSelectedCountry(selectedCountry);

    const countryCode = countryCodes[selectedCountry];
    if (countryCode) {
      const flagUrl = `https://flagcdn.com/w640/${countryCode}.png`;
      setFlagUrl(flagUrl);
    }
  };

  return (
    <div>
    
      {flagUrl && (
        <img
          src={flagUrl}
          alt={`Drapeau de ${selectedCountry}`}
          style={{ marginTop: "1rem", width: "3rem" }}
        />
      )}
    </div>
  );
};

export default Flag;
///////////////////////////////////////////////////////////////////////////////
ou
//////////////////////////////////////////////////////////////////////////////

const Flag = ({ country }) => {
  const [flagUrl, setFlagUrl] = useState("");

  useEffect(() => {
    const countryCodes = {
    // Europe
    France: "fr",
    Allemagne: "de",
    Italie: "it",
    Espagne: "es",
    "Royaume-Uni": "gb",
    Irlande: "ie",
    Portugal: "pt",
    Belgique: "be",
    PaysBas: "nl",
    Danemark: "dk",
    Suède: "se",
    Norvège: "no",
    Finlande: "fi",
    Pologne: "pl",
    Autriche: "at",
    Suisse: "ch",
    Grèce: "gr",
    Roumanie: "ro",
    "République Tchèque": "cz",
    Hongrie: "hu",
    Biélorussie: "by",
    Bulgarie: "bg",
    Slovaquie: "sk",
    Moldavie: "md",
    // Asie
    Russie: "ru",
    Chine: "cn",
    Inde: "in",
    Japon: "jp",
    CoréeDuSud: "kr",
    Indonésie: "id",
    Turquie: "tr",
    Thaïlande: "th",
    // Amérique du Nord
    ÉtatsUnis: "us",
    Canada: "ca",
    Mexique: "mx",
    // Amérique du Sud
    Brésil: "br",
    Argentine: "ar",
    Colombie: "co",
    Chili: "cl",
    Cuba: "cu",
    // Afrique
    AfriqueDuSud: "za",
    Égypte: "eg",
    Nigeria: "ng",
    Algérie: "dz",
    Maroc: "ma",
    "Burkina Faso": "bf",
    Cameroon: "cm",
    Ghana: "gh",
    Mali: "ml",
    Tunésie:"tn",
    Niger:"ne",
    };

    const countryCode = countryCodes[country];
    if (countryCode) {
      const flagUrl = `https://flagcdn.com/w640/${countryCode}.png`;
      setFlagUrl(flagUrl);
    }
  }, [country]);

  return (
    <div>
      {flagUrl && (
        <Card.Img
          src={flagUrl}
          alt={`Drapeau de ${country}`}
          style={{ marginTop: "1rem", width: "2.5rem" }}
        />
      )}
    </div>
  );
};

export default Flag;
