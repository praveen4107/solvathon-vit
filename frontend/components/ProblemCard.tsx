"use client";

import { Code, Cpu, Shield } from "lucide-react";
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
      className={`relative bg-black/60 border border-cyan-500/30 p-6 hover:border-cyan-400 transition group ${rajdhani.className}`}
    >
      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-2 h-2 bg-cyan-400 opacity-0 group-hover:opacity-100 transition" />

      {/* HEADER */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h3
            className={`${orbitron.className} text-lg md:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400`}
          >
            {title}
          </h3>
          <p className="text-xs text-gray-400 mt-1">{code}</p>
        </div>

        <Code className="w-6 h-6 text-cyan-400 shrink-0" />
      </div>

      {/* CATEGORY */}
      {category && (
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-4 h-4 text-purple-400" />
          <span className="text-sm text-purple-300 uppercase tracking-wide">
            {category}
          </span>
        </div>
      )}

      {/* DESCRIPTION */}
      <p className="text-sm text-gray-300 leading-relaxed mb-6">
        {description}
      </p>

      {/* FOOTER */}
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-xs text-gray-400">
          <Cpu className="w-4 h-4 text-cyan-400" />
          24-Hour Hackathon
        </span>

        <span className="text-xs uppercase tracking-widest text-cyan-400">
          Solve →
        </span>
      </div>
    </div>
  );
}
