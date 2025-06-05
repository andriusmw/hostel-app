'use client'; 

import { createContext, useContext, useState } from 'react';

// Crear el contexto
const CategoryContext = createContext();

// Proveedor del contexto
export const CategoryProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState(null); // Estado para la categoría

  return (
    <CategoryContext.Provider value={{ selectedCategory, setSelectedCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategory debe usarse dentro de un CategoryProvider');
  }
  return context;
};