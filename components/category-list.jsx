'use client'; 
import { Card } from './ui/card';
import { CardContent } from './ui/card';
import { CardFooter } from './ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { fetchDataByCategory } from '../app/services/apiService';
import { useCategory } from '../app/context/CategoryContext';

const CategoryList = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { selectedCategory, setSelectedCategory } = useCategory(); // Usa el contexto para rastrear la cat selec.
  const [isCategoryListVisible, setIsCategoryListVisible] = useState(false); 
 

  const categories = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];

  const handleCategoryClick = async (category) => {
    setLoading(true);
    setError(null);
    setSelectedCategory(category); // Actualiza la categoría en el contexto

    try {
      console.log('Enviando categoría:', category); // Para depurar
      const result = await fetchDataByCategory(category);
      setData(result);
      setIsCategoryListVisible(false); // Ocultamos la lista al seleccionar una categoría
    } catch (err) {
      setError(err.message || 'can not load');
    } finally {
      setLoading(false);
    }
  };

  const toggleCategoryList = () => {
    setIsCategoryListVisible(!isCategoryListVisible); // Alterna la visibilidad del <ul>
  };

  const clearFilters = () => {
    setData(null); // Limpiamos los datos
    setSelectedCategory(null); // Limpia la categoría en el contexto
    setError(null); // Limpiamos los errores
    setIsCategoryListVisible(false); // Ocultamos la lista de categorías
  };

  return (
    <div>
      <div>
        <button
          onClick={toggleCategoryList}
          style={{
            padding: '10px 20px',
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginBottom: '10px',
          }}
        >
          {isCategoryListVisible ? 'Hide Categories' : 'Show Categories'}
        </button>
        {isCategoryListVisible && (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {categories.map((category, index) => (
              <li
                key={index}
                onClick={() => handleCategoryClick(category)}
                style={{
                  cursor: 'pointer',
                  padding: '10px',
                  borderBottom: '1px solid #ccc',
                  backgroundColor: selectedCategory === category ? '#e0e0e0' : 'transparent',
                }}
              >
                {category}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        {selectedCategory && (
          <button
            onClick={clearFilters}
            style={{
              padding: '10px 20px',
              backgroundColor: '#ff4444',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              margin: '10px 0',
            }}
          >
            Clear Filters
          </button>
        )}
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {data && (
        
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-3-gap-6">
         
          
            {data.articles && Array.isArray(data.articles) ? (
            /*  data.articles.map((item, index) => (
                <li key={index}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    Read More
                  </a>
                </li>
              ))
 */

              

              data.articles.map((article, index) => ( //creando lista de tarjetitas de noticias
                //ponemos index como key porque en la doc de la api hemos visto que algunos id pueden venir como null
                // no lleva id, hay "source_id" y ese encima puede venir null o repetido.
                <Card key={index} className="rounded-lg overflow-hidden shadow-lg hover:shadow-2x1 transition-shadow"
                style={{ margin: "5px", marginBottom: "10px" }}>
                   <div className="relative w-full h-48">
                  {article.urlToImage ? (
                    <Image
                     src={article.urlToImage}
                     alt={article.title}
                     fill
                    className="rounded-t-lg object-cover"
                    />
                    ) : (
                  <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-2x1 transition-shadow">
                  <span className="text-gray-500">No Image</span>
                 </div>
                 
                  )}
                  </div>

                  <CardContent>
                     <h2 className="text-xl font-semibold">{article.title}</h2>
                     <p className="text-gray-600">{article.description || "Sin descripción"}</p>
                    
                     <Link
                     // enviamos el url como identificador porque no tenemos otra cosa, el index puede cambiar si se
                     // añaden noticias entonces la vista detalle no correspondería. 
                       href={`/singleNewFiltered/${encodeURIComponent(article.url)}`}
                       //singleNewFiltered hace como de carpeta api
                      className="text-blue-500 hover:underline"
                      >
                      Read More
                     </Link>
                   
                  </CardContent>
                  <CardFooter>
                 
             
                  <p>  {/*Ajuste para mostrar la fecha y hora correctamente */}
                    {new Date(article.publishedAt).toLocaleString("en-EN", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}</p>
                  </CardFooter>
               
                </Card>

              ))


















            ) : (
              <p>No articles</p>
            )}
          
        </div>
      )}
    </div>
  );
};

export default CategoryList;