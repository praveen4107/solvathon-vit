"use client";

import { Orbitron, Rajdhani } from "next/font/google";
import { ChevronRight } from "lucide-react";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["600", "700"],
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

interface ThemeCardProps {
  title: string;
  description: string;
  problems: string[];
  accent: string; // gradient tailwind class
}

export default function ThemeCard({
  title,
  description,
  problems,
  accent,
}: ThemeCardProps) {
  return (
    <div
      className={`relative border border-cyan-500/30 bg-black/60 p-6 transition hover:border-cyan-400 group ${rajdhani.className}`}
    >
      {/* Small square accent (top-right, hover only) */}
      <div className="absolute top-0 right-0 w-2 h-2 bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* TITLE */}
      <h3
        className={`${orbitron.className} text-lg mb-2 text-transparent bg-clip-text bg-gradient-to-r ${accent}`}
      >
        {title}
      </h3>

      <p className="text-sm text-gray-400 mb-4">
        {description}
      </p>

      {/* PROBLEM LIST */}
      <ul className="space-y-2">
        {problems.map((p, i) => (
          <li
            key={i}
            className="flex items-start gap-2 text-sm text-gray-300 hover:text-cyan-400 transition"
          >
            <ChevronRight className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
