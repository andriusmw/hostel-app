//------------------------------------IMPORTS ----------------------------------------------
//------------------------------------------------------------------------------------------

import { ThemeSwitcher } from "@/components/theme-switcher";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

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
  // Construye la URL usando variables de entorno
  const baseUrl = process.env.BASE_URL;
  const source = process.env.SOURCE;
  const apiKey = process.env.API_KEY;

  const url = `${baseUrl}?sources=${source}&apiKey=${apiKey}`;

  // Variables para datos y errores
  let news: Article[] = [];
  let error: string | undefined;

  // Llamada a la API
  try {
    const res = await fetch(url, { cache: "no-store" });
                      // al añadir no-store simula SSR porque no lo guarda en el cliente.
                      // carga datos frescos con cada llamada
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
    //console.log(news)
  } catch (err) {
    console.error("Error fetching latest news:", err);
    error = err instanceof Error ? err.message : "Error al cargar noticias";
  }

  // Renderizado
  return (
    <section className="flex justify-center items-center gap-x-4 min-h-screen">
      {/* Estilos para centrar el contenido */}

      <div className="w-full max-w-2xl p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">Noticias de BBC News</h1>

          {/* Esto por si hay error */}
        {error ? ( 
          <p className="text-red-500 text-center">{error}</p>
        ) : (
         <>

            {/* Para vista vacía */}
            {news.length === 0 ? (
              <p className="text-gray-500 text-center">No se encontraron noticias</p>

            ) : (
              news.map((article, index) => (
                //ponemos index como key porque en la doc de la api hemos visto que algunos id pueden venir como null
                <Card key={index} className="border p-4 rounded shadow hover:bg-gray-50">
                   <div className="relative w-full h-48">
                  {article.urlToImage ? (
                    <Image
                     src={article.urlToImage}
                     alt={article.title}
                     fill
                    className="rounded-t-lg object-cover"
                    />
                    ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center rounded-t-lg">
                  <span className="text-gray-500">No Image</span>
                 </div>
                 
                  )}
                  </div>

                  <CardContent>
                  <h2 className="text-xl font-semibold">{article.title}</h2>
                  <p className="text-gray-600">{article.description || "Sin descripción"}</p>
                  <Link
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    Leer más
                  </Link>
                  <p>{article.publishedAt}</p>
                  </CardContent>
               
                </Card>

              ))
            )}

        </>
        )}

        <div className="mt-4 flex justify-center">

          <ThemeSwitcher />

        </div>
      </div>
    </section>
  );
}