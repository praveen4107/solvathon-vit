import { Press_Start_2P, Pixelify_Sans, Oxanium, JetBrains_Mono } from "next/font/google";

export const pressStart = Press_Start_2P({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pressstart",
});

export const pixelify = Pixelify_Sans({
  subsets: ["latin"],
  variable: "--font-pixelify",
});

export const oxanium = Oxanium({
  subsets: ["latin"],
  variable: "--font-oxanium",
});

export const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});
