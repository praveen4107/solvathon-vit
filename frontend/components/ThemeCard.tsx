"use client";

import { Orbitron, Rajdhani } from "next/font/google";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

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
      className={`relative border border-cyan-500/30 bg-black/60 backdrop-blur-sm p-6 transition-all duration-300 hover:border-cyan-400 group hover:shadow-[0_0_25px_rgba(34,211,238,0.2)] hover:scale-[1.02] ${rajdhani.className}`}
    >
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* TITLE */}
      <h3
        className={`${orbitron.className} text-lg mb-2 text-transparent bg-clip-text bg-gradient-to-r ${accent}`}
        style={{
          textShadow: "0 0 10px rgba(34, 211, 238, 0.2)",
        }}
      >
        {title}
      </h3>

      <p className="text-sm text-gray-400 mb-4 group-hover:text-gray-300 transition-colors">
        {description}
      </p>

      {/* PROBLEM LIST */}
      <ul className="space-y-2">
        {problems.map((p, i) => (
          <li
            key={i}
            className="flex items-start gap-2 text-sm text-gray-300 hover:text-cyan-400 transition-colors group/item"
          >
            <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0 transition-transform group-hover/item:translate-x-1" />
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
