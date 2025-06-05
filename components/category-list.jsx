// components/category-list.jsx
'use client'; // Si usas App Router

import { useState } from 'react';
import { fetchDataByCategory } from '../app/services/apiService';

const CategoryList = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null); // Para rastrear la categoría seleccionada

  const categories = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];

  const handleCategoryClick = async (category) => {
    setLoading(true);
    setError(null);
    setSelectedCategory(category); // Guardamos la categoría seleccionada
    try {
      console.log('Enviando categoría:', category); // Para depurar
      const result = await fetchDataByCategory(category);
      setData(result);
    } catch (err) {
      setError(err.message || 'No se pudieron cargar los datos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <ul>
        {categories.map((category, index) => (
          <li
            key={index}
            onClick={() => handleCategoryClick(category)}
            style={{ cursor: 'pointer', padding: '10px', borderBottom: '1px solid #ccc' }}
          >
            {category}
          </li>
        ))}
      </ul>

      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {data && (
        <div>
          <h2>Resultados para: {selectedCategory}</h2>
          <ul>
            {data.articles && Array.isArray(data.articles) ? (
              data.articles.map((item, index) => (
                <li key={index}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    Leer más
                  </a>
                </li>
              ))
            ) : (
              <p>No hay artículos disponibles</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CategoryList;