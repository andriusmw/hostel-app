/*------------------------------------------- IMPORTS ------------------------------------*/
/*----------------------------------------------------------------------------------------*/

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import Link from "next/link";
import Navbar from "@/components/navbar";

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
        {/* el ThemeProvider envuelve a children para aplicarle el tema 
          igual que react-router envuelve toda la app para que funcionen las redireciones en toda la app  */}
     
        <ThemeProvider
           attribute="class"
           defaultTheme="system"
           enableSystem
           disableTransitionOnChange
        > 
            <Navbar/>
           
        {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
