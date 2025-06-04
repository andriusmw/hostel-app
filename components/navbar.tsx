import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

export default async function Navbar() {
    return(
        <nav className="flex justify-between items-center p-16">
            <div className="flex justify-between items-center gap-4">
                <Link href="/">
                    <Image src="/next-js.svg" alt="Next.js" width={100} height={100} />
                                               {/* están en pixeles */}
                </Link>
                <div className="flex max-lg:hidden flex-col items-center gap-6">
                    <Button variant={"ghost"}>
                        <Link href="/news">Noticias</Link>
                        <Link href="/categories">Categorías</Link>
                    </Button>
                </div>
            </div>
        </nav>
    )
}