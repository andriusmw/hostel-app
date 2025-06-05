import { CalendarIcon } from "lucide-react";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";

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

interface SingleNewProps {
  params: {
    id: string;
  };
}

// coge los params de la ruta pasándolos por la interfaz SingleNewProps
export default async function SingleNew({ params }: SingleNewProps) {
    const baseUrl = process.env.BASE_URL;
    const source = process.env.SOURCE;
    const apiKey = process.env.API_KEY;
  
    const url = `${baseUrl}?sources=${source}&apiKey=${apiKey}`;
    const decodedUrl = decodeURIComponent(params.id);
    // saca la url, que le hemos pasado, está en el params.id
  
    let article: Article | null = null; // crea variable de tipo Article (Interfaz) igual que el que usábamos 
                                        // para cada item de la lista de noticias.
    let error: string | undefined;
  
    try {
      const res = await fetch(url, { next: { revalidate: 3600 } }); 
                        // en App Router ya se manejan las páginas por defecto como Server Side Components.
                        //fetch a la API usando ISR con el revalidate para obtener los datos del servidor
                        //en tiempo de compilación como getStaticProps + añadimos datos frescos cada hora. 
  
      if (!res.ok) {
        throw new Error(`Error at API: ${res.status} ${res.statusText}`);
      }
  
      const data: NewsApiResponse = await res.json();
            //Guarda la respuesta en data, con el tipo interfaz NewsApiResponse 
  
      if (data.status !== "ok") {
        throw new Error(`Error at NewsAPI: ${data.status}`);
      }
  
      // Busca el artículo con el url coincidente, es lo que vamos a usar en el return.
      article = data.articles.find((art) => art.url === decodedUrl) || null;

     // console.log(data.articles.map((art) => ({ url: art.url, content: art.content })));
        // El contenido de la noticia viene truncado por la propia API; solo se muestran los
        // X primeros caracteres.
        
    } catch (err) {
        console.error("Error fetching article:", err);
        error = err instanceof Error ? err.message : "Error loading new";
      }

      if (error || !article) {
        return (
          <section className="my-8 px-2 lg:px-16">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-primary text-center mb-10">
              New not found
            </h1>
            <p className="text-red-500 text-center">{error || "404 Not found"}</p>
            <div className="mt-4 flex justify-center">
              <Link href="/" className="text-blue-500 hover:underline">
                Back to Home
              </Link>
            </div>
          </section>
        );
      }

      return (
        <section className="my-8 px-2 lg:px-16">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-primary text-center mb-10">
            {article.title}
          </h1>
          <Card className="max-w-3xl mx-auto rounded-lg overflow-hidden shadow-lg">
            {article.urlToImage && (
              <div className="relative w-full h-64">
                <Image
                  src={article.urlToImage}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4">{article.title}</h2>
              <p className="text-gray-600 mb-4">{article.description || "No Description"}</p>
              <p className="text-gray-800">{article.content || "Not available content"}</p>
              <p className="text-sm text-gray-500 mt-4">
                Published by {article.author || "Unknown"} at {article.source.name || "Unknown"}
              </p>
              <p className="text-sm text-gray-500">
                {new Date(article.publishedAt).toLocaleString("en-EN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </CardContent>
            <CardFooter className="p-6">
              <Link href="/" className="text-blue-500 hover:underline">
                Back to Home
              </Link>
            </CardFooter>
          </Card>
        </section>
      );
    }