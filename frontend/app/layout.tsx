"use client";

import { usePathname } from "next/navigation";
import type { Metadata } from "next";
import { Orbitron, Rajdhani } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const orbitron = Orbitron({ subsets: ["latin"], variable: "--font-orbitron" });
const rajdhani = Rajdhani({ 
  subsets: ["latin"], 
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-rajdhani" 
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <html lang="en" className="scroll-smooth">
      <body suppressHydrationWarning className={`${orbitron.variable} ${rajdhani.variable} font-rajdhani ${isAdmin ? "bg-neutral-950" : "bg-black text-cyan-300 min-h-screen flex flex-col"}`}>
        {!isAdmin && <Navbar />}
        <main className={isAdmin ? "" : "flex-1"}>{children}</main>
        {!isAdmin && <Footer />}
      </body>
    </html>
  );
}