//------------------------------------IMPORTS ----------------------------------------------
//------------------------------------------------------------------------------------------

import { ThemeSwitcher } from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import CategoryList from "../components/category-list"

//-------------------------------CONSTS & TYPES --------------------------------------------
//-------------------------------------------------------------------------------------------

// Define la estructura del objeto , tanto de la respuesta como de cada noticia dentro del array
// de noticias de la respuesta.
interface Article {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

interface NewsApiResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}



//-------------------------------------- EXPORT -----------------------------------------------
//-------------------------------------------------------------------------------------------

export default async function Home() {
  let loading: boolean = true;

  // Construye la URL usando variables de entorno
  const baseUrl = process.env.BASE_URL;
  const source = process.env.SOURCE;
  const apiKey = process.env.API_KEY;

  const url = `${baseUrl}?sources=${source}&apiKey=${apiKey}`;

  // Variables para datos y errores
  let news: Article[] = [];
  let error: string | undefined;


  try {

  // Llamada a la API
    const res = await fetch(url, { cache: "no-store" });
                       // en App Router ya se manejan las páginas por defecto como Server Side Components.
                      // pero nos esforzamos en usar no-store por si acaso para simular SSR porque no lo 
                      // guarda en el cliente. carga datos frescos con cada llamada
                      // carga desde el servidor. 

    // Verifica si la respuesta es exitosa
    if (!res.ok) {
      throw new Error(`Error de la API: ${res.status} ${res.statusText}`);
    }

    // Transforma la respuesta a JSON
    const data: NewsApiResponse = await res.json();

    // Verifica el estado de la respuesta de NewsAPI
    if (data.status !== "ok") {
      throw new Error(`Error de NewsAPI: ${data.status}`);
    }

    // Guarda los artículos
    news = data.articles;
    loading = false
    //console.log(news)
  } catch (err) {
    console.error("Error fetching latest news:", err);
    error = err instanceof Error ? err.message : "Error al cargar noticias";
  }


  return (
    <section className="my-8 px-2 lg:px-16">
      {/* Estilos para centrar el contenido */}

      <ThemeSwitcher />
        <CategoryList></CategoryList>
      
     

        <h1 className="text-3xl md:text-4x1 font-bold tracking-tight text-rpimary 
          text-center mb-10" >
              BBC's News</h1>

      {loading ? <p>Loading...</p> : null }  

          {/* Esto por si hay error */}
        {error ? ( 
          <p className="text-red-500 text-center">{error}</p>
        ) : (
         <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-3-gap-6">

            {/* Para vista vacía */}
            {news.length === 0 ? (
              <p className="text-gray-500 text-center">No news found</p>

            ) : (
              news.map((article, index) => ( //creando lista de tarjetitas de noticias
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
                       href={`/singleNew/${encodeURIComponent(article.url)}`}
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
            )}

        </div>
        )}

        <div className="mt-4 flex justify-center">

         

        </div>
      
    </section>
  );
}