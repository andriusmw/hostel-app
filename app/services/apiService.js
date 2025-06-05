export const fetchDataByCategory = async (category) => {
    try {
      const validCategories = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
      if (!category || !validCategories.includes(category.toLowerCase())) {
        throw new Error('Categoría inválida. Use: business, entertainment, general, health, science, sports, technology');
      }
  
      console.log('category:', category);               //encoded por si acaso la escritura o tildes afectasen.
                                                        // esto pasa por nuestra carpeta api para configurar la conexion
      const response = await fetch(`/api/news?category=${encodeURIComponent(category)}`, {
        method: 'GET',
      });
  
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error en fetchDataByCategory:', error);
      throw error;
    }
  };