/*------------------------------------------- IMPORTS ------------------------------------*/
/*----------------------------------------------------------------------------------------*/

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import Link from "next/link";
import { CategoryProvider } from '../app/context/CategoryContext';


/*------------------------------------------- CONSTS -------------------------------------*/
/*----------------------------------------------------------------------------------------*/

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "My News blog",
  description: "Generated using Next.js 14.2.15",
};

/*-------------------------------- EXPORT ---------------------------------------*/
/*-------------------------------------------------------------------------------*/

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* el ThemeProvider envuelve a children para aplicarle el tema como un proveedor de contexto  */}
     
        <ThemeProvider
           attribute="class"
           defaultTheme="system"
           enableSystem
           disableTransitionOnChange
        > 
          <CategoryProvider>
             {children}
          </CategoryProvider>
           
      
        </ThemeProvider>
      </body>
    </html>
  );
}
