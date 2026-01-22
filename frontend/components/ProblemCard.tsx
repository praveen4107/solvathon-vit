"use client";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faMicrochip, faShield } from '@fortawesome/free-solid-svg-icons';
import { Orbitron, Rajdhani } from "next/font/google";

/* GOOGLE FONTS (same as Home & Register) */
const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

interface ProblemCardProps {
  title: string;
  code: string;
  category?: string;
  description: string;
}

export default function ProblemCard({
  title,
  code,
  category,
  description,
}: ProblemCardProps) {
  return (
    <div
      className={`relative bg-black/60 backdrop-blur-sm border border-cyan-500/30 p-6 hover:border-cyan-400 transition-all duration-300 group hover:shadow-[0_0_25px_rgba(34,211,238,0.2)] hover:scale-[1.02] ${rajdhani.className}`}
    >
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* HEADER */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h3
            className={`${orbitron.className} text-lg md:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400`}
            style={{
              textShadow: "0 0 10px rgba(34, 211, 238, 0.2)",
            }}
          >
            {title}
          </h3>
          <p className="text-xs text-gray-400 mt-1 group-hover:text-gray-300 transition-colors">{code}</p>
        </div>

        <FontAwesomeIcon icon={faCode} className="w-6 h-6 text-cyan-400 shrink-0 transition-transform group-hover:scale-110 group-hover:text-blue-400" />
      </div>

      {/* CATEGORY */}
      {category && (
        <div className="flex items-center gap-2 mb-4">
          <FontAwesomeIcon icon={faShield} className="w-4 h-4 text-cyan-400 transition-transform group-hover:scale-110" />
          <span className="text-sm text-cyan-300 uppercase tracking-wide group-hover:text-blue-300 transition-colors">
            {category}
          </span>
        </div>
      )}

      {/* DESCRIPTION */}
      <p className="text-sm text-gray-300 leading-relaxed mb-6 group-hover:text-gray-200 transition-colors">
        {description}
      </p>

      {/* FOOTER */}
      <div className="flex items-center justify-between border-t border-cyan-500/20 pt-4">
        <span className="flex items-center gap-2 text-xs text-gray-400 group-hover:text-gray-300 transition-colors">
          <FontAwesomeIcon icon={faMicrochip} className="w-4 h-4 text-cyan-400 transition-transform group-hover:scale-110" />
          24-Hour Hackathon
        </span>

        <span className="text-xs uppercase tracking-widest text-cyan-400 group-hover:text-blue-400 transition-all duration-300 group-hover:translate-x-1 inline-block">
          Solve →
        </span>
      </div>
    </div>
  );
}
