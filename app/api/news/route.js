// Esto está aquí porque por seguridad cuando se ejecuta algo del lado del cliente no se puede acceder a .env.local
// entonces tiene que pasar primero por la ruta de api\news para poder acceder y completar la URL de forma segura
export async function GET(request) {
    try {
      const { searchParams } = new URL(request.url);
      const category = searchParams.get('category');
  
      const validCategories = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
      if (!category || !validCategories.includes(category.toLowerCase())) {
        return new Response(JSON.stringify({ error: 'Categoría inválida. Use: business, entertainment, general, health, science, sports, technology' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
  
      const baseUrl = process.env.BASE_URL;
      const apiKey = process.env.API_KEY;
      const url = `${baseUrl}?country=us&category=${encodeURIComponent(category)}&apiKey=${apiKey}`;
  
      const response = await fetch(url, {
        method: 'GET',
      });
  
      if (!response.ok) {
        return new Response(JSON.stringify({ error: `Error ${response.status}: ${response.statusText}` }), {
          status: response.status,
          headers: { 'Content-Type': 'application/json' },
        });
      }
  
      const data = await response.json();
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error('Error en API Route:', error);
      return new Response(JSON.stringify({ error: 'Error interno del servidor' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }