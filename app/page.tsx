import { ThemeSwitcher } from "@/components/theme-switcher";
import Link from "next/link";

export default function Home() {
  return (
  
    

      <section>
        <p>Home</p>
        <Link className="underline text-slate-600"  href="/news">Noticias</Link>
      </section>
        
   
  );
}
