////src>contexts>CategoryContext.jsx
import React, { createContext, useState, useContext } from 'react';

// Créez un contexte pour selectedCategory
const CategoryContext = createContext();

// Créez un composant fournisseur qui maintient l'état de selectedCategory et le fournit via le contexte
export const CategoryProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  return (
    <CategoryContext.Provider value={{ selectedCategory, setSelectedCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

// Créez un hook personnalisé pour utiliser le contexte de la catégorie
export const useCategory = () => useContext(CategoryContext);